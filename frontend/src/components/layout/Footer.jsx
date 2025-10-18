import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="premium-footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section">
          <Link to="/" className="shopzy-logo" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            <div className="logo-icon">S</div>
            <span>Shopzy</span>
          </Link>
          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}>
            Your premier destination for quality products and exceptional shopping experience. 
            We're committed to bringing you the best from around the world.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['📘', '📷', '🐦', '💼'].map((icon, index) => (
              <a 
                key={index}
                href="#" 
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  transition: 'var(--transition-fast)',
                  border: '1px solid var(--border-light)'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Shop</h3>
          <Link to="/products">All Products</Link>
          <Link to="/products?filter=new">New Arrivals</Link>
          <Link to="/products?filter=bestsellers">Best Sellers</Link>
          <Link to="/products?filter=sale">Sale</Link>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3>Support</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/shipping">Shipping Info</Link>
          <Link to="/returns">Returns & Exchanges</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Shopzy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;