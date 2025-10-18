import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const { cart, getCartItemsCount } = useCart();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  // Mock order history data
  const [orderHistory] = useState([
    { id: 'ORD-001', date: '2024-01-15', total: 129.99, status: 'Delivered', items: 3 },
    { id: 'ORD-002', date: '2024-01-08', total: 89.99, status: 'Delivered', items: 2 },
    { id: 'ORD-003', date: '2024-01-02', total: 199.99, status: 'Processing', items: 1 }
  ]);

  // Mock wishlist data
  const [wishlist] = useState([
    { id: 1, name: 'Quantum Headphones', price: 299, image: '/api/placeholder/80/80' },
    { id: 2, name: 'Neural Smartwatch', price: 199, image: '/api/placeholder/80/80' },
    { id: 3, name: 'VR Headset Pro', price: 449, image: '/api/placeholder/80/80' }
  ]);

  if (!user) {
    return (
      <div className="page-container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
        <h1 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Profile Access Required</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
          Please log in to view and manage your profile
        </p>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // In real app, this would update user data via API
    console.log('Saving profile:', editForm);
    setIsEditing(false);
    // Here you would typically call an update function from your auth context
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const StatsCard = ({ title, value, icon, color }) => (
    <div style={{
      background: 'var(--bg-primary)',
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-light)',
      textAlign: 'center',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ 
        fontSize: '2rem', 
        marginBottom: '0.5rem',
        color: color || 'var(--primary)'
      }}>
        {icon}
      </div>
      <div style={{ 
        fontSize: '1.5rem', 
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: '0.25rem'
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '0.875rem', 
        color: 'var(--text-secondary)'
      }}>
        {title}
      </div>
    </div>
  );

  return (
    <div className="page-container" style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          padding: '3rem 2rem',
          borderRadius: 'var(--radius-lg)',
          color: 'white',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '700',
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  {user.name}
                </h1>
                <p style={{ 
                  margin: 0,
                  opacity: 0.9,
                  fontSize: '1.125rem'
                }}>
                  {user.email}
                </p>
              </div>
            </div>
            <p style={{ 
              opacity: 0.8,
              fontSize: '1rem',
              maxWidth: '500px'
            }}>
              Welcome back to your Quantum Shop profile! Manage your orders, wishlist, and account settings.
            </p>
          </div>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
        </div>

        {/* Stats Overview */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <StatsCard 
            title="Total Orders" 
            value={orderHistory.length} 
            icon="📦" 
            color="#10B981"
          />
          <StatsCard 
            title="Cart Items" 
            value={getCartItemsCount()} 
            icon="🛒" 
            color="#3B82F6"
          />
          <StatsCard 
            title="Wishlist" 
            value={wishlist.length} 
            icon="❤️" 
            color="#EF4444"
          />
          <StatsCard 
            title="Member Since" 
            value="2024" 
            icon="⭐" 
            color="#F59E0B"
          />
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          gap: '0',
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          marginBottom: '2rem',
          overflow: 'hidden'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'orders', label: 'My Orders', icon: '📦' },
            { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-primary)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ 
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Account Overview</h2>
              <div style={{ display: 'grid', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Recent Orders</h3>
                  {orderHistory.slice(0, 2).map(order => (
                    <div key={order.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600' }}>{order.id}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          {order.date} • {order.items} items
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '600' }}>${order.total}</div>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: order.status === 'Delivered' ? 'var(--success)' : 'var(--warning)'
                        }}>
                          {order.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary">Continue Shopping</button>
                    <button className="btn btn-outline">View All Orders</button>
                    <button className="btn btn-outline">Manage Addresses</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Order History</h2>
              {orderHistory.map(order => (
                <div key={order.id} style={{
                  background: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: '1rem',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>{order.id}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Ordered on {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>${order.total}</div>
                      <div style={{ 
                        fontSize: '0.875rem',
                        color: order.status === 'Delivered' ? 'var(--success)' : 
                               order.status === 'Processing' ? 'var(--warning)' : 'var(--text-secondary)',
                        fontWeight: '600'
                      }}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-light)'
                  }}>
                    <button className="btn btn-outline btn-small">View Details</button>
                    <button className="btn btn-outline btn-small">Track Order</button>
                    <button className="btn btn-outline btn-small">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>My Wishlist</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                {wishlist.map(item => (
                  <div key={item.id} style={{
                    background: 'var(--bg-secondary)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'var(--bg-primary)',
                      borderRadius: 'var(--radius-md)',
                      margin: '0 auto 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem'
                    }}>
                      {item.image ? '🖼️' : '📱'}
                    </div>
                    <h4 style={{ marginBottom: '0.5rem' }}>{item.name}</h4>
                    <div style={{ 
                      fontWeight: '700', 
                      color: 'var(--primary)',
                      marginBottom: '1rem'
                    }}>
                      ${item.price}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button className="btn btn-primary btn-small">Add to Cart</button>
                      <button className="btn btn-outline btn-small">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2>Account Settings</h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile}>
                  <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '500px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '500px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Full Name
                    </label>
                    <div style={{ 
                      padding: '0.75rem', 
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-md)'
                    }}>
                      {user.name}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Email Address
                    </label>
                    <div style={{ 
                      padding: '0.75rem', 
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-md)'
                    }}>
                      {user.email}
                    </div>
                  </div>
                </div>
              )}

              {/* Danger Zone */}
              <div style={{ 
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '2px solid var(--border-light)'
              }}>
                <h3 style={{ color: 'var(--error)', marginBottom: '1rem' }}>Danger Zone</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={logout}
                    className="btn btn-outline"
                    style={{ borderColor: 'var(--error)', color: 'var(--error)' }}
                  >
                    Logout
                  </button>
                  <button 
                    className="btn btn-outline"
                    style={{ borderColor: 'var(--error)', color: 'var(--error)' }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;