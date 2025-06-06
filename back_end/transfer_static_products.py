import os
import sys
import django
import mongoengine
from datetime import datetime

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back_end.settings')
django.setup()

# Connect to MongoDB
from django.conf import settings
mongoengine.connect(
    db=settings.MONGODB_SETTINGS['db'],
    host=settings.MONGODB_SETTINGS['host']
)

# Import models
from shop_products.models import Product

def transfer_frontend_products():
    """Transfer static products from frontend to backend"""
    
    print("Transferring static products from frontend to backend...")
    print("=" * 60)
    
    # Your exact static product data from frontend
    frontend_products = [
        {
            "name": "Double Size Bed",
            "category": "Bed",
            "price": 15999.0,
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
                "weight_capacity": "200kg",
                "thickness": "6 inches"
            },
            "stock": 25,
            "image": "/images/doublesize.jpg"
        },
        {
            "name": "Floral Printed Pillow Cover",
            "category": "Pillow",
            "price": 599.0,
            "description": "Beautiful floral printed cotton pillow cover for a touch of elegance to your bedroom.",
            "features": [
                '100% cotton material', 
                'Vibrant colors', 
                'Machine washable', 
                'Zipper closure'
            ],
            "specifications": {
                "material": "100% Cotton",
                "size": "Standard",
                "care": "Machine washable",
                "closure": "Zipper",
                "pattern": "Floral print"
            },
            "stock": 50,
            "image": "/images/FloralPrintedCottonBedPillow.jpg"
        },
        {
            "name": "Hostel Size Bed",
            "category": "Bed",
            "price": 9999.0,
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
                "weight_capacity": "100kg",
                "thickness": "4 inches"
            },
            "stock": 35,
            "image": "/images/hostelsize.jpg"
        },
        {
            "name": "Kapok Cotton Fiber",
            "category": "Raw Material",
            "price": 1999.0,
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
            "stock": 100,
            "image": "/images/KapokFiberPod.jpg"
        },
        {
            "name": "Kapok Silk Cotton Raw",
            "category": "Raw Material",
            "price": 2499.0,
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
            "stock": 75,
            "image": "/images/KapokSilkCottonRaw.jpg"
        },
        {
            "name": "King Size Bed",
            "category": "Bed",
            "price": 22999.0,
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
                "weight_capacity": "250kg",
                "thickness": "8 inches",
                "layers": "Multi-layer comfort"
            },
            "stock": 15,
            "image": "/images/kingsize.jpg"
        },
        {
            "name": "Cotton Pillow",
            "category": "Pillow",
            "price": 1299.0,
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
            "stock": 60,
            "image": "/images/nagcottonpillows.jpg"
        },
        {
            "name": "Queen Size Bed",
            "category": "Bed",
            "price": 18999.0,
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
                "weight_capacity": "220kg",
                "thickness": "7 inches",
                "firmness": "Medium-firm"
            },
            "stock": 20,
            "image": "/images/queensize.jpg"
        },
        {
            "name": "Single Size Bed",
            "category": "Bed",
            "price": 11999.0,
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
                "weight_capacity": "120kg",
                "thickness": "5 inches",
                "portability": "Lightweight"
            },
            "stock": 30,
            "image": "/images/singlesize.jpg"
        }
    ]
    
    created_products = []
    updated_products = []
    
    try:
        for product_data in frontend_products:
            # Check if product already exists
            existing_product = Product.objects(name=product_data['name']).first()
            
            if existing_product:
                # Update existing product
                existing_product.category = product_data['category']
                existing_product.price = product_data['price']
                existing_product.description = product_data['description']
                existing_product.features = product_data['features']
                existing_product.specifications = product_data['specifications']
                existing_product.stock = product_data['stock']
                existing_product.image = product_data['image']
                existing_product.updated_at = datetime.utcnow()
                existing_product.save()
                
                updated_products.append(product_data['name'])
                print(f"Updated: {product_data['name']}")
                
            else:
                # Create new product
                new_product = Product(
                    name=product_data['name'],
                    category=product_data['category'],
                    price=product_data['price'],
                    description=product_data['description'],
                    features=product_data['features'],
                    specifications=product_data['specifications'],
                    stock=product_data['stock'],
                    image=product_data['image'],
                    is_active=True,
                    low_stock_threshold=5
                )
                new_product.save()
                
                created_products.append(product_data['name'])
                print(f"Created: {product_data['name']}")
        
        print("\n" + "=" * 60)
        print("Transfer completed successfully!")
        print(f"Products created: {len(created_products)}")
        print(f"Products updated: {len(updated_products)}")
        print(f"Total products in database: {Product.objects.count()}")
        
        # Display summary
        if created_products:
            print(f"\nNew products:")
            for name in created_products:
                print(f"   - {name}")
        
        if updated_products:
            print(f"\nUpdated products:")
            for name in updated_products:
                print(f"   - {name}")
        
        # Show categories
        categories = Product.objects.distinct('category')
        print(f"\nCategories: {', '.join(categories)}")
        
        return True
        
    except Exception as e:
        print(f"Error during transfer: {e}")
        return False

def display_current_products():
    """Display current products in database"""
    print("\nCurrent Products in Database:")
    print("=" * 60)
    
    products = Product.objects.order_by('category', 'name')
    
    if not products:
        print("No products found in database.")
        return
    
    current_category = None
    for product in products:
        if current_category != product.category:
            current_category = product.category
            print(f"\n{current_category}:")
        
        print(f"   • {product.name} - ₹{product.price:,.0f} (Stock: {product.stock})")

def clear_all_products():
    """Clear all products from database (use with caution)"""
    count = Product.objects.count()
    if count > 0:
        Product.objects.delete()
        print(f"Cleared {count} products from database")
    else:
        print("No products to clear")

if __name__ == "__main__":
    print("Frontend to Backend Product Transfer Tool")
    print("=" * 60)
    
    while True:
        print("\nOptions:")
        print("1. Transfer products from frontend to backend")
        print("2. Display current products in database")
        print("3. Clear all products (Use with caution)")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ").strip()
        
        if choice == '1':
            transfer_frontend_products()
        elif choice == '2':
            display_current_products()
        elif choice == '3':
            confirm = input("Are you sure you want to clear all products? (yes/no): ").strip().lower()
            if confirm == 'yes':
                clear_all_products()
            else:
                print("Operation cancelled")
        elif choice == '4':
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")
