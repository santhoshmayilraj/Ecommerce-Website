from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import mongoengine
from .models import Product
from datetime import datetime

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

@api_view(['GET'])
def get_products(request):
    """Get all products with filtering and search"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Get query parameters
        category = request.GET.get('category')
        min_price = request.GET.get('min_price')
        max_price = request.GET.get('max_price')
        search = request.GET.get('search')
        in_stock_only = request.GET.get('in_stock') == 'true'
        
        # Build query
        query = {'is_active': True}
        
        if category and category.lower() != 'all':
            query['category__icontains'] = category
        
        if min_price:
            try:
                query['price__gte'] = float(min_price)
            except ValueError:
                pass
        
        if max_price:
            try:
                query['price__lte'] = float(max_price)
            except ValueError:
                pass
        
        if search:
            # Search in name, description, or features
            from mongoengine import Q
            search_query = Q(name__icontains=search) | Q(description__icontains=search) | Q(features__icontains=search)
            products = Product.objects(search_query, **query)
        else:
            products = Product.objects(**query)
        
        if in_stock_only:
            products = products.filter(stock__gt=0)
        
        products = products.order_by('-created_at')
        products_data = []
        
        for product in products:
            products_data.append({
                'id': str(product.id),
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'category': product.category,
                'image': product.image,
                'features': product.features,
                'specifications': product.specifications,
                'stock': product.stock,
                'in_stock': product.stock > 0,
                'is_low_stock': product.stock <= product.low_stock_threshold,
                'created_at': product.created_at.isoformat() if product.created_at else None,
                'updated_at': product.updated_at.isoformat() if product.updated_at else None,
            })
        
        # Get unique categories for frontend filters
        all_products = Product.objects(is_active=True)
        categories = list(set([p.category for p in all_products]))
        categories.sort()
        
        return Response({
            'products': products_data,
            'total': len(products_data),
            'categories': categories,
            'filters_applied': {
                'category': category,
                'min_price': min_price,
                'max_price': max_price,
                'search': search,
                'in_stock_only': in_stock_only
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error in get_products: {e}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_product_by_id(request, product_id):
    """Get single product details"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        product = Product.objects(id=product_id, is_active=True).first()
        
        if not product:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        product_data = {
            'id': str(product.id),
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'category': product.category,
            'image': product.image,
            'features': product.features,
            'specifications': product.specifications,
            'stock': product.stock,
            'in_stock': product.stock > 0,
            'is_low_stock': product.stock <= product.low_stock_threshold,
            'low_stock_threshold': product.low_stock_threshold,
            'created_at': product.created_at.isoformat() if product.created_at else None,
            'updated_at': product.updated_at.isoformat() if product.updated_at else None,
        }
        
        return Response(product_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_categories(request):
    """Get all product categories"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Get distinct categories from products
        categories = Product.objects(is_active=True).distinct('category')
        categories_data = []
        
        for category in categories:
            product_count = Product.objects(category=category, is_active=True).count()
            categories_data.append({
                'name': category,
                'product_count': product_count,
                'slug': category.lower().replace(' ', '_')
            })
        
        categories_data.sort(key=lambda x: x['name'])
        
        return Response({
            'categories': categories_data,
            'total_categories': len(categories_data)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_stats(request):
    """Get product statistics"""
    try:
        if not connect_to_mongodb():
            return Response({'error': 'Database connection failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        total_products = Product.objects(is_active=True).count()
        in_stock_products = Product.objects(is_active=True, stock__gt=0).count()
        low_stock_products = Product.objects(is_active=True).filter(stock__lte=5, stock__gt=0).count()
        out_of_stock_products = Product.objects(is_active=True, stock=0).count()
        
        # Price statistics
        products = Product.objects(is_active=True)
        if products:
            prices = [p.price for p in products]
            min_price = min(prices)
            max_price = max(prices)
            avg_price = sum(prices) / len(prices)
        else:
            min_price = max_price = avg_price = 0
        
        return Response({
            'total_products': total_products,
            'in_stock_products': in_stock_products,
            'low_stock_products': low_stock_products,
            'out_of_stock_products': out_of_stock_products,
            'price_range': {
                'min': min_price,
                'max': max_price,
                'average': round(avg_price, 2)
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)