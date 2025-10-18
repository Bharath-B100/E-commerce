// src/components/reviews/ReviewSection.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import ReviewSummary from './ReviewSummary';
import './ReviewSection.css';

const ReviewSection = ({ productId }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock reviews data - replace with API call
  useEffect(() => {
    const mockReviews = [
      {
        id: 1,
        userId: 'user1',
        userName: 'John Doe',
        rating: 5,
        title: 'Excellent sound quality!',
        comment: 'These headphones exceeded my expectations. The noise cancellation is amazing and battery life is as advertised.',
        date: '2024-01-15',
        verified: true,
        helpful: 12
      },
      {
        id: 2,
        userId: 'user2',
        userName: 'Sarah Smith',
        rating: 4,
        title: 'Great value for money',
        comment: 'Very comfortable for long sessions. Sound quality is impressive for the price point.',
        date: '2024-01-10',
        verified: true,
        helpful: 8
      }
    ];
    setReviews(mockReviews);
  }, [productId]);

  const handleAddReview = (reviewData) => {
    const newReview = {
      id: reviews.length + 1,
      userId: user.id,
      userName: user.name,
      ...reviewData,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      helpful: 0
    };
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const ratingStats = {
    average: reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length,
    total: reviews.length,
    distribution: [0, 0, 0, 0, 0] // 1-5 stars
  };

  reviews.forEach(review => {
    ratingStats.distribution[5 - review.rating]++;
  });

  return (
    <div className="review-section">
      <div className="review-header">
        <h2>Customer Reviews</h2>
        {user ? (
          <button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn btn-primary"
          >
            Write a Review
          </button>
        ) : (
          <p>Please log in to write a review</p>
        )}
      </div>

      <ReviewSummary stats={ratingStats} />

      {showReviewForm && (
        <ReviewForm 
          onSubmit={handleAddReview}
          onCancel={() => setShowReviewForm(false)}
        />
      )}

      <ReviewList 
        reviews={reviews}
        onHelpful={handleHelpful}
      />
    </div>
  );
};

export default ReviewSection;