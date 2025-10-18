// src/pages/Cart.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart, getCartItemsCount } = useCart();
    const navigate = useNavigate();

    if (cart.items.length === 0) {
        return (
            <div style={{
                maxWidth: '600px',
                margin: '2rem auto',
                padding: '4rem 2rem',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    Your cart is empty
                </h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                    fontSize: '1.125rem'
                }}>
                    Discover amazing products and add them to your cart
                </p>
                <Link to="/products" className="btn btn-primary btn-large">
                    Start Shopping
                </Link>
            </div>
        );
    }

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            minHeight: '80vh'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)'
                }}>
                    Shopping Cart
                </h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.125rem'
                }}>
                    {getCartItemsCount()} items in your cart
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '2rem',
                alignItems: 'start'
            }}>
                {/* Cart Items */}
                <div>
                    {/* Cart Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        paddingBottom: '1rem',
                        borderBottom: '2px solid var(--border-light)'
                    }}>
                        <h2 style={{ color: 'var(--text-primary)' }}>Cart Items</h2>
                        <button
                            onClick={clearCart}
                            style={{
                                background: 'none',
                                border: '1px solid var(--error)',
                                color: 'var(--error)',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                            }}
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {cart.items.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    background: 'var(--bg-primary)',
                                    padding: '1.5rem',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--border-light)',
                                    boxShadow: 'var(--shadow-sm)',
                                    display: 'grid',
                                    gridTemplateColumns: '100px 1fr auto',
                                    gap: '1.5rem',
                                    alignItems: 'center'
                                }}
                            >
                                {/* Product Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: 'var(--radius-md)'
                                    }}
                                />

                                {/* Product Details */}
                                <div>
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        marginBottom: '0.5rem',
                                        color: 'var(--text-primary)'
                                    }}>
                                        {item.name}
                                    </h3>
                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {item.description}
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            fontSize: '1.25rem',
                                            fontWeight: '700',
                                            color: 'var(--primary)'
                                        }}>
                                            ${item.price}
                                        </span>
                                        {item.originalPrice && (
                                            <span style={{
                                                fontSize: '1rem',
                                                color: 'var(--text-tertiary)',
                                                textDecoration: 'line-through'
                                            }}>
                                                ${item.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Quantity Controls and Remove */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    {/* Quantity Controls */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'var(--bg-secondary)',
                                        padding: '0.5rem',
                                        borderRadius: 'var(--radius-md)'
                                    }}>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                border: 'none',
                                                background: 'var(--bg-primary)',
                                                borderRadius: 'var(--radius-sm)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.125rem',
                                                fontWeight: '600'
                                            }}
                                        >
                                            -
                                        </button>
                                        <span style={{
                                            minWidth: '40px',
                                            textAlign: 'center',
                                            fontWeight: '600',
                                            color: 'var(--text-primary)'
                                        }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                border: 'none',
                                                background: 'var(--bg-primary)',
                                                borderRadius: 'var(--radius-sm)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.125rem',
                                                fontWeight: '600'
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Item Total */}
                                    <div style={{
                                        fontWeight: '700',
                                        color: 'var(--text-primary)',
                                        fontSize: '1.125rem'
                                    }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--error)',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            padding: '0.5rem'
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div style={{
                    background: 'var(--bg-primary)',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-md)',
                    position: 'sticky',
                    top: '2rem'
                }}>
                    <h2 style={{
                        marginBottom: '1.5rem',
                        color: 'var(--text-primary)',
                        fontSize: '1.5rem',
                        fontWeight: '700'
                    }}>
                        Order Summary
                    </h2>

                    {/* Summary Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid var(--border-light)'
                        }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                            <span style={{ fontWeight: '600' }}>${getCartTotal().toFixed(2)}</span>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid var(--border-light)'
                        }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                            <span style={{ fontWeight: '600', color: 'var(--success)' }}>FREE</span>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: '1rem',
                            borderBottom: '1px solid var(--border-light)'
                        }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Tax</span>
                            <span style={{ fontWeight: '600' }}>${(getCartTotal() * 0.1).toFixed(2)}</span>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '1rem',
                            borderTop: '2px solid var(--border-light)'
                        }}>
                            <span style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: 'var(--text-primary)'
                            }}>
                                Total
                            </span>
                            <span style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: 'var(--primary)'
                            }}>
                                ${(getCartTotal() * 1.1).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <Link
                        to="/checkout"
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            marginTop: '2rem',
                            padding: '1rem 2rem',
                            fontSize: '1.125rem',
                            textDecoration: 'none',
                            textAlign: 'center'
                        }}
                    >
                        Proceed to Checkout
                    </Link>

                    {/* Continue Shopping */}
                    <Link
                        to="/products"
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            marginTop: '1rem',
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '0.875rem'
                        }}
                    >
                        ← Continue Shopping
                    </Link>

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
    );
};

export default Cart;