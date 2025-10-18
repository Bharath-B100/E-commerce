// src/pages/ProductDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  // Mock product data - in a real app, you'd fetch this based on the ID
  const product = {
    id: id,
    name: `Product ${id}`,
    price: 19.99,
    description: `This is an amazing product ${id} with great features and quality.`,
    image: 'https://via.placeholder.com/400x300?text=Product+Image',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        
        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff', margin: '1rem 0' }}>
            ${product.price}
          </p>
          
          <p>{product.description}</p>
          
          <div style={{ margin: '1.5rem 0' }}>
            <h3>Features:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button style={{ 
              padding: '0.75rem 2rem', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '1.1rem'
            }}>
              Add to Cart
            </button>
            <button style={{ 
              padding: '0.75rem 2rem', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '1.1rem'
            }}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;