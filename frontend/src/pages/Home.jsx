import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './QuantumDesign.css';

const Home = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: 'Quantum Headphones Pro',
      price: 399.99,
      originalPrice: 599.99,
      category: 'Audio',
      description: 'Immersive spatial audio with neural noise cancellation and 40-hour battery life.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=500&fit=crop',
      rating: 4.9,
      reviews: 2247,
      badge: 'Editor\'s Choice',
      discount: 33,
      features: ['AI Noise Cancel', 'Spatial Audio', '40h Battery']
    },
    {
      id: 2,
      name: 'Nexus Smart Watch X',
      price: 599.99,
      originalPrice: 799.99,
      category: 'Wearables',
      description: 'Advanced health monitoring with neural interface and holographic display.',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=500&fit=crop',
      rating: 4.8,
      reviews: 1562,
      badge: 'Innovation Award',
      discount: 25,
      features: ['Health AI', 'Holographic UI', 'Neural Interface']
    },
    {
      id: 3,
      name: 'Aether Camera Pro',
      price: 2499.99,
      category: 'Imaging',
      description: 'Quantum imaging sensor with AI-powered photography and 8K video capture.',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=500&fit=crop',
      rating: 5.0,
      reviews: 892,
      badge: 'Professional Grade',
      features: ['Quantum Sensor', 'AI Photography', '8K Video']
    }
  ];

  const categories = [
    { 
      name: 'Neural Tech', 
      count: 156, 
      image: '🧠', 
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Brain-computer interfaces and neural enhancement'
    },
    { 
      name: 'Quantum Computing', 
      count: 89, 
      image: '⚛️', 
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Next-generation computational devices'
    },
    { 
      name: 'Holographic Displays', 
      count: 67, 
      image: '👁️', 
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: '3D visualization and interactive displays'
    },
    { 
      name: 'Bio-Enhanced Wearables', 
      count: 134, 
      image: '💪', 
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Health monitoring and physical enhancement'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    showFloatingNotification(product);
  };

  const showFloatingNotification = (product) => {
    const notification = document.createElement('div');
    notification.className = 'quantum-notification';
    notification.innerHTML = `
      <div class="notification-product">
        <img src="${product.image}" alt="${product.name}" />
        <div class="notification-content">
          <p class="notification-title">Added to Neural Cart</p>
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

  return (
    <div className="quantum-page">
      {/* Animated Background Elements */}
      <div className="quantum-orb orb-1" style={{
        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
      }}></div>
      <div className="quantum-orb orb-2" style={{
        transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
      }}></div>
      
      {/* Neuro-Interactive Hero */}
      <section className="quantum-hero">
        <div className="hero-matrix"></div>
        <div className="quantum-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="quantum-badge">NEURAL COMMERCE PLATFORM</div>
              <h1 className="hero-title">
                <span className="title-line">Welcome to</span>
                <span className="quantum-gradient">QuantumShop</span>
              </h1>
              <p className="hero-subtitle">
                Experience the future of commerce with AI-curated products, 
                neural interfaces, and quantum-enhanced shopping.
              </p>
              
              <div className="quantum-stats">
                <div className="stat">
                  <div className="stat-value">15.8K</div>
                  <div className="stat-label">Neural Impressions</div>
                </div>
                <div className="stat">
                  <div className="stat-value">98.7%</div>
                  <div className="stat-label">AI Accuracy</div>
                </div>
                <div className="stat">
                  <div className="stat-value">∞</div>
                  <div className="stat-label">Possibilities</div>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="quantum-product-preview" style={{ transform: `rotate(${scrollY * 0.1}deg)` }}>
                <img src={featuredProducts[0].image} alt="Featured Product" />
                <div className="product-aura"></div>
              </div>
            </div>
          </div>
          
          <div className="hero-actions">
            <Link to="/products" className="quantum-btn primary">
              <span className="btn-glow"></span>
              <span className="btn-content">
                <span className="btn-icon">⚡</span>
                Initiate Shopping
              </span>
            </Link>
            <Link to="/discover" className="quantum-btn secondary">
              <span className="btn-content">
                <span className="btn-icon">🔍</span>
                Neural Discovery
              </span>
            </Link>
          </div>
          
          <div className="quantum-scroll-indicator">
            <div className="scroll-line"></div>
            <span>Quantum Scrolling Activated</span>
          </div>
        </div>
      </section>

      {/* Neural Category Grid */}
      <section className="quantum-section">
        <div className="quantum-container">
          <div className="section-header">
            <h2 className="section-title">Explore Neural Categories</h2>
            <p className="section-subtitle">
              Curated by our quantum AI based on your neural patterns
            </p>
          </div>

          <div className="quantum-grid">
            {categories.map((category, index) => (
              <div 
                key={category.name}
                className={`quantum-card category-card ${index === activeCategory ? 'active' : ''}`}
                onMouseEnter={() => setActiveCategory(index)}
              >
                <div className="card-hologram" style={{ background: category.color }}>
                  <div className="hologram-content">
                    <div className="category-icon">{category.image}</div>
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                    <div className="category-count">{category.count} quantum items</div>
                  </div>
                  <div className="hologram-shine"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quantum Product Showcase */}
      <section className="quantum-section dark">
        <div className="quantum-container">
          <div className="section-header">
            <h2 className="section-title">Quantum Curated</h2>
            <p className="section-subtitle">
              Products selected by our neural network based on universal appeal
            </p>
          </div>

          <div className="quantum-showcase">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="quantum-product-card">
                <div className="product-hologram">
                  <div className="hologram-base"></div>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-energy"></div>
                </div>
                
                <div className="product-info">
                  <div className="quantum-badge product">{product.badge}</div>
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
                      <span className="rating-value">{product.rating}/5</span>
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
                    >
                      Quantum Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="quantum-section">
        <div className="quantum-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose QuantumShop?</h2>
          </div>
          
          <div className="quantum-features">
            {[
              {
                icon: '🧠',
                title: 'Neural Matching',
                description: 'Our AI analyzes your preferences at a neural level to suggest perfect products'
              },
              {
                icon: '⚡',
                title: 'Quantum Delivery',
                description: 'Instant delivery through quantum entanglement technology'
              },
              {
                icon: '🔄',
                title: 'Reality Returns',
                description: 'Alter reality to return products across multiple dimensions'
              },
              {
                icon: '🔒',
                title: 'Blockchain Trust',
                description: 'Every transaction secured by quantum-resistant blockchain'
              }
            ].map((feature, index) => (
              <div key={index} className="quantum-card feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neural Newsletter */}
      <section className="quantum-newsletter">
        <div className="newsletter-matrix"></div>
        <div className="quantum-container">
          <div className="newsletter-content">
            <h2>Join Our Neural Network</h2>
            <p>Receive quantum-curated product suggestions directly to your consciousness</p>
            <div className="newsletter-form">
              <input 
                type="text" 
                placeholder="Enter your neural signature..." 
                className="quantum-input"
              />
              <button className="quantum-btn primary">
                Subscribe to Consciousness
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;