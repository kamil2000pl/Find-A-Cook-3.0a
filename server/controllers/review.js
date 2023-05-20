const Cook = require('./../models/Review');
const fs = require('fs');

exports.read = async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const review = await Review.findById(reviewId);

      res.json(review);
      console.log(review);
    } catch (err) {
      console.log('Review Read Error: ', err);
      res.status(500).json({
        errorMessage: 'Please try again later',
      });
    }
  };

  exports.readAll = async (req, res) => {
    try {
      const reviews = await Review.find({});
      res.status(200).json(reviews);
    } catch (err) {
      console.log('Review ReadAll Error: ', err);
      res.status(500).json({
        errorMessage: 'Please try again later',
      });
    }
  };
