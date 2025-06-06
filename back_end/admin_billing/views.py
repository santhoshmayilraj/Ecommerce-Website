from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import mongoengine
from .models import Order
from shop_products.models import Product
from datetime import datetime
import random
import string

def connect_to_mongodb():
    """Connect to MongoDB"""
    try:
        mongoengine.connect(
            db=settings.MONGODB_SETTINGS['db'],
            host=settings.MONGODB_SETTINGS['host']
        )
        return True
    except Exception as e:
        print(f"MongoDB connection error: {e}")
        return False

def generate_order_number():
    """Generate unique order number"""
    prefix = "ORD"
    timestamp = datetime.now().strftime("%Y%m%d")
    random_part = ''.join(random.choices(string.digits, k=4))
    return f"{prefix}{timestamp}{random_part}"

@api_view(['POST'])
def create_order(request):
    """Create a new order (when customer buys a product)"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        data = request.data
        
        # Get product details
        product_id = data.get('product_id')
        product = Product.objects(id=product_id).first()
        
        if not product:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Calculate pricing
        quantity = int(data.get('quantity', 1))
        unit_price = product.price
        subtotal = unit_price * quantity
        tax_rate = settings.ADMIN_SETTINGS['TAX_RATE']
        tax_amount = subtotal * tax_rate
        total_amount = subtotal + tax_amount
        
        # Generate order number
        order_number = generate_order_number()
        
        # Create order
        order = Order(
            order_number=order_number,
            customer_name=data.get('customer_name'),
            customer_email=data.get('customer_email'),
            customer_phone=data.get('customer_phone'),
            customer_address=data.get('customer_address'),
            product_name=product.name,
            product_category=product.category,
            product_specifications=data.get('product_specifications', {}),  # Size, etc.
            quantity=quantity,
            unit_price=unit_price,
            subtotal=subtotal,
            tax_amount=tax_amount,
            total_amount=total_amount,
            payment_method=data.get('payment_method'),
            notes=data.get('notes', '')
        )
        order.save()
        
        # Update product stock
        if product.stock >= quantity:
            product.stock -= quantity
            product.save()
        
        return Response({
            'order_id': str(order.id),
            'order_number': order_number,
            'total_amount': total_amount,
            'message': 'Order created successfully'
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_admin_orders(request):
    """Get all orders for admin view (Customer + Product details)"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Get query parameters for filtering
        status_filter = request.GET.get('status')
        date_from = request.GET.get('date_from')
        date_to = request.GET.get('date_to')
        
        # Build query
        query = {}
        
        if status_filter:
            query['status'] = status_filter
        
        if date_from:
            query['created_at__gte'] = datetime.fromisoformat(date_from)
        
        if date_to:
            query['created_at__lte'] = datetime.fromisoformat(date_to)
        
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
                
                # Product Details
                'product': {
                    'name': order.product_name,
                    'category': order.product_category,
                    'specifications': order.product_specifications,
                    'unit_price': order.unit_price,
                    'quantity': order.quantity
                },
                
                # Billing Details
                'billing': {
                    'subtotal': order.subtotal,
                    'tax_amount': order.tax_amount,
                    'total_amount': order.total_amount,
                    'payment_method': order.payment_method,
                    'payment_status': order.payment_status
                },
                
                # Order Status
                'status': order.status,
                'created_at': order.created_at.isoformat(),
                'delivered_at': order.delivered_at.isoformat() if order.delivered_at else None,
                'notes': order.notes
            })
        
        return Response({
            'orders': orders_data,
            'total': len(orders_data)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
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
        delivered_orders = Order.objects(status='delivered').count()
        
        # Revenue statistics
        total_revenue = sum([order.total_amount for order in Order.objects])
        total_tax = sum([order.tax_amount for order in Order.objects])
        
        # Product statistics
        total_products = Product.objects.count()
        low_stock_products = Product.objects(stock__lte=5, is_active=True).count()
        
        # Recent orders (last 5)
        recent_orders = Order.objects.order_by('-created_at')[:5]
        recent_orders_data = []
        
        for order in recent_orders:
            recent_orders_data.append({
                'order_number': order.order_number,
                'customer_name': order.customer_name,
                'product_name': order.product_name,
                'total_amount': order.total_amount,
                'status': order.status,
                'created_at': order.created_at.isoformat()
            })
        
        dashboard_data = {
            'stats': {
                'total_orders': total_orders,
                'pending_orders': pending_orders,
                'delivered_orders': delivered_orders,
                'total_revenue': total_revenue,
                'total_tax': total_tax,
                'total_products': total_products,
                'low_stock_products': low_stock_products
            },
            'recent_orders': recent_orders_data,
            'currency': settings.ADMIN_SETTINGS['CURRENCY']
        }
        
        return Response(dashboard_data, status=status.HTTP_200_OK)
        
    except Exception as e:
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
        
        order.status = new_status
        
        if payment_status:
            order.payment_status = payment_status
        
        if new_status == 'delivered':
            order.delivered_at = datetime.utcnow()
        
        order.save()
        
        return Response({
            'message': 'Order status updated successfully',
            'order_number': order.order_number,
            'new_status': new_status
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def create_sample_orders(request):
    """Create sample orders for testing"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Get first few products
        products = Product.objects(is_active=True)[:3]
        
        if not products:
            return Response({'error': 'No products found. Create products first.'}, status=status.HTTP_400_BAD_REQUEST)
        
        sample_orders = [
            {
                'customer_name': 'Rajesh Kumar',
                'customer_email': 'rajesh.kumar@email.com',
                'customer_phone': '+91-9876543210',
                'customer_address': '123 MG Road, Bangalore, Karnataka - 560001',
                'product': products[0],
                'quantity': 1,
                'product_specifications': {'size': 'Queen', 'color': 'White'},
                'payment_method': 'card',
                'status': 'delivered'
            },
            {
                'customer_name': 'Priya Sharma',
                'customer_email': 'priya.sharma@email.com',
                'customer_phone': '+91-9876543211',
                'customer_address': '456 Anna Salai, Chennai, Tamil Nadu - 600001',
                'product': products[1],
                'quantity': 1,
                'product_specifications': {'size': 'King', 'firmness': 'Medium'},
                'payment_method': 'upi',
                'status': 'pending'
            }
        ]
        
        if len(products) > 2:
            sample_orders.append({
                'customer_name': 'Amit Patel',
                'customer_email': 'amit.patel@email.com',
                'customer_phone': '+91-9876543212',
                'customer_address': '789 CP Road, Mumbai, Maharashtra - 400001',
                'product': products[2],
                'quantity': 2,
                'product_specifications': {'size': 'Double', 'material': 'Latex'},
                'payment_method': 'cod',
                'status': 'confirmed'
            })
        
        created_orders = []
        
        for order_data in sample_orders:
            product = order_data['product']
            quantity = order_data['quantity']
            
            # Calculate pricing
            unit_price = product.price
            subtotal = unit_price * quantity
            tax_rate = settings.ADMIN_SETTINGS['TAX_RATE']
            tax_amount = subtotal * tax_rate
            total_amount = subtotal + tax_amount
            
            # Generate order number
            order_number = generate_order_number()
            
            order = Order(
                order_number=order_number,
                customer_name=order_data['customer_name'],
                customer_email=order_data['customer_email'],
                customer_phone=order_data['customer_phone'],
                customer_address=order_data['customer_address'],
                product_name=product.name,
                product_category=product.category,
                product_specifications=order_data['product_specifications'],
                quantity=quantity,
                unit_price=unit_price,
                subtotal=subtotal,
                tax_amount=tax_amount,
                total_amount=total_amount,
                status=order_data['status'],
                payment_method=order_data['payment_method'],
                payment_status='paid' if order_data['status'] == 'delivered' else 'pending'
            )
            
            if order_data['status'] == 'delivered':
                order.delivered_at = datetime.utcnow()
            
            order.save()
            created_orders.append(order.order_number)
        
        return Response({
            'message': 'Sample orders created successfully',
            'orders_created': created_orders,
            'total_created': len(created_orders)
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)