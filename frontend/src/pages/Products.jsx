import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './QuantumDesign.css';

  const quantumProducts = [
    {
      id: 1,
      name: 'Quantum Neural Headphones Pro',
      price: 599.99,
      originalPrice: 899.99,
      category: 'audio',
      description: 'Brain-wave synchronized audio with quantum noise cancellation and 50-hour neural battery.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=500&fit=crop',
      rating: 4.9,
      reviews: 2247,
      badge: 'Neural Choice',
      discount: 33,
      features: ['Brain Sync', 'Quantum ANC', '50h Power'],
      inStock: true,
      brand: 'NeuroTech'
    },
    {
      id: 2,
      name: 'Nexus Holographic Watch X',
      price: 799.99,
      originalPrice: 1199.99,
      category: 'wearables',
      description: 'Multi-dimensional health monitoring with holographic UI and quantum processing.',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=500&fit=crop',
      rating: 4.8,
      reviews: 1562,
      badge: 'Future Tech',
      discount: 33,
      features: ['Holo Display', 'Health AI', 'Quantum Chip'],
      inStock: true,
      brand: 'Quantum Wear'
    },
    {
      id: 3,
      name: 'Aether Quantum Camera Pro',
      price: 3499.99,
      originalPrice: 4999.99,
      category: 'imaging',
      description: 'Quantum imaging sensor with multi-spectral capture and AI-enhanced photography.',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=500&fit=crop',
      rating: 5.0,
      reviews: 892,
      badge: 'Pro Grade',
      discount: 30,
      features: ['Quantum Sensor', 'AI Photo', '8K Video'],
      inStock: true,
      brand: 'Photon Labs'
    },
    {
      id: 4,
      name: 'Neural VR Headset Pro',
      price: 1299.99,
      originalPrice: 1799.99,
      category: 'vr-ar',
      description: 'Full neural interface VR with quantum rendering and multi-sensory immersion.',
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=500&fit=crop',
      rating: 4.7,
      reviews: 3124,
      badge: 'Immersive',
      discount: 28,
      features: ['Neural UI', 'Quantum Render', 'Full Immersion'],
      inStock: true,
      brand: 'Reality Labs'
    },
    {
      id: 5,
      name: 'Quantum Smart Glasses',
      price: 899.99,
      originalPrice: 1299.99,
      category: 'wearables',
      description: 'Augmented reality glasses with quantum display and neural command interface.',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=500&fit=crop',
      rating: 4.6,
      reviews: 1876,
      badge: 'AR Ready',
      discount: 31,
      features: ['AR Display', 'Neural Control', 'Quantum Optics'],
      inStock: true,
      brand: 'Vision Tech'
    },
    {
      id: 6,
      name: 'Holographic Projector Mini',
      price: 499.99,
      originalPrice: 799.99,
      category: 'display',
      description: 'Pocket-sized quantum holographic projector with multi-surface display.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=500&fit=crop',
      rating: 4.5,
      reviews: 934,
      badge: 'Portable',
      discount: 38,
      features: ['Pocket Size', '3D Hologram', 'Multi-Surface'],
      inStock: true,
      brand: 'Holo Systems'
    },
    {
      id: 7,
      name: 'Quantum Gaming Laptop',
      price: 3299.99,
      originalPrice: 4599.99,
      category: 'computing',
      description: 'Quantum processing gaming laptop with neural cooling and holographic keyboard.',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=500&fit=crop',
      rating: 4.9,
      reviews: 2678,
      badge: 'Elite',
      discount: 28,
      features: ['Quantum CPU', 'Neural Cool', 'Holo Keyboard'],
      inStock: true,
      brand: 'Nexus Gaming'
    },
    {
      id: 8,
      name: 'Neural Fitness Tracker',
      price: 299.99,
      originalPrice: 449.99,
      category: 'wearables',
      description: 'Advanced biometric tracking with neural feedback and quantum sensors.',
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&h=500&fit=crop',
      rating: 4.4,
      reviews: 3123,
      badge: 'Health AI',
      discount: 33,
      features: ['Bio Tracking', 'Neural Feedback', 'Quantum Sensors'],
      inStock: true,
      brand: 'Fit Quantum'
    },
    {
      id: 9,
      name: 'Quantum Sound Sphere',
      price: 799.99,
      originalPrice: 1199.99,
      category: 'audio',
      description: '360-degree spatial audio sphere with quantum acoustic processing.',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=500&fit=crop',
      rating: 4.7,
      reviews: 1567,
      badge: 'Spatial Audio',
      discount: 33,
      features: ['360 Sound', 'Quantum Audio', 'Room Fill'],
      inStock: true,
      brand: 'Acoustic Labs'
    },
    {
      id: 10,
      name: 'Holographic Smart Desk',
      price: 1899.99,
      originalPrice: 2599.99,
      category: 'smart-home',
      description: 'Interactive holographic desk with quantum computing integration.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=500&fit=crop',
      rating: 4.8,
      reviews: 789,
      badge: 'Smart Office',
      discount: 27,
      features: ['Holo Surface', 'Quantum Compute', 'Multi-Touch'],
      inStock: true,
      brand: 'Workspace Pro'
    },
    {
      id: 11,
      name: 'Quantum Drone Pro',
      price: 2199.99,
      originalPrice: 3199.99,
      category: 'drones',
      description: 'AI-powered quantum drone with holographic navigation and neural control.',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=500&fit=crop',
      rating: 4.9,
      reviews: 1456,
      badge: 'AI Pilot',
      discount: 31,
      features: ['AI Navigation', 'Holo Control', 'Quantum Flight'],
      inStock: true,
      brand: 'Sky Quantum'
    },
    {
      id: 12,
      name: 'Neural Sleep Pod',
      price: 2999.99,
      originalPrice: 4299.99,
      category: 'smart-home',
      description: 'Advanced sleep optimization pod with neural wave synchronization.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=500&fit=crop',
      rating: 4.6,
      reviews: 567,
      badge: 'Sleep Tech',
      discount: 30,
      features: ['Brain Sync', 'Sleep AI', 'Climate Control'],
      inStock: true,
      brand: 'Rest Quantum'
    },
    {
      id: 13,
      name: 'Quantum Gaming Console',
      price: 899.99,
      originalPrice: 1299.99,
      category: 'gaming',
      description: 'Next-gen gaming console with quantum processing and neural controllers.',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=500&fit=crop',
      rating: 4.8,
      reviews: 3123,
      badge: 'Next Gen',
      discount: 31,
      features: ['Quantum GPU', 'Neural Control', '8K Gaming'],
      inStock: true,
      brand: 'Nexus Games'
    },
    {
      id: 14,
      name: 'Holographic Phone Pro',
      price: 1599.99,
      originalPrice: 2299.99,
      category: 'mobile',
      description: 'Smartphone with holographic display and quantum neural processor.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=500&fit=crop',
      rating: 4.7,
      reviews: 4231,
      badge: 'Holo Display',
      discount: 30,
      features: ['3D Display', 'Quantum CPU', 'Neural AI'],
      inStock: true,
      brand: 'Quantum Mobile'
    },
    {
      id: 15,
      name: 'Quantum Smart Mirror',
      price: 1299.99,
      originalPrice: 1899.99,
      category: 'smart-home',
      description: 'Interactive smart mirror with quantum display and AI personal assistant.',
      image: 'https://images.unsplash.com/photo-1551830893-b64bfd0e2b15?w=600&h=500&fit=crop',
      rating: 4.5,
      reviews: 876,
      badge: 'Smart Home',
      discount: 32,
      features: ['AI Assistant', 'Quantum Display', 'Health Scan'],
      inStock: true,
      brand: 'Mirror Tech'
    },
    {
      id: 16,
      name: 'Neural Keyboard Pro',
      price: 399.99,
      originalPrice: 599.99,
      category: 'computing',
      description: 'Quantum mechanical keyboard with neural input and holographic keycaps.',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=500&fit=crop',
      rating: 4.6,
      reviews: 1567,
      badge: 'Neural Input',
      discount: 33,
      features: ['Brain Typing', 'Holo Keys', 'Quantum Switches'],
      inStock: true,
      brand: 'Input Labs'
    },
    {
      id: 17,
      name: 'Quantum E-Bike Pro',
      price: 3499.99,
      originalPrice: 4999.99,
      category: 'transport',
      description: 'AI-powered electric bike with quantum battery and neural navigation.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=500&fit=crop',
      rating: 4.8,
      reviews: 923,
      badge: 'Smart Ride',
      discount: 30,
      features: ['AI Navigation', 'Quantum Battery', 'Neural Control'],
      inStock: true,
      brand: 'Ride Quantum'
    },
    {
      id: 18,
      name: 'Holographic Tablet',
      price: 1199.99,
      originalPrice: 1799.99,
      category: 'mobile',
      description: 'Quantum tablet with holographic 3D display and neural stylus.',
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=500&fit=crop',
      rating: 4.7,
      reviews: 1876,
      badge: '3D Creative',
      discount: 33,
      features: ['3D Display', 'Neural Stylus', 'Quantum CPU'],
      inStock: true,
      brand: 'Tablet Pro'
    },
    {
      id: 19,
      name: 'Quantum Home Server',
      price: 2499.99,
      originalPrice: 3599.99,
      category: 'computing',
      description: 'Home quantum computing server with neural network capabilities.',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16a?w=600&h=500&fit=crop',
      rating: 4.9,
      reviews: 456,
      badge: 'Home AI',
      discount: 31,
      features: ['Quantum Compute', 'Neural Network', 'Home AI'],
      inStock: true,
      brand: 'Compute Labs'
    },
    {
      id: 20,
      name: 'Neural Gaming Chair',
      price: 899.99,
      originalPrice: 1299.99,
      category: 'gaming',
      description: 'Ergonomic gaming chair with neural feedback and quantum comfort system.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=500&fit=crop',
      rating: 4.5,
      reviews: 2341,
      badge: 'Elite Comfort',
      discount: 31,
      features: ['Neural Feedback', 'Quantum Comfort', 'Health AI'],
      inStock: true,
      brand: 'Seat Tech'
    },
    {
      id: 21,
      name: 'Quantum Camera Drone',
      price: 2799.99,
      originalPrice: 3999.99,
      category: 'drones',
      description: 'Professional camera drone with quantum stabilization and AI tracking.',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=500&fit=crop',
      rating: 4.8,
      reviews: 1234,
      badge: 'Pro Film',
      discount: 30,
      features: ['8K Camera', 'Quantum Stabilize', 'AI Track'],
      inStock: true,
      brand: 'Aero Films'
    },
    {
      id: 22,
      name: 'Holographic Smart Watch',
      price: 699.99,
      originalPrice: 999.99,
      category: 'wearables',
      description: 'Advanced smartwatch with holographic display and quantum health sensors.',
      image: 'https://images.unsplash.com/photo-1434493652601-8d45cb8c0117?w=600&h=500&fit=crop',
      rating: 4.6,
      reviews: 2876,
      badge: 'Health Pro',
      discount: 30,
      features: ['Holo Display', 'Quantum Health', 'Neural UI'],
      inStock: true,
      brand: 'Time Quantum'
    },
    {
      id: 23,
      name: 'Quantum Sound Bar',
      price: 599.99,
      originalPrice: 899.99,
      category: 'audio',
      description: 'Immersive sound bar with quantum audio processing and neural surround.',
      image: 'https://images.unsplash.com/photo-1606778303241-9cb0affe7a5e?w=600&h=500&fit=crop',
      rating: 4.7,
      reviews: 1567,
      badge: 'Home Theater',
      discount: 33,
      features: ['Quantum Audio', 'Neural Surround', '8K Ready'],
      inStock: true,
      brand: 'Audio Labs'
    },
    {
      id: 24,
      name: 'Neural Smart Glasses Pro',
      price: 1299.99,
      originalPrice: 1899.99,
      category: 'wearables',
      description: 'Premium smart glasses with neural interface and quantum AR display.',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=500&fit=crop',
      rating: 4.8,
      reviews: 934,
      badge: 'AR Pro',
      discount: 32,
      features: ['Neural AR', 'Quantum Display', 'AI Vision'],
      inStock: true,
      brand: 'Vision Pro'
    }
  ];

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all',
    search: '',
    sortBy: 'featured'
  });


  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(quantumProducts);
      setFilteredProducts(quantumProducts);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
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
    if (filters.rating !== 'all') {
      filtered = filtered.filter(product => product.rating >= parseFloat(filters.rating));
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured (default order)
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showQuantumNotification(product);
  };

  const showQuantumNotification = (product) => {
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

  const categories = [
    { value: 'all', label: 'All Dimensions', count: quantumProducts.length },
    { value: 'audio', label: 'Neural Audio', count: quantumProducts.filter(p => p.category === 'audio').length },
    { value: 'wearables', label: 'Bio Wearables', count: quantumProducts.filter(p => p.category === 'wearables').length },
    { value: 'computing', label: 'Quantum Computing', count: quantumProducts.filter(p => p.category === 'computing').length },
    { value: 'mobile', label: 'Mobile Tech', count: quantumProducts.filter(p => p.category === 'mobile').length },
    { value: 'smart-home', label: 'Smart Home', count: quantumProducts.filter(p => p.category === 'smart-home').length },
    { value: 'gaming', label: 'Gaming', count: quantumProducts.filter(p => p.category === 'gaming').length },
    { value: 'vr-ar', label: 'VR/AR', count: quantumProducts.filter(p => p.category === 'vr-ar').length },
    { value: 'drones', label: 'Quantum Drones', count: quantumProducts.filter(p => p.category === 'drones').length },
    { value: 'imaging', label: 'Imaging', count: quantumProducts.filter(p => p.category === 'imaging').length },
    { value: 'display', label: 'Display', count: quantumProducts.filter(p => p.category === 'display').length },
    { value: 'transport', label: 'Transport', count: quantumProducts.filter(p => p.category === 'transport').length }
  ];

  if (loading) {
    return (
      <div className="quantum-page">
        <div className="quantum-container">
          <div className="quantum-loading">
            <div className="quantum-loader">⚡</div>
            <p>Initializing Quantum Database...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quantum-page">
      <div className="quantum-orb orb-1"></div>
      <div className="quantum-orb orb-2"></div>

      <section className="quantum-hero">
        <div className="hero-matrix"></div>
        <div className="quantum-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="quantum-badge">QUANTUM CATALOG</div>
              <h1 className="hero-title">
                <span className="quantum-gradient">Neural Products</span>
              </h1>
              <p className="hero-subtitle">
                Explore our quantum-curated collection of 24 advanced technology products across multiple dimensions
              </p>
              <div className="quantum-stats">
                <div className="stat">
                  <div className="stat-value">{quantumProducts.length}</div>
                  <div className="stat-label">Quantum Products</div>
                </div>
                <div className="stat">
                  <div className="stat-value">12</div>
                  <div className="stat-label">Neural Categories</div>
                </div>
                <div className="stat">
                  <div className="stat-value">∞</div>
                  <div className="stat-label">Possibilities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quantum-section">
        <div className="quantum-container">
          {/* Advanced Quantum Filters */}
          <div className="quantum-card filters-container">
            <div className="filters-header">
              <h3>Quantum Filters</h3>
              <button 
                className="quantum-btn outline small"
                onClick={() => setFilters({
                  category: 'all',
                  priceRange: 'all',
                  rating: 'all',
                  search: '',
                  sortBy: 'featured'
                })}
              >
                Clear Neural Filters
              </button>
            </div>

            <div className="quantum-grid filters-grid">
              <div className="filter-group">
                <label className="filter-label">Neural Search</label>
                <input
                  type="text"
                  className="quantum-input"
                  placeholder="Enter quantum query..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select 
                  className="quantum-input"
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                >
                  <option value="featured">Quantum Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Entries</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Price Range</label>
                <select 
                  className="quantum-input"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                >
                  <option value="all">All Quantum Ranges</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1000">$500 - $1000</option>
                  <option value="1000-2000">$1000 - $2000</option>
                  <option value="over-2000">Over $2000</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Minimum Rating</label>
                <select 
                  className="quantum-input"
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: e.target.value})}
                >
                  <option value="all">All Stars</option>
                  <option value="4.5">4.5+ ✦</option>
                  <option value="4.0">4.0+ ✦</option>
                  <option value="3.5">3.5+ ✦</option>
                </select>
              </div>
            </div>

            {/* Quick Category Filters */}
            <div className="quick-categories">
              <label className="filter-label">Quantum Categories</label>
              <div className="categories-grid">
                {categories.map(category => (
                  <button
                    key={category.value}
                    className={`quantum-chip ${filters.category === category.value ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, category: category.value})}
                  >
                    {category.label}
                    <span className="chip-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="results-header">
            <div className="results-info">
              <span className="results-count">
                {filteredProducts.length} quantum products found
                {filters.search && ` for "${filters.search}"`}
                {filters.category !== 'all' && ` in ${categories.find(c => c.value === filters.category)?.label}`}
              </span>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="quantum-grid products-grid">
              {filteredProducts.map((product) => (
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
          ) : (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3>No Quantum Products Found</h3>
              <p>Try adjusting your neural filters or search parameters</p>
              <button 
                className="quantum-btn primary"
                onClick={() => setFilters({
                  category: 'all',
                  priceRange: 'all',
                  rating: 'all',
                  search: '',
                  sortBy: 'featured'
                })}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
export { quantumProducts };