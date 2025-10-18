import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';
import { quantumProducts } from './Products'; // Import from your Products component

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, searchResults, setSearchResults, isSearching, saveToRecentSearches } = useSearch();
  const { addToCart } = useCart();
  
  const [allProducts, setAllProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all',
    inStock: false
  });

  // Use quantum products directly - FIXED
  useEffect(() => {
    setAllProducts(quantumProducts);
  }, []);

  // Extract search term from URL and perform search - FIXED: Proper search implementation
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    
    if (query) {
      setSearchTerm(query);
      performSearch(query);
      saveToRecentSearches(query);
    }
  }, [location.search, setSearchTerm, saveToRecentSearches, allProducts]);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setFilteredResults([]);
      return;
    }

    const results = allProducts.filter(product => {
      const searchableText = `
        ${product.name} 
        ${product.description} 
        ${product.category} 
        ${product.brand} 
        ${product.features?.join(' ') || ''}
      `.toLowerCase();

      return searchableText.includes(query.toLowerCase());
    });

    setSearchResults(results);
    setFilteredResults(results);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      performSearch(searchTerm);
      saveToRecentSearches(searchTerm);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    // Quantum notification
    const notification = document.createElement('div');
    notification.className = 'quantum-notification';
    notification.innerHTML = `
      <div class="notification-product">
        <img src="${product.image}" alt="${product.name}" />
        <div class="notification-content">
          <p class="notification-title">Quantum Added</p>
          <p class="notification-name">${product.name}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);
  };

  const applyFilters = () => {
    let filtered = [...searchResults];

    // Category filter
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter(product => product.category === activeFilters.category);
    }

    // Price range filter
    if (activeFilters.priceRange !== 'all') {
      switch (activeFilters.priceRange) {
        case 'under-500':
          filtered = filtered.filter(product => product.price < 500);
          break;
        case '500-1000':
          filtered = filtered.filter(product => product.price >= 500 && product.price <= 1000);
          break;
        case '1000-2000':
          filtered = filtered.filter(product => product.price > 1000 && product.price <= 2000);
          break;
        case 'over-2000':
          filtered = filtered.filter(product => product.price > 2000);
          break;
        default:
          break;
      }
    }

    // Rating filter
    if (activeFilters.rating !== 'all') {
      filtered = filtered.filter(product => product.rating >= parseFloat(activeFilters.rating));
    }

    // Stock filter
    if (activeFilters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    setFilteredResults(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [activeFilters, searchResults]);

  const categories = [...new Set(searchResults.map(product => product.category))];

  if (isSearching) {
    return (
      <div className="quantum-page">
        <div className="quantum-container">
          <div className="quantum-loading">
            <div className="quantum-loader">⚡</div>
            <p>Scanning Quantum Database...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quantum-page">
      <div className="quantum-orb orb-1"></div>
      <div className="quantum-orb orb-2"></div>

      <section className="quantum-section">
        <div className="quantum-container">
          {/* Search Header */}
          <div className="search-header">
            <div className="quantum-badge">NEURAL SEARCH</div>
            <h1 className="section-title">
              {searchTerm ? `Results for "${searchTerm}"` : 'Quantum Search'}
            </h1>
            
            {searchTerm && (
              <p className="search-results-count">
                {filteredResults.length} quantum products found in neural network
              </p>
            )}

            {/* Quantum Search Box */}
            <div className="quantum-card search-box">
              <div className="search-input-container">
                <input
                  type="text"
                  className="quantum-input large"
                  placeholder="Enter neural query across dimensions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <button 
                  onClick={handleSearch}
                  className="quantum-btn primary"
                  disabled={!searchTerm.trim()}
                >
                  <span className="btn-icon">🔍</span>
                  Neural Search
                </button>
              </div>
            </div>
          </div>

          {/* Filters and Results */}
          <div className="search-content">
            {/* Quantum Filters Sidebar */}
            {searchResults.length > 0 && (
              <div className="quantum-filters-sidebar">
                <div className="filters-header">
                  <h3>Quantum Filters</h3>
                  <button 
                    className="quantum-btn outline small"
                    onClick={() => setActiveFilters({
                      category: 'all',
                      priceRange: 'all',
                      rating: 'all',
                      inStock: false
                    })}
                  >
                    Clear Filters
                  </button>
                </div>

                {/* Category Filter */}
                <div className="filter-group">
                  <label className="filter-label">Neural Category</label>
                  <select
                    value={activeFilters.category}
                    onChange={(e) => setActiveFilters({...activeFilters, category: e.target.value})}
                    className="quantum-input"
                  >
                    <option value="all">All Dimensions</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="filter-group">
                  <label className="filter-label">Quantum Price Range</label>
                  <select
                    value={activeFilters.priceRange}
                    onChange={(e) => setActiveFilters({...activeFilters, priceRange: e.target.value})}
                    className="quantum-input"
                  >
                    <option value="all">All Ranges</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1000</option>
                    <option value="1000-2000">$1000 - $2000</option>
                    <option value="over-2000">Over $2000</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="filter-group">
                  <label className="filter-label">Minimum Rating</label>
                  <select
                    value={activeFilters.rating}
                    onChange={(e) => setActiveFilters({...activeFilters, rating: e.target.value})}
                    className="quantum-input"
                  >
                    <option value="all">All Stars</option>
                    <option value="4.5">4.5+ ✦</option>
                    <option value="4.0">4.0+ ✦</option>
                    <option value="3.5">3.5+ ✦</option>
                  </select>
                </div>

                {/* In Stock Filter */}
                <div className="filter-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={activeFilters.inStock}
                      onChange={(e) => setActiveFilters({...activeFilters, inStock: e.target.checked})}
                    />
                    <span className="checkmark"></span>
                    Available in Reality
                  </label>
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="search-results">
              {filteredResults.length === 0 ? (
                <div className="quantum-card no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No Quantum Entanglements Found</h3>
                  <p>
                    {searchTerm 
                      ? `No results for "${searchTerm}" in our neural network. Try different quantum parameters.`
                      : 'Initiate neural search to explore our quantum catalog'
                    }
                  </p>
                  <div className="no-results-actions">
                    <Link to="/products" className="quantum-btn primary">
                      Explore All Products
                    </Link>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="quantum-btn outline"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Results Grid */}
                  <div className="quantum-grid products-grid">
                    {filteredResults.map(product => (
                      <div key={product.id} className="quantum-card product-card">
                        <div className="product-hologram">
                          <div className="hologram-base"></div>
                          <img src={product.image} alt={product.name} className="product-image" />
                          <div className="product-energy"></div>
                          <div className="quantum-badge product">{product.badge}</div>
                          {product.discount && (
                            <div className="discount-badge">-{product.discount}%</div>
                          )}
                        </div>
                        
                        <div className="product-info">
                          <div className="product-meta-header">
                            <span className="product-category">{product.category}</span>
                            <span className="product-brand">{product.brand}</span>
                          </div>
                          
                          <h3 className="product-name">{product.name}</h3>
                          <p className="product-description">{product.description}</p>
                          
                          <div className="product-features">
                            {product.features.map((feature, i) => (
                              <span key={i} className="quantum-tag">{feature}</span>
                            ))}
                          </div>
                          
                          <div className="product-meta">
                            <div className="product-rating">
                              <div className="quantum-stars">
                                {'✦'.repeat(Math.floor(product.rating))}
                                {'✧'.repeat(5 - Math.floor(product.rating))}
                              </div>
                              <span className="rating-value">{product.rating}/5 ({product.reviews})</span>
                            </div>
                            <div className="product-price">
                              <span className="current-price">${product.price}</span>
                              {product.originalPrice && (
                                <span className="original-price">${product.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="product-actions">
                            <Link to={`/product/${product.id}`} className="quantum-btn outline">
                              Neural Preview
                            </Link>
                            <button 
                              onClick={() => handleAddToCart(product)}
                              className="quantum-btn primary"
                              disabled={!product.inStock}
                            >
                              {product.inStock ? 'Quantum Add' : 'Out of Stock'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Results Summary */}
                  <div className="results-summary">
                    <p>
                      Displaying {filteredResults.length} of {searchResults.length} quantum entanglements
                      {Object.values(activeFilters).some(filter => filter !== 'all' && filter !== false) && 
                        ' (neural filtered)'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchResults;