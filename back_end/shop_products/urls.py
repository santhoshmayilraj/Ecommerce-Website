from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_products, name='get_products'),  # GET /api/products/
    path('stats/', views.get_stats, name='get_product_stats'),  # GET /api/products/stats/
    path('categories/', views.get_categories, name='get_categories'),  # GET /api/products/categories/
    path('<str:product_id>/', views.get_product_by_id, name='get_product_by_id'),  # GET /api/products/{id}/
]