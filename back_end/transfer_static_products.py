import os
import sys
import django
import mongoengine
from datetime import datetime

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back_end.settings')
django.setup()

# Connect to MongoDB
from django.conf import settings
mongoengine.connect(
    db=settings.MONGODB_SETTINGS['db'],
    host=settings.MONGODB_SETTINGS['host']
)

from shop_products.models import Product

def transfer_exact_frontend_products():
    """Transfer your exact frontend product data to backend"""
    
    print("Transferring Exact Frontend Products to Backend")
    print("=" * 60)
    
    # Your exact frontend product data
    frontend_products = [
        {
            "name": "Double Size Bed",
            "category": "bed",
            "price": 15999.0,
            "rating": 4.8,
            "image": "/images/doublesize.jpg",
            "description": "Comfortable double-sized bed with premium silk cotton mattress for couples.",
            "features": [
                'Dimensions: 75" x 54"', 
                'Premium silk cotton material', 
                'Ergonomic design', 
                'Long-lasting comfort'
            ],
            "specifications": {
                "dimensions": '75" x 54"',
                "material": "Premium silk cotton",
                "type": "Double bed",
                "thickness": "6 inches",
                "weight_capacity": "200kg"
            },
            "stock": 25
        },
        {
            "name": "Floral Printed Pillow Cover",
            "category": "pillow",
            "price": 599.0,
            "rating": 4.6,
            "image": "/images/FloralPrintedCottonBedPillow.jpg",
            "description": "Beautiful floral printed cotton pillow cover for a touch of elegance to your bedroom.",
            "features": [
                '100% cotton material', 
                'Vibrant colors', 
                'Machine washable', 
                'Zipper closure'
            ],
            "specifications": {
                "material": "100% Cotton",
                "size": "Standard (18x28 inches)",
                "care": "Machine washable",
                "closure": "Zipper",
                "pattern": "Floral print"
            },
            "stock": 50
        },
        {
            "name": "Hostel Size Bed",
            "category": "bed",
            "price": 9999.0,
            "rating": 4.7,
            "image": "/images/hostelsize.jpg",
            "description": "Compact and comfortable bed perfect for hostel and dormitory use.",
            "features": [
                'Space-saving design', 
                'Durable construction', 
                'Easy to transport', 
                'Hypoallergenic'
            ],
            "specifications": {
                "dimensions": '72" x 30"',
                "material": "Cotton blend",
                "type": "Single bed",
                "thickness": "4 inches",
                "weight_capacity": "100kg",
                "portability": "Easy to transport"
            },
            "stock": 35
        },
        {
            "name": "Kapok Cotton Fiber",
            "category": "raw",
            "price": 1999.0,
            "rating": 4.9,
            "image": "/images/KapokFiberPod.jpg",
            "description": "Pure kapok cotton fiber for custom filling of pillows and cushions.",
            "features": [
                '100% natural', 
                'Chemical-free', 
                'Hypoallergenic', 
                'Lightweight and fluffy'
            ],
            "specifications": {
                "material": "100% Kapok fiber",
                "weight": "1kg pack",
                "purity": "100% natural",
                "processing": "Unprocessed",
                "usage": "Pillow/cushion filling"
            },
            "stock": 100
        },
        {
            "name": "Kapok Silk Cotton Raw",
            "category": "raw",
            "price": 2499.0,
            "rating": 4.9,
            "image": "/images/KapokSilkCottonRaw.jpg",
            "description": "Raw kapok silk cotton for premium quality mattress and pillow making.",
            "features": [
                'Premium quality', 
                'Unprocessed raw material', 
                'Sustainable source', 
                'All-natural fibers'
            ],
            "specifications": {
                "material": "Kapok silk cotton",
                "weight": "2kg pack",
                "grade": "Premium",
                "processing": "Raw/Unprocessed",
                "sustainability": "Eco-friendly"
            },
            "stock": 75
        },
        {
            "name": "King Size Bed",
            "category": "bed",
            "price": 22999.0,
            "rating": 5.0,
            "image": "/images/kingsize.jpg",
            "description": "Luxurious king-sized bed for ultimate comfort and space.",
            "features": [
                'Dimensions: 78" x 72"', 
                'Premium silk cotton filling', 
                'Extra comfort layer', 
                'Temperature regulating'
            ],
            "specifications": {
                "dimensions": '78" x 72"',
                "material": "Premium silk cotton",
                "type": "King bed",
                "thickness": "8 inches",
                "weight_capacity": "250kg",
                "features": "Temperature regulating"
            },
            "stock": 15
        },
        {
            "name": "Cotton Pillow",
            "category": "pillow",
            "price": 1299.0,
            "rating": 4.7,
            "image": "/images/nagcottonpillows.jpg",
            "description": "Soft and comfortable cotton pillows for peaceful sleep.",
            "features": [
                'Pure cotton fill', 
                'Perfect neck support', 
                'Dust mite resistant', 
                'Breathable fabric'
            ],
            "specifications": {
                "material": "Pure cotton",
                "size": "Standard (18x28 inches)",
                "firmness": "Medium",
                "cover": "Cotton fabric",
                "filling": "Cotton fiber"
            },
            "stock": 60
        },
        {
            "name": "Queen Size Bed",
            "category": "bed",
            "price": 18999.0,
            "rating": 4.8,
            "image": "/images/queensize.jpg",
            "description": "Elegant queen-sized bed with premium comfort for couples.",
            "features": [
                'Dimensions: 78" x 60"', 
                'Premium quality cotton', 
                'Medium-firm support', 
                'Durable stitching'
            ],
            "specifications": {
                "dimensions": '78" x 60"',
                "material": "Premium cotton",
                "type": "Queen bed",
                "thickness": "7 inches",
                "weight_capacity": "220kg",
                "firmness": "Medium-firm"
            },
            "stock": 20
        },
        {
            "name": "Single Size Bed",
            "category": "bed",
            "price": 11999.0,
            "rating": 4.8,
            "image": "/images/singlesize.jpg",
            "description": "Comfortable single-sized bed perfect for one person.",
            "features": [
                'Dimensions: 75" x 36"', 
                'Premium silk cotton filling', 
                'Ergonomic design', 
                'Lightweight and portable'
            ],
            "specifications": {
                "dimensions": '75" x 36"',
                "material": "Premium silk cotton",
                "type": "Single bed",
                "thickness": "5 inches",
                "weight_capacity": "120kg",
                "portability": "Lightweight"
            },
            "stock": 30
        }
    ]
    
    try:
        # Clear existing products
        existing_count = Product.objects.count()
        if existing_count > 0:
            choice = input(f"Found {existing_count} existing products. Clear them? (y/n): ").lower()
            if choice == 'y':
                Product.objects.delete()
                print(f"Cleared {existing_count} existing products")
        
        created_products = []
        
        for product_data in frontend_products:
            # Create new product with exact data
            product = Product(
                name=product_data['name'],
                category=product_data['category'],
                price=product_data['price'],
                rating=product_data['rating'],
                image=product_data['image'],
                description=product_data['description'],
                features=product_data['features'],
                specifications=product_data['specifications'],
                stock=product_data['stock'],
                is_active=True,
                low_stock_threshold=5
            )
            product.save()
            created_products.append(product.name)
            print(f"Created: {product.name} - ₹{product.price:,.0f} (Stock: {product.stock})")
        
        print("\n" + "=" * 60)
        print("Transfer Completed Successfully!")
        print(f"Products created: {len(created_products)}")
        print(f"Total products in database: {Product.objects.count()}")
        
        # Show summary by category
        categories = Product.objects.distinct('category')
        print(f"\nCategories: {', '.join(categories)}")
        
        for category in categories:
            count = Product.objects(category=category).count()
            print(f"{category}: {count} products")
        
        return True
        
    except Exception as e:
        print(f"Error during transfer: {e}")
        return False

if __name__ == "__main__":
    transfer_exact_frontend_products()