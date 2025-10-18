import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId, paymentId } = location.state || {};

    return (
        <div style={{
            maxWidth: '600px',
            margin: '2rem auto',
            padding: '4rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)'
        }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h1 style={{ 
                marginBottom: '1rem', 
                color: 'var(--success)',
                fontSize: '2.5rem'
            }}>
                Order Placed Successfully!
            </h1>
            <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                fontSize: '1.125rem'
            }}>
                Thank you for your purchase. Your order has been confirmed.
            </p>

            {orderId && (
                <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '2rem',
                    textAlign: 'left'
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>Order Details</h3>
                    <p><strong>Order ID:</strong> {orderId}</p>
                    {paymentId && <p><strong>Payment ID:</strong> {paymentId}</p>}
                    <p><strong>Status:</strong> <span style={{ color: 'var(--success)' }}>Confirmed</span></p>
                </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/products" className="btn btn-primary">
                    Continue Shopping
                </Link>
                <Link to="/" className="btn btn-outline">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;