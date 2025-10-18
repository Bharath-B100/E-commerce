import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  if (!isAuthenticated) {
    return (
      <div className="page-container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
        <h2>Please Log In to Checkout</h2>
        <p>You need to be logged in to complete your purchase.</p>
        <Link to="/auth" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Login / Register
        </Link>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="page-container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Add some products to proceed to checkout.</p>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Create order (in real app, this would call your backend)
  const createOrder = async () => {
    // Simulate API call to your backend
    // In production, this should call your server to create a Razorpay order
    return {
      id: `order_${Date.now()}`,
      amount: Math.round(total * 100), // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };
  };

const handleRazorpayPayment = async () => {
  try {
    setLoading(true);

    // Validate shipping info
    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.address || !shippingInfo.phone) {
      alert('Please fill in all required shipping information');
      return;
    }

    console.log('Starting Razorpay payment...');
    console.log('Razorpay Key:', process.env.REACT_APP_RAZORPAY_KEY_ID);

    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Check if Razorpay is available
    if (!window.Razorpay) {
      alert('Razorpay not loaded properly');
      return;
    }

    // Create order (in real app, call your backend)
    const order = await createOrder();
    console.log('Order created:', order);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Quantum Shop',
      description: 'Purchase from Quantum Shop',
      image: 'https://via.placeholder.com/100', // Use a placeholder image
      order_id: order.id,
      handler: async function (response) {
        console.log('Payment successful:', response);
        
        try {
          await verifyPayment(response);
          clearCart();
          navigate('/order-success', { 
            state: { 
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              amount: total
            } 
          });
        } catch (error) {
          console.error('Payment verification failed:', error);
          alert('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        email: shippingInfo.email || 'test@example.com',
        contact: shippingInfo.phone || '9999999999'
      },
      notes: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state
      },
      theme: {
        color: '#6366f1'
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
          console.log('Payment modal closed by user');
        }
      }
    };

    console.log('Razorpay options:', options);

    const rzp = new window.Razorpay(options);
    
    // Add error handlers
    rzp.on('payment.failed', function (response) {
      console.error('Payment failed callback:', response.error);
      alert(`Payment failed: ${response.error.description}`);
      setLoading(false);
    });

    rzp.open();

  } catch (error) {
    console.error('Payment error details:', error);
    alert(`Payment failed: ${error.message}`);
    setLoading(false);
  }
};

  const verifyPayment = async (paymentResponse) => {
    // In a real app, send paymentResponse to your backend for verification
    // This would typically make a POST request to your server
    console.log('Verifying payment:', paymentResponse);

    // Mock verification for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Payment verified successfully');
        resolve(true);
      }, 1000);
    });
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'razorpay') {
      await handleRazorpayPayment();
    } else {
      // Handle other payment methods
      alert('Selected payment method not implemented');
    }
  };

  // Progress Bar Component (keep your existing one)
  const ProgressBar = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '3rem',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
      }}>
        {[
          { number: 1, label: 'Shipping', active: step >= 1 },
          { number: 2, label: 'Payment', active: step >= 2 },
          { number: 3, label: 'Review', active: step >= 3 }
        ].map((stepItem, index) => (
          <div key={stepItem.number} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: stepItem.active ? 'var(--primary)' : 'var(--bg-secondary)',
              color: stepItem.active ? 'white' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              border: stepItem.active ? '2px solid var(--primary)' : '2px solid var(--border-light)'
            }}>
              {stepItem.active ? '✓' : stepItem.number}
            </div>
            <span style={{
              fontWeight: stepItem.active ? '600' : '400',
              color: stepItem.active ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}>
              {stepItem.label}
            </span>
            {index < 2 && (
              <div style={{
                width: '80px',
                height: '2px',
                background: step > stepItem.number ? 'var(--primary)' : 'var(--border-light)',
                margin: '0 1rem'
              }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-container" style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: 'var(--text-primary)'
          }}>
            Checkout
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Complete your purchase in just a few steps
          </p>
        </div>

        <ProgressBar />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Main Content */}
          <div>
            {step === 1 && (
              <div style={{
                background: 'var(--bg-primary)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Shipping Information</h2>
                <form onSubmit={handleShippingSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
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
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* ADD THESE MISSING FIELDS */}
                  <div style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Street Address *
                    </label>
                    <textarea
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
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
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
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
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}
            {step === 2 && (
              <div style={{
                background: 'var(--bg-primary)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Payment Method</h2>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '600' }}>
                    Select Payment Method
                  </label>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      background: paymentMethod === 'razorpay' ? 'var(--bg-secondary)' : 'transparent'
                    }}>
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div>
                        <div style={{ fontWeight: '600' }}>Razorpay</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          Pay via UPI, Cards, Net Banking, Wallets
                        </div>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <img
                          src="https://razorpay.com/assets/razorpay-glyph.svg"
                          alt="Razorpay"
                          style={{ width: '24px', height: '24px' }}
                        />
                      </div>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      background: paymentMethod === 'cod' ? 'var(--bg-secondary)' : 'transparent'
                    }}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div>
                        <div style={{ fontWeight: '600' }}>Cash on Delivery</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          Pay when you receive your order
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => setStep(1)}
                  >
                    Back to Shipping
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => setStep(3)}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{
                background: 'var(--bg-primary)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Review Your Order</h2>

                {/* Order Summary */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Items</h3>
                  {cart.items.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 0',
                      borderBottom: '1px solid var(--border-light)'
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-md)'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600' }}>{item.name}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                          Quantity: {item.quantity}
                        </div>
                      </div>
                      <div style={{ fontWeight: '600' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Method */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Payment Method</h3>
                  <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <div style={{ fontWeight: '600' }}>
                      {paymentMethod === 'razorpay' ? 'Razorpay (UPI, Cards, Net Banking)' : 'Cash on Delivery'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => setStep(2)}
                  >
                    Back to Payment
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : `Pay with ${paymentMethod === 'razorpay' ? 'Razorpay' : 'COD'} - $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar (keep your existing one) */}
          <div style={{
            background: 'var(--bg-primary)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: '2rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>

            {/* Cart Items */}
            <div style={{ marginBottom: '1.5rem' }}>
              {cart.items.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      lineHeight: '1.3'
                    }}>
                      {item.name}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)'
                    }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '700',
                fontSize: '1.125rem',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '1rem'
              }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Security Badge */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              🔒 Secure checkout · SSL encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;