from mongoengine import Document, StringField, FloatField, IntField, ListField, DateTimeField, BooleanField, DictField
from datetime import datetime

class Order(Document):
    # Order identification
    order_number = StringField(max_length=50, required=True, unique=True)
    
    # Customer details
    customer_name = StringField(max_length=100, required=True)
    customer_email = StringField(max_length=100, required=True)
    customer_phone = StringField(max_length=15, required=True)
    customer_address = StringField(required=True)
    
    # Product details
    product_name = StringField(max_length=200, required=True)
    product_category = StringField(max_length=100)
    product_specifications = DictField()  # Size, color, etc.
    quantity = IntField(required=True, default=1)
    unit_price = FloatField(required=True)
    
    # Pricing
    subtotal = FloatField(required=True)  # quantity * unit_price
    tax_amount = FloatField(default=0.0)  # 18% GST
    total_amount = FloatField(required=True)  # subtotal + tax
    
    # Order status
    status = StringField(max_length=50, default='pending')  # pending, confirmed, delivered, cancelled
    payment_status = StringField(max_length=50, default='pending')  # pending, paid, failed
    payment_method = StringField(max_length=50)  # card, upi, cod, netbanking
    
    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    delivered_at = DateTimeField()
    
    # Notes
    notes = StringField()
    
    meta = {
        'collection': 'orders',
        'indexes': ['order_number', 'customer_email', 'status', 'created_at']
    }

    def __str__(self):
        return f"{self.order_number} - {self.customer_name}"