import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuantumDesign.css';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { number: '50K+', label: 'Quantum Users' },
    { number: '100+', label: 'Neural Partners' },
    { number: '1M+', label: 'Products Entangled' },
    { number: '24/7', label: 'AI Consciousness' }
  ];

  const values = [
    {
      icon: '🧠',
      title: 'Neural First',
      description: 'We think at quantum speed with neural-enhanced decision making'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Quantum delivery ensures instant access across all dimensions'
    },
    {
      icon: '🔄',
      title: 'Reality Bending',
      description: 'Alter product reality to match your exact specifications'
    },
    {
      icon: '🔒',
      title: 'Quantum Secure',
      description: 'Blockchain-level security with quantum encryption'
    }
  ];

  const team = [
    {
      name: 'Bharath Raj B',
      role: 'Quantum CEO',
      image: 'https://avatars.githubusercontent.com/u/183176161?v=4'
    },
    {
      name: 'Kirubakaran',
      role: 'Neural Operations',
      image: 'https://avatars.githubusercontent.com/u/183176161?v=4'
    },
    {
      name: 'Lokesh C',
      role: 'Product Director',
      image: 'https://avatars.githubusercontent.com/u/183176161?v=4'
    },
    {
      name: 'Kishkindhan',
      role: 'Quantum Tech Lead',
      image: 'https://avatars.githubusercontent.com/u/183176161?v=4'
    }
  ];

  const handleShopNow = () => navigate('/products');
  const handleContact = () => navigate('/contact');

  return (
    <div className="quantum-page">
      <div className="quantum-orb orb-1"></div>
      <div className="quantum-orb orb-2"></div>

      {/* Quantum Hero */}
      <section className="quantum-hero">
        <div className="hero-matrix"></div>
        <div className="quantum-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="quantum-badge">QUANTUM ORIGINS</div>
              <h1 className="hero-title">
                <span className="title-line">About</span>
                <span className="quantum-gradient">QuantumShop</span>
              </h1>
              <p className="hero-subtitle">
                We're not just an e-commerce platform - we're a neural network 
                dedicated to revolutionizing how humanity shops across dimensions.
              </p>
              
              <div className="quantum-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat">
                    <div className="stat-value">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Quantum Story */}
      <section className="quantum-section">
        <div className="quantum-container">
          <div className="quantum-grid" style={{alignItems: 'center', gap: '4rem'}}>
            <div>
              <h2 className="section-title">Our Quantum Story</h2>
              <p className="hero-subtitle">
                Founded in the quantum realm of 2018, QuantumShop began as a neural 
                impulse between dimensions. What started as a simple idea has evolved 
                into a multi-dimensional shopping experience.
              </p>
              <p className="hero-subtitle">
                Today, we're proud to bridge realities, offering products that exist 
                simultaneously across multiple dimensions while maintaining the 
                quantum entanglement that makes us unique.
              </p>
              <div className="hero-actions">
                <button onClick={handleShopNow} className="quantum-btn primary">
                  Explore Dimensions
                </button>
                <button onClick={handleContact} className="quantum-btn secondary">
                  Neural Contact
                </button>
              </div>
            </div>
            <div className="quantum-card" style={{padding: '2rem'}}>
              <div className="card-hologram" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=400&fit=crop" 
                    alt="Quantum Team" 
                    style={{
                      borderRadius: '1rem',
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=400&fit=crop" 
                    alt="Neural Office" 
                    style={{
                      borderRadius: '1rem',
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      marginTop: '2rem'
                    }}
                  />
                </div>
                <div className="hologram-shine"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantum Values */}
      <section className="quantum-section dark">
        <div className="quantum-container">
          <div className="section-header">
            <h2 className="section-title">Quantum Principles</h2>
            <p className="section-subtitle">
              The neural pathways that guide our multi-dimensional existence
            </p>
          </div>
          
          <div className="quantum-features">
            {values.map((value, index) => (
              <div key={index} className="quantum-card feature-card">
                <div className="feature-icon">{value.icon}</div>
                <h3 className="feature-title">{value.title}</h3>
                <p className="feature-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neural Team */}
      <section className="quantum-section">
        <div className="quantum-container">
          <div className="section-header">
            <h2 className="section-title">Quantum Consciousness</h2>
            <p className="section-subtitle">
              The neural networks behind our multi-dimensional platform
            </p>
          </div>
          
          <div className="quantum-grid">
            {team.map((member, index) => (
              <div key={index} className="quantum-card" style={{textAlign: 'center', padding: '2rem'}}>
                <div style={{position: 'relative', marginBottom: '1.5rem', display: 'inline-block'}}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--quantum-primary)',
                      boxShadow: '0 0 20px var(--quantum-glow)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: 'var(--quantum-primary)'
                }}>
                  {member.name}
                </h3>
                <p style={{color: 'var(--text-secondary)', fontWeight: '500'}}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quantum CTA */}
      <section className="quantum-newsletter">
        <div className="newsletter-matrix"></div>
        <div className="quantum-container">
          <div className="newsletter-content">
            <h2>Ready for Quantum Shopping?</h2>
            <p>Join our neural network and experience shopping across dimensions</p>
            <div className="hero-actions">
              <button onClick={handleShopNow} className="quantum-btn primary">
                Initiate Quantum Shopping
              </button>
              <button onClick={handleContact} className="quantum-btn secondary">
                Access Neural Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;