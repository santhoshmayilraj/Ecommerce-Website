from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import mongoengine
from .models import Order
from datetime import datetime
import json

def connect_to_mongodb():
    """Connect to MongoDB with better error handling"""
    try:
        # Disconnect any existing connections first
        mongoengine.disconnect()
        
        # Connect with proper settings
        mongoengine.connect(
            db=getattr(settings, 'MONGODB_SETTINGS', {}).get('db', 'ecommerce_db'),
            host=getattr(settings, 'MONGODB_SETTINGS', {}).get('host', 'mongodb://localhost:27017/'),
            alias='default'
        )
        
        # Test the connection
        mongoengine.connection.get_db()
        print("MongoDB connected successfully")
        return True
        
    except Exception as e:
        print(f"MongoDB connection error: {e}")
        return False

@api_view(['POST'])
def create_order(request):
    """Create a new order from frontend payment page"""
    try:
        print("Attempting to connect to MongoDB...")
        if not connect_to_mongodb():
            return Response({
                'error': 'Database connection failed', 
                'details': 'Could not connect to MongoDB. Please check if MongoDB is running.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        data = request.data
        print("Received order data:", json.dumps(data, indent=2))
        
        # Extract data from frontend payload
        order_number = data.get('order_number')
        customer_details = data.get('customer_details', {})
        items = data.get('items', [])
        payment_details = data.get('payment_details', {})
        delivery_details = data.get('delivery_details', {})
        
        if not order_number or not customer_details or not items:
            return Response({
                'error': 'Missing required order data',
                'required_fields': ['order_number', 'customer_details', 'items']
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Extract customer address safely
        customer_address_obj = customer_details.get('address', {})
        if isinstance(customer_address_obj, dict):
            customer_address = f"{customer_address_obj.get('street', '')}, {customer_address_obj.get('city', '')}, {customer_address_obj.get('state', '')} - {customer_address_obj.get('pincode', '')}"
        else:
            customer_address = str(customer_address_obj)
        
        # Calculate totals from frontend data
        subtotal = float(payment_details.get('subtotal', 0))
        tax_amount = float(payment_details.get('tax', 0))
        delivery_charges = float(payment_details.get('delivery_charges', 0))
        cod_charges = float(payment_details.get('cod_charges', 0))
        total_amount = float(payment_details.get('total_amount', 0))
        
        # Map frontend payment status to model choices
        frontend_payment_status = payment_details.get('status', 'pending')
        payment_status_mapping = {
            'completed': 'completed',
            'success': 'paid',
            'successful': 'paid',
            'paid': 'paid',
            'pending': 'pending',
            'failed': 'failed',
            'refunded': 'refunded'
        }
        mapped_payment_status = payment_status_mapping.get(frontend_payment_status.lower(), 'pending')
        
        print(f"Creating order: {order_number}")
        print(f"Customer: {customer_details.get('name')}")
        print(f"Items count: {len(items)}")
        print(f"Total amount: {total_amount}")
        print(f"Payment status mapped: {frontend_payment_status} -> {mapped_payment_status}")
        
        # Create comprehensive order document
        order = Order(
            order_number=order_number,
            
            # Customer Information
            customer_name=customer_details.get('name', ''),
            customer_email=customer_details.get('email', ''),
            customer_phone=customer_details.get('phone', ''),
            customer_address=customer_address,
            
            # Order Items (store as array for multiple products)
            order_items=[{
                'product_id': str(item.get('product_id', '')),
                'product_name': item.get('product_name', ''),
                'quantity': int(item.get('quantity', 0)),
                'unit_price': float(item.get('unit_price', 0)),
                'total_price': float(item.get('total_price', 0)),
                'is_custom': bool(item.get('is_custom', False)),
                'custom_specifications': item.get('custom_specifications')
            } for item in items],
            
            # For backward compatibility
            product_name=items[0].get('product_name', '') if items else '',
            product_category='mixed' if len(items) > 1 else 'bed',
            quantity=sum(int(item.get('quantity', 0)) for item in items),
            unit_price=float(items[0].get('unit_price', 0)) if len(items) == 1 else 0,
            
            # Financial Details
            subtotal=subtotal,
            tax_amount=tax_amount,
            delivery_charges=delivery_charges,
            cod_charges=cod_charges,
            total_amount=total_amount,
            
            # Payment Information
            payment_method=payment_details.get('method', ''),
            payment_status=mapped_payment_status,
            
            # Delivery Information
            delivery_option=delivery_details.get('option', 'standard'),
            expected_delivery_date=delivery_details.get('expected_date', ''),
            delivery_notes=customer_address_obj.get('delivery_notes', '') if isinstance(customer_address_obj, dict) else '',
            
            # Order Status
            status=data.get('order_status', 'confirmed'),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        order.save()
        print(f"Order saved successfully: {order_number}")
        
        return Response({
            'success': True,
            'order_id': str(order.id),
            'order_number': order_number,
            'total_amount': total_amount,
            'payment_status': mapped_payment_status,
            'message': 'Order created successfully'
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        print(f"Error creating order: {str(e)}")
        import traceback
        traceback.print_exc()
        return Response({
            'error': f'Internal server error: {str(e)}',
            'details': 'Check server logs for more information'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_admin_orders(request):
    """Get all orders for admin view"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Get query parameters for filtering
        status_filter = request.GET.get('status')
        payment_method = request.GET.get('payment_method')
        date_from = request.GET.get('date_from')
        date_to = request.GET.get('date_to')
        
        # Build query
        query = {}
        if status_filter:
            query['status'] = status_filter
        if payment_method:
            query['payment_method'] = payment_method
        if date_from:
            query['created_at__gte'] = datetime.fromisoformat(date_from.replace('Z', '+00:00'))
        if date_to:
            query['created_at__lte'] = datetime.fromisoformat(date_to.replace('Z', '+00:00'))
        
        orders = Order.objects(**query).order_by('-created_at')
        orders_data = []
        
        for order in orders:
            orders_data.append({
                'order_id': str(order.id),
                'order_number': order.order_number,
                
                # Customer Details
                'customer': {
                    'name': order.customer_name,
                    'email': order.customer_email,
                    'phone': order.customer_phone,
                    'address': order.customer_address
                },
                
                # Order Items
                'items': order.order_items if order.order_items else [{
                    'product_name': order.product_name,
                    'quantity': order.quantity,
                    'unit_price': order.unit_price,
                    'total_price': order.unit_price * order.quantity if order.unit_price else 0
                }],
                
                # Financial Details
                'billing': {
                    'subtotal': order.subtotal,
                    'tax_amount': order.tax_amount,
                    'delivery_charges': order.delivery_charges,
                    'cod_charges': order.cod_charges,
                    'total_amount': order.total_amount,
                    'payment_method': order.payment_method,
                    'payment_status': order.payment_status
                },
                
                # Delivery Details
                'delivery': {
                    'option': order.delivery_option,
                    'expected_date': order.expected_delivery_date,
                    'notes': order.delivery_notes
                },
                
                # Order Status and Timestamps
                'status': order.status,
                'created_at': order.created_at.isoformat(),
                'updated_at': order.updated_at.isoformat(),
                'delivered_at': order.delivered_at.isoformat() if order.delivered_at else None,
                'notes': order.notes
            })
        
        return Response({
            'orders': orders_data,
            'total': len(orders_data),
            'filters_applied': {
                'status': status_filter,
                'payment_method': payment_method,
                'date_range': f"{date_from} to {date_to}" if date_from and date_to else None
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error fetching orders: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_admin_dashboard(request):
    """Get admin dashboard statistics"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Order statistics
        total_orders = Order.objects.count()
        pending_orders = Order.objects(status='pending').count()
        confirmed_orders = Order.objects(status='confirmed').count()
        processing_orders = Order.objects(status='processing').count()
        shipped_orders = Order.objects(status='shipped').count()
        delivered_orders = Order.objects(status='delivered').count()
        cancelled_orders = Order.objects(status='cancelled').count()
        
        # Revenue statistics
        total_revenue = sum([order.total_amount for order in Order.objects])
        total_tax = sum([order.tax_amount for order in Order.objects])
        total_delivery_charges = sum([order.delivery_charges for order in Order.objects])
        
        # Payment method statistics
        upi_orders = Order.objects(payment_method='upi').count()
        card_orders = Order.objects(payment_method='card').count()
        cod_orders = Order.objects(payment_method='cod').count()
        netbanking_orders = Order.objects(payment_method='netbanking').count()
        
        # Payment status statistics
        paid_orders = Order.objects(payment_status__in=['paid', 'completed']).count()
        pending_payment_orders = Order.objects(payment_status='pending').count()
        failed_payment_orders = Order.objects(payment_status='failed').count()
        
        # Recent orders (last 10)
        recent_orders = Order.objects.order_by('-created_at')[:10]
        recent_orders_data = []
        
        for order in recent_orders:
            recent_orders_data.append({
                'order_number': order.order_number,
                'customer_name': order.customer_name,
                'total_amount': order.total_amount,
                'payment_method': order.payment_method,
                'payment_status': order.payment_status,
                'status': order.status,
                'created_at': order.created_at.isoformat(),
                'items_count': len(order.order_items) if order.order_items else 1
            })
        
        dashboard_data = {
            'stats': {
                # Order Statistics
                'total_orders': total_orders,
                'pending_orders': pending_orders,
                'confirmed_orders': confirmed_orders,
                'processing_orders': processing_orders,
                'shipped_orders': shipped_orders,
                'delivered_orders': delivered_orders,
                'cancelled_orders': cancelled_orders,
                
                # Revenue Statistics
                'total_revenue': total_revenue,
                'total_tax': total_tax,
                'total_delivery_charges': total_delivery_charges,
                
                # Payment Method Statistics
                'payment_methods': {
                    'upi': upi_orders,
                    'card': card_orders,
                    'cod': cod_orders,
                    'netbanking': netbanking_orders
                },
                
                # Payment Status Statistics
                'payment_status': {
                    'paid': paid_orders,
                    'pending': pending_payment_orders,
                    'failed': failed_payment_orders
                }
            },
            
            'recent_orders': recent_orders_data,
            'currency': '₹'
        }
        
        return Response(dashboard_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error fetching dashboard data: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def update_order_status(request, order_id):
    """Update order status"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        order = Order.objects(id=order_id).first()
        
        if not order:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        
        new_status = request.data.get('status')
        payment_status = request.data.get('payment_status')
        notes = request.data.get('notes')
        
        # Update order fields
        if new_status:
            order.status = new_status
        
        if payment_status:
            order.payment_status = payment_status
        
        if notes:
            order.notes = notes
        
        # Set delivery date if order is delivered
        if new_status == 'delivered':
            order.delivered_at = datetime.utcnow()
        
        # Update timestamp
        order.updated_at = datetime.utcnow()
        order.save()
        
        return Response({
            'message': 'Order status updated successfully',
            'order_number': order.order_number,
            'new_status': new_status,
            'payment_status': order.payment_status
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error updating order: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def delete_order(request, order_id):
    """Delete an order (admin only)"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        order = Order.objects(id=order_id).first()
        
        if not order:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        
        order_number = order.order_number
        order.delete()
        
        return Response({
            'message': f'Order {order_number} deleted successfully'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error deleting order: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_order_details(request, order_number):
    """Get detailed information for a specific order"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        order = Order.objects(order_number=order_number).first()
        
        if not order:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        
        order_data = {
            'order_id': str(order.id),
            'order_number': order.order_number,
            
            # Customer Details
            'customer': {
                'name': order.customer_name,
                'email': order.customer_email,
                'phone': order.customer_phone,
                'address': order.customer_address
            },
            
            # Order Items
            'items': order.order_items if order.order_items else [{
                'product_name': order.product_name,
                'quantity': order.quantity,
                'unit_price': order.unit_price,
                'total_price': order.unit_price * order.quantity if order.unit_price else 0
            }],
            
            # Financial Details
            'billing': {
                'subtotal': order.subtotal,
                'tax_amount': order.tax_amount,
                'delivery_charges': order.delivery_charges,
                'cod_charges': order.cod_charges,
                'total_amount': order.total_amount,
                'payment_method': order.payment_method,
                'payment_status': order.payment_status
            },
            
            # Delivery Details
            'delivery': {
                'option': order.delivery_option,
                'expected_date': order.expected_delivery_date,
                'notes': order.delivery_notes
            },
            
            # Order Status and Timestamps
            'status': order.status,
            'created_at': order.created_at.isoformat(),
            'updated_at': order.updated_at.isoformat(),
            'delivered_at': order.delivered_at.isoformat() if order.delivered_at else None,
            'notes': order.notes
        }
        
        return Response(order_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error fetching order details: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def create_sample_orders(request):
    """Create sample orders for testing"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Create sample orders
        sample_orders = [
            {
                'order_number': 'OD20240607001',
                'customer_name': 'John Doe',
                'customer_email': 'john.doe@email.com',
                'customer_phone': '+91-9876543210',
                'customer_address': '123 Main Street, Chennai, Tamil Nadu - 600001',
                'order_items': [{
                    'product_id': 'sample_1',
                    'product_name': 'King Size Bed',
                    'quantity': 1,
                    'unit_price': 25000,
                    'total_price': 25000,
                    'is_custom': False,
                    'custom_specifications': None
                }],
                'product_name': 'King Size Bed',
                'product_category': 'bed',
                'quantity': 1,
                'unit_price': 25000,
                'subtotal': 25000,
                'tax_amount': 4500,
                'delivery_charges': 149,
                'cod_charges': 0,
                'total_amount': 29649,
                'payment_method': 'upi',
                'payment_status': 'completed',
                'delivery_option': 'standard',
                'expected_delivery_date': 'Thursday 12 June, 2025',
                'status': 'confirmed'
            },
            {
                'order_number': 'OD20240607002',
                'customer_name': 'Jane Smith',
                'customer_email': 'jane.smith@email.com',
                'customer_phone': '+91-9876543211',
                'customer_address': '456 Park Avenue, Bangalore, Karnataka - 560001',
                'order_items': [{
                    'product_id': 'sample_2',
                    'product_name': 'Queen Size Bed',
                    'quantity': 1,
                    'unit_price': 20000,
                    'total_price': 20000,
                    'is_custom': False,
                    'custom_specifications': None
                }],
                'product_name': 'Queen Size Bed',
                'product_category': 'bed',
                'quantity': 1,
                'unit_price': 20000,
                'subtotal': 20000,
                'tax_amount': 3600,
                'delivery_charges': 299,
                'cod_charges': 50,
                'total_amount': 23949,
                'payment_method': 'cod',
                'payment_status': 'pending',
                'delivery_option': 'express',
                'expected_delivery_date': 'Monday 9 June, 2025',
                'status': 'delivered',
                'delivered_at': datetime.utcnow()
            }
        ]
        
        created_orders = []
        
        for order_data in sample_orders:
            order = Order(**order_data)
            order.save()
            created_orders.append(order.order_number)
        
        return Response({
            'message': 'Sample orders created successfully',
            'orders_created': created_orders,
            'total_created': len(created_orders)
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        print(f"Error creating sample orders: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)