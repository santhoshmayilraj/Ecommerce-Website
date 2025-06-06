from mongoengine import Document, StringField, FloatField, IntField, ListField, DateTimeField, BooleanField, DictField
from datetime import datetime

class Product(Document):
    # Basic product info
    name = StringField(max_length=200, required=True)
    description = StringField()
    price = FloatField(required=True)
    category = StringField(max_length=100, required=True)
    image = StringField()  # Image URL/path
    
    # Product details
    features = ListField(StringField(max_length=100))
    specifications = DictField()  # Size, thickness, material, etc.
    
    # Inventory
    stock = IntField(default=0)
    is_active = BooleanField(default=True)
    
    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'products',
        'indexes': ['name', 'category', 'price']
    }

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        super().save(*args, **kwargs)