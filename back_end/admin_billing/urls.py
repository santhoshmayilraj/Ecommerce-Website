from django.urls import path
from . import views

urlpatterns = [
    # Order endpoints (will be at /api/billing/orders/)
    path('orders/', views.create_order, name='create_order'),
    path('orders/<str:order_number>/', views.get_order_details, name='order_details'),
    
    # Admin endpoints (will be at /api/billing/admin/...)
    path('admin/dashboard/', views.get_admin_dashboard, name='admin_dashboard'),
    path('admin/orders/', views.get_admin_orders, name='admin_orders'),
    path('admin/orders/<str:order_id>/update/', views.update_order_status, name='update_order_status'),
    path('admin/orders/<str:order_id>/delete/', views.delete_order, name='delete_order'),
    path('admin/create-sample-orders/', views.create_sample_orders, name='create_sample_orders'),
]