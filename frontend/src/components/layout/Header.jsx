import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useSearch } from '../../context/SearchContext'; // ✅ Make sure this context exists!

const Header = () => {
  const { getCartItemsCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { searchTerm, setSearchTerm, recentSearches } = useSearch();
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // ✅ Single handleSearch
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
      setShowSearchDropdown(false);
    }
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    window.location.href = `/search?q=${encodeURIComponent(term)}`;
    setShowSearchDropdown(false);
  };

  return (
    <header className={`premium-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="shopzy-logo">
          <div className="logo-icon">S</div>
          <span>Shopzy</span>
        </Link>

        {/* Navigation */}
        <nav className="premium-nav">
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/products" className={`nav-item ${isActive('/products') ? 'active' : ''}`}>
            Products
          </Link>
          <Link to="/categories" className={`nav-item ${isActive('/categories') ? 'active' : ''}`}>
            Categories
          </Link>
          <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>
        </nav>

        {/* Enhanced Search Bar */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <form onSubmit={handleSearch}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.9rem',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  transition: 'var(--transition-fast)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.1rem',
                  color: 'var(--text-secondary)',
                }}
              >
                🔍
              </span>
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Dropdown */}
          {showSearchDropdown && (searchTerm || recentSearches.length > 0) && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1000,
                marginTop: '0.5rem',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {/* Recent Searches */}
              {recentSearches.length > 0 && !searchTerm && (
                <div>
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: 'var(--text-secondary)',
                      borderBottom: '1px solid var(--border-light)',
                    }}
                  >
                    Recent Searches
                  </div>
                  {recentSearches.map((term, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecentSearchClick(term)}
                      style={{
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        borderBottom: '1px solid var(--border-light)',
                        transition: 'var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'var(--bg-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'var(--bg-primary)';
                      }}
                    >
                      <span>🕒</span>
                      {term}
                    </div>
                  ))}
                </div>
              )}

              {/* Popular Categories */}
              <div>
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    borderBottom: '1px solid var(--border-light)',
                  }}
                >
                  Popular Categories
                </div>
                {['electronics', 'fashion', 'home', 'beauty', 'sports'].map((category) => (
                  <div
                    key={category}
                    onClick={() => handleRecentSearchClick(category)}
                    style={{
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderBottom: '1px solid var(--border-light)',
                      transition: 'var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'var(--bg-primary)';
                    }}
                  >
                    <span>🏷️</span>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* User Account */}
          <Link to="/auth" className="nav-item">
            👤
          </Link>

          {/* Cart */}
          <Link to="/cart" className="cart-button">
            <span>Cart</span>
            {getCartItemsCount() > 0 && <span className="cart-count">{getCartItemsCount()}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
