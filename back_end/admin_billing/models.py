import mongoengine as me
from datetime import datetime

class Order(me.Document):
    # Basic Order Info
    order_number = me.StringField(required=True, unique=True, max_length=50)
    
    # Customer Information
    customer_name = me.StringField(required=True, max_length=100)
    customer_email = me.EmailField(required=True)
    customer_phone = me.StringField(required=True, max_length=20)
    customer_address = me.StringField(required=True)
    
    # Order Items (Enhanced for multiple products)
    order_items = me.ListField(me.DictField(), default=list)  # Array of items
    
    # Legacy fields for backward compatibility
    product_name = me.StringField(max_length=200)
    product_category = me.StringField(max_length=50)
    product_specifications = me.DictField(default=dict)
    quantity = me.IntField(default=1)
    unit_price = me.FloatField(default=0.0)
    
    # Financial Information
    subtotal = me.FloatField(required=True)
    tax_amount = me.FloatField(default=0.0)
    delivery_charges = me.FloatField(default=0.0)
    cod_charges = me.FloatField(default=0.0)
    total_amount = me.FloatField(required=True)
    
    # Payment Information (Updated to include 'completed')
    payment_method = me.StringField(choices=['upi', 'card', 'netbanking', 'cod'], required=True)
    payment_status = me.StringField(
        choices=['pending', 'paid', 'completed', 'failed', 'refunded'], 
        default='pending'
    )
    
    # Delivery Information
    delivery_option = me.StringField(choices=['standard', 'express'], default='standard')
    expected_delivery_date = me.StringField(max_length=100)
    delivery_notes = me.StringField(max_length=500)
    
    # Order Status
    status = me.StringField(
        choices=['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default='pending'
    )
    
    # Timestamps
    created_at = me.DateTimeField(default=datetime.utcnow)
    updated_at = me.DateTimeField(default=datetime.utcnow)
    delivered_at = me.DateTimeField()
    
    # Additional Info
    notes = me.StringField(max_length=500)
    
    meta = {
        'collection': 'orders',
        'ordering': ['-created_at'],
        'indexes': [
            'order_number',
            'customer_email',
            'status',
            'payment_method',
            'created_at'
        ]
    }
    
    def __str__(self):
        return f"Order {self.order_number} - {self.customer_name}"