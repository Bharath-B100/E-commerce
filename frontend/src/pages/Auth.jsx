import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Auth = () => {
  const { login, register, loginWithGoogle, isAuthenticated, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrors({});

    try {
      await loginWithGoogle();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  if (loading) {
    return (
      <div className="page-container" style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid var(--border-light)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="page-container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ 
          background: 'var(--bg-primary)',
          padding: '3rem 2rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Welcome Back!</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            You are successfully logged in to your Quantum Shop account.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/profile" className="btn btn-outline">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ 
      padding: '2rem 1rem', 
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '1000px',
        width: '100%',
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        
        {/* Left Side - Illustration/Info */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          padding: '3rem',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Welcome to <br />Quantum Shop
            </h1>
            <p style={{ 
              fontSize: '1.125rem',
              opacity: 0.9,
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              {isLogin 
                ? 'Sign in to access your personalized shopping experience, order history, and exclusive deals.'
                : 'Join our quantum community and discover cutting-edge technology with exclusive member benefits.'
              }
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem'
                }}>
                  ✓
                </div>
                <span>Fast & Secure Checkout</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem'
                }}>
                  ✓
                </div>
                <span>Personalized Recommendations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem'
                }}>
                  ✓
                </div>
                <span>Order Tracking & History</span>
              </div>
            </div>
          </div>
          
          {/* Background Elements */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%'
          }}></div>
        </div>

        {/* Right Side - Form */}
        <div style={{ padding: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: 'var(--bg-secondary)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              margin: '0 auto 1rem',
              border: '2px solid var(--border-light)'
            }}>
              {isLogin ? '🔐' : '✨'}
            </div>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              {isLogin ? 'Sign in to your account' : 'Join us today'}
            </p>
          </div>

          {errors.submit && (
            <div style={{
              background: 'var(--error-bg)',
              color: 'var(--error)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              border: '1px solid var(--error)',
              fontSize: '0.875rem'
            }}>
              {errors.submit}
            </div>
          )}

          {/* Google Sign In Button */}
          <button 
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="btn btn-outline"
            style={{ 
              width: '100%', 
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            {googleLoading ? (
              <div style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid transparent',
                borderTop: '2px solid currentColor',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            ) : (
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google" 
                style={{ width: '18px', height: '18px' }}
              />
            )}
            Continue with Google
          </button>

          <div style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem',
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: 'var(--border-light)'
            }}></div>
            <span style={{ 
              background: 'var(--bg-primary)', 
              padding: '0 1rem',
              position: 'relative',
              zIndex: 1
            }}>
              Or continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: `1px solid ${errors.name ? 'var(--error)' : 'var(--border-medium)'}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    background: 'var(--bg-primary)',
                    transition: 'all 0.2s ease'
                  }}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <div style={{ 
                    color: 'var(--error)', 
                    fontSize: '0.875rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.name}
                  </div>
                )}
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  border: `1px solid ${errors.email ? 'var(--error)' : 'var(--border-medium)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  background: 'var(--bg-primary)',
                  transition: 'all 0.2s ease'
                }}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div style={{ 
                  color: 'var(--error)', 
                  fontSize: '0.875rem', 
                  marginTop: '0.25rem' 
                }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: `1px solid ${errors.password ? 'var(--error)' : 'var(--border-medium)'}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    background: 'var(--bg-primary)',
                    paddingRight: '3rem'
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <div style={{ 
                  color: 'var(--error)', 
                  fontSize: '0.875rem', 
                  marginTop: '0.25rem' 
                }}>
                  {errors.password}
                </div>
              )}
            </div>

            {!isLogin && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: `1px solid ${errors.confirmPassword ? 'var(--error)' : 'var(--border-medium)'}`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    background: 'var(--bg-primary)'
                  }}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <div style={{ 
                    color: 'var(--error)', 
                    fontSize: '0.875rem', 
                    marginTop: '0.25rem' 
                  }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                padding: '1rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1.5rem'
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid transparent',
                    borderTop: '2px solid currentColor',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div style={{ 
            textAlign: 'center', 
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-light)'
          }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </p>
            <button 
              onClick={switchMode}
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              {isLogin ? 'Create New Account' : 'Sign In to Existing Account'}
            </button>
          </div>

          <div style={{ 
            marginTop: '2rem',
            padding: '1rem',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            🔒 Your data is securely encrypted and protected
          </div>
        </div>
      </div>

      {/* Add CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Auth;