// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });

    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handleInputChange = (e) => {
        setCustomerInfo({
            ...customerInfo,
            [e.target.name]: e.target.value
        });
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const createOrder = async () => {
        // In a real app, this would call your backend API
        // For demo, we'll create a client-side order
        return {
            id: `order_${Date.now()}`,
            amount: Math.round(total * 100), // Amount in paise
            currency: 'INR'
        };
    };

    const handleRazorpayPayment = async () => {
        try {
            setLoading(true);

            // Validate form
            if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
                alert('Please fill in all required fields');
                return;
            }

            // Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                alert('Razorpay SDK failed to load. Are you online?');
                return;
            }

            // Create order (in real app, call your backend)
            const order = await createOrder();

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: 'Quantum Shop',
                description: 'Purchase from Quantum Shop',
                image: '/logo.png', // Your logo
                order_id: order.id,
                handler: async function (response) {
                    // Payment successful
                    console.log('Payment successful:', response);
                    
                    // In real app, verify payment with your backend
                    await verifyPayment(response);
                    
                    alert('Payment Successful! Order placed.');
                    clearCart();
                    navigate('/order-success', { 
                        state: { 
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id 
                        } 
                    });
                },
                prefill: {
                    name: customerInfo.name,
                    email: customerInfo.email,
                    contact: customerInfo.phone
                },
                notes: {
                    address: customerInfo.address
                },
                theme: {
                    color: '#6366f1' // Quantum theme color
                },
                modal: {
                    ondismiss: function() {
                        setLoading(false);
                        console.log('Payment modal closed');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const verifyPayment = async (paymentResponse) => {
        // In a real app, send paymentResponse to your backend for verification
        // This is a mock verification for demo
        console.log('Verifying payment:', paymentResponse);
        return true;
    };

    // Mock payment for demo (bypasses actual payment)
    const handleMockPayment = () => {
        alert('Mock payment successful! In production, this would use real Razorpay.');
        clearCart();
        navigate('/order-success', { 
            state: { 
                orderId: `mock_order_${Date.now()}`,
                paymentId: `mock_payment_${Date.now()}` 
            } 
        });
    };

    if (cart.items.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <h2>Your cart is empty</h2>
                <button 
                    onClick={() => navigate('/products')}
                    className="btn btn-primary"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            minHeight: '80vh'
        }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>
                Checkout
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
            }}>
                {/* Customer Information */}
                <div>
                    <div style={{
                        background: 'var(--bg-primary)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-light)',
                        marginBottom: '2rem'
                    }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Customer Information</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name *"
                                value={customerInfo.name}
                                onChange={handleInputChange}
                                style={{
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address *"
                                value={customerInfo.email}
                                onChange={handleInputChange}
                                style={{
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number *"
                                value={customerInfo.phone}
                                onChange={handleInputChange}
                                style={{
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                            <textarea
                                name="address"
                                placeholder="Shipping Address"
                                value={customerInfo.address}
                                onChange={handleInputChange}
                                rows="3"
                                style={{
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '1rem',
                                    resize: 'vertical'
                                }}
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={customerInfo.city}
                                    onChange={handleInputChange}
                                    style={{
                                        padding: '0.75rem',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '1rem'
                                    }}
                                />
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={customerInfo.pincode}
                                    onChange={handleInputChange}
                                    style={{
                                        padding: '0.75rem',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div style={{
                        background: 'var(--bg-primary)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-light)'
                    }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Payment Method</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                onClick={handleRazorpayPayment}
                                disabled={loading}
                                className="btn btn-primary"
                                style={{ 
                                    padding: '1rem',
                                    fontSize: '1.125rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {loading ? 'Processing...' : 'Pay with Razorpay'}
                                <span>🔒</span>
                            </button>

                            {/* For development/testing */}
                            <button
                                onClick={handleMockPayment}
                                className="btn btn-outline"
                                style={{ padding: '1rem', fontSize: '1.125rem' }}
                            >
                                Mock Payment (Development)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <div style={{
                        background: 'var(--bg-primary)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-light)',
                        position: 'sticky',
                        top: '2rem'
                    }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Order Summary</h2>
                        
                        {/* Order Items */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            {cart.items.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.75rem 0',
                                    borderBottom: '1px solid var(--border-light)'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            Qty: {item.quantity}
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: '600' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Breakdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Shipping</span>
                                <span style={{ color: 'var(--success)' }}>FREE</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Tax (10%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                paddingTop: '1rem',
                                borderTop: '2px solid var(--border-light)',
                                fontSize: '1.25rem',
                                fontWeight: '700'
                            }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--primary)' }}>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;