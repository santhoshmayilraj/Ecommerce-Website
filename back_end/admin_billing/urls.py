from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.get_admin_dashboard, name='get_admin_dashboard'),  # GET /api/billing/dashboard/
    path('orders/', views.get_admin_orders, name='get_admin_orders'),  # GET /api/billing/orders/
    path('orders/create/', views.create_order, name='create_order'),  # POST /api/billing/orders/create/
    path('orders/<str:order_id>/status/', views.update_order_status, name='update_order_status'),  # PUT /api/billing/orders/{id}/status/
    path('sample/create/', views.create_sample_orders, name='create_sample_orders'),  # POST /api/billing/sample/create/
]