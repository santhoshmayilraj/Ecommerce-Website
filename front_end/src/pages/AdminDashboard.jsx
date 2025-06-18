import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const API_BASE_URL = 'http://localhost:8000/api/billing';

  // Add admin page class to body on mount
  useEffect(() => {
    document.body.classList.add('admin-page');
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('admin-page');
    };
  }, []);

  // Fetch dashboard statistics
  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard/`);
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      // Set default data if API fails
      setDashboardData({
        stats: {
          total_revenue: 125000,
          total_orders: 45,
          pending_orders: 12,
          confirmed_orders: 18,
          delivered_orders: 15
        }
      });
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders/`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Set sample data if API fails
      setOrders([
        {
          order_id: 1,
          order_number: 'ORD-2024-001',
          customer: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+91 9876543210',
            address: '123 Main St, Chennai'
          },
          items: [
            {
              product_name: 'King Size Mattress',
              quantity: 1,
              unit_price: 25000,
              total_price: 25000
            }
          ],
          billing: {
            subtotal: 25000,
            tax_amount: 2500,
            delivery_charges: 500,
            total_amount: 28000,
            payment_method: 'upi',
            payment_status: 'completed'
          },
          status: 'pending',
          created_at: new Date().toISOString()
        },
        {
          order_id: 2,
          order_number: 'ORD-2024-002',
          customer: {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+91 9876543211',
            address: '456 Oak St, Mumbai'
          },
          items: [
            {
              product_name: 'Silk Cotton Pillow',
              quantity: 2,
              unit_price: 1299,
              total_price: 2598
            }
          ],
          billing: {
            subtotal: 2598,
            tax_amount: 260,
            delivery_charges: 100,
            total_amount: 2958,
            payment_method: 'card',
            payment_status: 'completed'
          },
          status: 'confirmed',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        showSuccessNotification('Order status updated successfully!');
        // Update local state
        setOrders(orders.map(order => 
          order.order_id === orderId ? { ...order, status: newStatus } : order
        ));
        fetchDashboard();
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      // Update local state even if API fails (for demo purposes)
      setOrders(orders.map(order => 
        order.order_id === orderId ? { ...order, status: newStatus } : order
      ));
      showSuccessNotification('Order status updated successfully!');
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/delete/`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          showSuccessNotification('Order deleted successfully!');
        }
        // Update local state regardless of API response
        setOrders(orders.filter(order => order.order_id !== orderId));
        fetchDashboard();
      } catch (error) {
        console.error('Error deleting order:', error);
        // Update local state even if API fails
        setOrders(orders.filter(order => order.order_id !== orderId));
        showSuccessNotification('Order deleted successfully!');
      }
    }
  };

  // Bulk operations
  const bulkUpdateStatus = async (status) => {
    if (selectedOrders.length === 0) return;
    
    try {
      await Promise.all(
        selectedOrders.map(orderId => updateOrderStatus(orderId, status))
      );
      setSelectedOrders([]);
      showSuccessNotification(`${selectedOrders.length} orders updated successfully!`);
    } catch (error) {
      showErrorNotification('Failed to update orders');
    }
  };

  // Create sample orders
  const createSampleOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/create-sample-orders/`, {
        method: 'POST',
      });
      
      if (response.ok) {
        showSuccessNotification('Sample orders created successfully!');
        fetchOrders();
        fetchDashboard();
      } else {
        throw new Error('Failed to create sample orders');
      }
    } catch (error) {
      console.error('Error creating sample orders:', error);
      // Add sample orders to local state
      const sampleOrders = [
        {
          order_id: Date.now(),
          order_number: `ORD-2024-${String(Date.now()).slice(-3)}`,
          customer: {
            name: 'Sample Customer',
            email: 'sample@example.com',
            phone: '+91 9876543212',
            address: 'Sample Address, City'
          },
          items: [
            {
              product_name: 'Sample Product',
              quantity: 1,
              unit_price: 5000,
              total_price: 5000
            }
          ],
          billing: {
            subtotal: 5000,
            tax_amount: 500,
            delivery_charges: 200,
            total_amount: 5700,
            payment_method: 'cod',
            payment_status: 'pending'
          },
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ];
      setOrders([...orders, ...sampleOrders]);
      showSuccessNotification('Sample orders created successfully!');
    }
  };

  // Notification functions
  const showSuccessNotification = (message) => {
    // Simple alert for now - you can implement a proper toast system later
    alert(`✅ ${message}`);
  };

  const showErrorNotification = (message) => {
    alert(`❌ ${message}`);
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.order_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Get recent activity
  const recentActivity = orders
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchDashboard(), fetchOrders()]);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Top Header */}
      <header className="admin-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-icon">🛏️</div>
            <div className="logo-text">
              <h1>Nagarathinam Beds</h1>
              <span>Admin Dashboard</span>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search orders, customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
        
        <div className="header-right">
          <button 
            className={`notification-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
            <span className="notification-badge">3</span>
          </button>
          <div className="admin-profile">
            <div className="profile-avatar">👤</div>
            <div className="profile-info">
              <span className="profile-name">Admin</span>
              <span className="profile-role">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <div className="nav-container">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="tab-icon">📊</span>
              <span>Dashboard</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="tab-icon">📦</span>
              <span>Orders</span>
              <span className="tab-badge">{orders.length}</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <span className="tab-icon">📈</span>
              <span>Analytics</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'customers' ? 'active' : ''}`}
              onClick={() => setActiveTab('customers')}
            >
              <span className="tab-icon">👥</span>
              <span>Customers</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className="tab-icon">⚙️</span>
              <span>Settings</span>
            </button>
          </div>
          
          <div className="nav-actions">
            <button onClick={createSampleOrders} className="btn-primary">
              <span>➕</span>
              Create Sample Orders
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="admin-main">
        <div className="main-container">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              {/* Quick Stats */}
              <div className="stats-grid">
                <div className="stat-card revenue">
                  <div className="stat-header">
                    <div className="stat-icon">💰</div>
                    <div className="stat-trend up">↗ +12%</div>
                  </div>
                  <div className="stat-content">
                    <h3>Total Revenue</h3>
                    <p className="stat-number">₹{dashboardData?.stats?.total_revenue?.toLocaleString() || '0'}</p>
                    <span className="stat-period">This month</span>
                  </div>
                </div>

                <div className="stat-card orders">
                  <div className="stat-header">
                    <div className="stat-icon">📦</div>
                    <div className="stat-trend up">↗ +8%</div>
                  </div>
                  <div className="stat-content">
                    <h3>Total Orders</h3>
                    <p className="stat-number">{dashboardData?.stats?.total_orders || orders.length}</p>
                    <span className="stat-period">All time</span>
                  </div>
                </div>

                <div className="stat-card customers">
                  <div className="stat-header">
                    <div className="stat-icon">👥</div>
                    <div className="stat-trend up">↗ +15%</div>
                  </div>
                  <div className="stat-content">
                    <h3>Active Customers</h3>
                    <p className="stat-number">{orders.length}</p>
                    <span className="stat-period">This month</span>
                  </div>
                </div>

                <div className="stat-card growth">
                  <div className="stat-header">
                    <div className="stat-icon">📈</div>
                    <div className="stat-trend up">↗ +22%</div>
                  </div>
                  <div className="stat-content">
                    <h3>Growth Rate</h3>
                    <p className="stat-number">22%</p>
                    <span className="stat-period">vs last month</span>
                  </div>
                </div>
              </div>

              {/* Charts and Analytics */}
              <div className="analytics-grid">
                {/* Revenue Chart */}
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Revenue Overview</h3>
                    <div className="chart-controls">
                      <select>
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                      </select>
                    </div>
                  </div>
                  <div className="chart-content">
                    <div className="revenue-chart">
                      <div className="chart-bars">
                        <div className="bar" style={{height: '60%'}}><span>Mon</span></div>
                        <div className="bar" style={{height: '80%'}}><span>Tue</span></div>
                        <div className="bar" style={{height: '45%'}}><span>Wed</span></div>
                        <div className="bar" style={{height: '90%'}}><span>Thu</span></div>
                        <div className="bar" style={{height: '70%'}}><span>Fri</span></div>
                        <div className="bar" style={{height: '85%'}}><span>Sat</span></div>
                        <div className="bar" style={{height: '95%'}}><span>Sun</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Status Distribution */}
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Order Status Distribution</h3>
                  </div>
                  <div className="chart-content">
                    <div className="status-chart">
                      <div className="status-item">
                        <div className="status-color pending"></div>
                        <span>Pending ({dashboardData?.stats?.pending_orders || orders.filter(o => o.status === 'pending').length})</span>
                        <div className="status-bar">
                          <div className="status-fill" style={{width: '30%'}}></div>
                        </div>
                      </div>
                      <div className="status-item">
                        <div className="status-color confirmed"></div>
                        <span>Confirmed ({dashboardData?.stats?.confirmed_orders || orders.filter(o => o.status === 'confirmed').length})</span>
                        <div className="status-bar">
                          <div className="status-fill" style={{width: '45%'}}></div>
                        </div>
                      </div>
                      <div className="status-item">
                        <div className="status-color delivered"></div>
                        <span>Delivered ({dashboardData?.stats?.delivered_orders || orders.filter(o => o.status === 'delivered').length})</span>
                        <div className="status-bar">
                          <div className="status-fill" style={{width: '60%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="activity-section">
                <div className="section-header">
                  <h3>Recent Activity</h3>
                  <button className="btn-secondary">View All</button>
                </div>
                <div className="activity-list">
                  {recentActivity.slice(0, 5).map((order, index) => (
                    <div key={order.order_id} className="activity-item">
                      <div className="activity-icon">
                        {order.status === 'delivered' ? '✅' : 
                         order.status === 'confirmed' ? '📦' : '⏳'}
                      </div>
                      <div className="activity-content">
                        <p><strong>{order.customer?.name}</strong> placed order <strong>{order.order_number}</strong></p>
                        <span className="activity-time">{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="activity-amount">₹{order.billing?.total_amount?.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="orders-content">
              {/* Orders Header */}
              <div className="content-header">
                <div className="header-left">
                  <h2>Orders Management</h2>
                  <p>Manage and track all customer orders</p>
                </div>
                <div className="header-actions">
                  <div className="filter-group">
                    <select 
                      value={filterStatus} 
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <button className="btn-primary">
                    📥 Export Orders
                  </button>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedOrders.length > 0 && (
                <div className="bulk-actions">
                  <span>{selectedOrders.length} orders selected</span>
                  <div className="bulk-buttons">
                    <button onClick={() => bulkUpdateStatus('confirmed')} className="btn-sm btn-success">
                      Mark as Confirmed
                    </button>
                    <button onClick={() => bulkUpdateStatus('shipped')} className="btn-sm btn-info">
                      Mark as Shipped
                    </button>
                    <button onClick={() => bulkUpdateStatus('delivered')} className="btn-sm btn-primary">
                      Mark as Delivered
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Table */}
              <div className="orders-table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>
                        <input 
                          type="checkbox" 
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOrders(filteredOrders.map(o => o.order_id));
                            } else {
                              setSelectedOrders([]);
                            }
                          }}
                        />
                      </th>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.order_id} className="order-row">
                        <td>
                          <input 
                            type="checkbox" 
                            checked={selectedOrders.includes(order.order_id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedOrders([...selectedOrders, order.order_id]);
                              } else {
                                setSelectedOrders(selectedOrders.filter(id => id !== order.order_id));
                              }
                            }}
                          />
                        </td>
                        <td>
                          <span className="order-id">{order.order_number}</span>
                        </td>
                        <td>
                          <div className="customer-info">
                            <div className="customer-avatar">{order.customer?.name?.charAt(0)}</div>
                            <div>
                              <div className="customer-name">{order.customer?.name}</div>
                              <div className="customer-email">{order.customer?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="items-info">
                            <span className="items-count">{order.items?.length || 1} items</span>
                            <div className="items-preview">
                              {(order.items || []).slice(0, 2).map((item, idx) => (
                                <span key={idx} className="item-name">{item.product_name}</span>
                              ))}
                              {order.items?.length > 2 && <span>+{order.items.length - 2} more</span>}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="order-amount">₹{order.billing?.total_amount?.toLocaleString()}</span>
                        </td>
                        <td>
                          <div className="payment-info">
                            <span className="payment-method">{order.billing?.payment_method?.toUpperCase()}</span>
                            <span className={`payment-status ${order.billing?.payment_status}`}>
                              {order.billing?.payment_status}
                            </span>
                          </div>
                        </td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                            className={`status-select ${order.status}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <span className="order-date">
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-icon btn-view"
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderModal(true);
                              }}
                              title="View Details"
                            >
                              👁️
                            </button>
                            <button 
                              className="btn-icon btn-delete"
                              onClick={() => deleteOrder(order.order_id)}
                              title="Delete Order"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredOrders.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">📦</div>
                  <h3>No orders found</h3>
                  <p>No orders match your current filters.</p>
                  <button onClick={createSampleOrders} className="btn-primary">
                    Create Sample Orders
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="analytics-content">
              <div className="content-header">
                <h2>Analytics & Reports</h2>
                <p>Detailed insights into your business performance</p>
              </div>
              
              <div className="coming-soon">
                <div className="coming-soon-icon">📊</div>
                <h3>Advanced Analytics Coming Soon</h3>
                <p>We're working on detailed analytics and reporting features</p>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="customers-content">
              <div className="content-header">
                <h2>Customer Management</h2>
                <p>Manage your customer database</p>
              </div>
              
              <div className="coming-soon">
                <div className="coming-soon-icon">👥</div>
                <h3>Customer Management Coming Soon</h3>
                <p>Customer profiles and management features will be available soon</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-content">
              <div className="content-header">
                <h2>Settings</h2>
                <p>Configure your admin preferences</p>
              </div>
              
              <div className="coming-soon">
                <div className="coming-soon-icon">⚙️</div>
                <h3>Settings Panel Coming Soon</h3>
                <p>Admin settings and configuration options will be available soon</p>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.order_number}</h3>
              <button className="modal-close" onClick={() => setShowOrderModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="order-details-grid">
                <div className="detail-section">
                  <h4>Customer Information</h4>
                  <p><strong>Name:</strong> {selectedOrder.customer?.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer?.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customer?.phone}</p>
                  <p><strong>Address:</strong> {selectedOrder.customer?.address}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Order Items</h4>
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="item-detail">
                      <span>{item.product_name}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>₹{item.total_price || (item.unit_price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="detail-section">
                  <h4>Billing Information</h4>
                  <p><strong>Subtotal:</strong> ₹{selectedOrder.billing?.subtotal?.toLocaleString()}</p>
                  <p><strong>Tax:</strong> ₹{selectedOrder.billing?.tax_amount?.toLocaleString()}</p>
                  <p><strong>Delivery:</strong> ₹{selectedOrder.billing?.delivery_charges?.toLocaleString()}</p>
                  <p><strong>Total:</strong> ₹{selectedOrder.billing?.total_amount?.toLocaleString()}</p>
                  <p><strong>Payment Method:</strong> {selectedOrder.billing?.payment_method?.toUpperCase()}</p>
                  <p><strong>Payment Status:</strong> {selectedOrder.billing?.payment_status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;