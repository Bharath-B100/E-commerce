import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Latest gadgets, smartphones, laptops, and tech accessories',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
      icon: '📱',
      productCount: 156,
      subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Smart Watches', 'Cameras'],
      color: '#3B82F6'
    },
    {
      id: 2,
      name: 'Fashion',
      description: 'Trendy clothing, shoes, and accessories for every style',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
      icon: '👕',
      productCount: 234,
      subcategories: ['Men\'s Fashion', 'Women\'s Fashion', 'Kids Fashion', 'Shoes', 'Accessories', 'Jewelry'],
      color: '#EC4899'
    },
    {
      id: 3,
      name: 'Home & Kitchen',
      description: 'Everything for your home - furniture, appliances, and decor',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      icon: '🏠',
      productCount: 189,
      subcategories: ['Furniture', 'Kitchen Appliances', 'Home Decor', 'Bedding', 'Lighting', 'Storage'],
      color: '#10B981'
    },
    {
      id: 4,
      name: 'Beauty & Personal Care',
      description: 'Skincare, makeup, haircare, and grooming products',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
      icon: '💄',
      productCount: 167,
      subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances', 'Personal Care', 'Beauty Tools'],
      color: '#8B5CF6'
    },
    {
      id: 5,
      name: 'Sports & Outdoors',
      description: 'Equipment and gear for sports, fitness, and outdoor activities',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      icon: '⚽',
      productCount: 145,
      subcategories: ['Fitness Equipment', 'Outdoor Gear', 'Team Sports', 'Water Sports', 'Cycling', 'Yoga'],
      color: '#F59E0B'
    },
    {
      id: 6,
      name: 'Books & Media',
      description: 'Books, movies, music, and educational materials',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
      icon: '📚',
      productCount: 98,
      subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Music', 'Movies', 'Audiobooks'],
      color: '#EF4444'
    },
    {
      id: 7,
      name: 'Toys & Games',
      description: 'Fun for all ages - toys, games, and educational play',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop',
      icon: '🎮',
      productCount: 123,
      subcategories: ['Educational Toys', 'Board Games', 'Video Games', 'Outdoor Toys', 'Puzzles', 'Action Figures'],
      color: '#06B6D4'
    },
    {
      id: 8,
      name: 'Health & Wellness',
      description: 'Supplements, fitness trackers, and wellness products',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      icon: '💊',
      productCount: 87,
      subcategories: ['Vitamins', 'Fitness Trackers', 'Medical Supplies', 'Wellness', 'First Aid', 'Therapy'],
      color: '#84CC16'
    },
    {
      id: 9,
      name: 'Automotive',
      description: 'Car accessories, tools, and maintenance products',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
      icon: '🚗',
      productCount: 76,
      subcategories: ['Car Accessories', 'Tools', 'Maintenance', 'Car Care', 'Interior', 'Exterior'],
      color: '#6B7280'
    },
    {
      id: 10,
      name: 'Pet Supplies',
      description: 'Food, toys, and accessories for your furry friends',
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop',
      icon: '🐾',
      productCount: 112,
      subcategories: ['Pet Food', 'Toys', 'Grooming', 'Beds', 'Health Care', 'Accessories'],
      color: '#F97316'
    },
    {
      id: 11,
      name: 'Grocery & Food',
      description: 'Fresh groceries, snacks, and beverages',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
      icon: '🛒',
      productCount: 298,
      subcategories: ['Fresh Produce', 'Snacks', 'Beverages', 'Dairy', 'Bakery', 'Frozen Foods'],
      color: '#22C55E'
    },
    {
      id: 12,
      name: 'Office Supplies',
      description: 'Stationery, furniture, and equipment for your workspace',
      image: 'https://images.unsplash.com/photo-1587334984005-5eb245fd39d2?w=600&h=400&fit=crop',
      icon: '📎',
      productCount: 134,
      subcategories: ['Stationery', 'Office Furniture', 'Printers', 'Computers', 'Organizers', 'Writing Tools'],
      color: '#8B5CF6'
    }
  ];

  return (
    <div className="page-container" style={{ padding: '2rem 0' }}>
      {/* Header Section */}
      <div className="section-header">
        <h1 className="section-title">Shop by Category</h1>
        <p className="section-subtitle">
          Discover {categories.reduce((sum, cat) => sum + cat.productCount, 0)}+ products across all categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="products-grid">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={`/products?category=${category.name.toLowerCase()}`}
            className="product-card fade-in"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div className="product-image-container">
              <img 
                src={category.image} 
                alt={category.name}
                className="product-image"
              />
              <div 
                className="product-badge"
                style={{ 
                  background: category.color,
                  fontSize: '1rem',
                  padding: '0.75rem 1rem'
                }}
              >
                {category.icon} {category.name}
              </div>
            </div>
            
            <div className="product-content">
              <h3 className="product-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {category.name}
              </h3>
              
              <p className="product-description" style={{ marginBottom: '1rem' }}>
                {category.description}
              </p>

              {/* Product Count */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '1rem',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem'
              }}>
                <span>📦</span>
                <span>{category.productCount} products available</span>
              </div>

              {/* Subcategories */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ 
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)'
                }}>
                  Popular in {category.name}:
                </h4>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.25rem'
                }}>
                  {category.subcategories.slice(0, 4).map((subcat, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      {subcat}
                    </span>
                  ))}
                  {category.subcategories.length > 4 && (
                    <span
                      style={{
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      +{category.subcategories.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Explore Button */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-light)'
              }}>
                <span style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 600
                }}>
                  Explore Category
                </span>
                <span style={{ 
                  fontSize: '1.25rem',
                  color: category.color
                }}>
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div style={{ 
        marginTop: '4rem',
        padding: '3rem',
        background: 'var(--gradient-primary)',
        borderRadius: 'var(--radius-lg)',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Why Shop with Us?
        </h2>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {[
            { icon: '🚚', label: 'Free Shipping', value: 'On orders over $50' },
            { icon: '↩️', label: 'Easy Returns', value: '30-day policy' },
            { icon: '🛡️', label: 'Secure Payment', value: '100% protected' },
            { icon: '⭐', label: 'Quality Products', value: 'Verified sellers' }
          ].map((stat, index) => (
            <div key={index}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                {stat.label}
              </div>
              <div style={{ opacity: 0.9 }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;