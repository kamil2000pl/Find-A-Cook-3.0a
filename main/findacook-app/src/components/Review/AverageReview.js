import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';

const AverageReview = ({ cookId }) => {
    const [averageScore, setAverageScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/cook/allreviews`);

                //Get all reviews that match the given cook id
                const filteredReviews = response.data.reviews.filter(review => review.cook_id === cookId);
                console.log(filteredReviews)
                console.log(cookId)
                console.log(response.data.reviews[0].cook_id)
                setReviews(filteredReviews);

                // const reviews = response.data.reviews;
                // console.log(reviews.reviews);

                //Calculate the total of all review scores
                const totalScore = filteredReviews.reduce((acc, review) => acc + review.rating_value, 0);
                console.log(totalScore);
                //Calculate the average
                const avgScore = (totalScore / filteredReviews.length).toFixed(1);
                console.log(avgScore);

                setAverageScore(avgScore);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            }
        };

        fetchReviews();
    }, cookId);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (averageScore === null) {
        return <p>No reviews found.</p>;
    }

    return (
        <div>
            <Rating
                        name='rating_value'
                        value={averageScore}
                        precision={0.5}
                        readOnly
                    />
        </div>
    );
};

export default AverageReview;
