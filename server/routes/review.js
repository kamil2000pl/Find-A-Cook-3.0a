const express = require('express');
const router = express.Router();


const Review = require("../schema/RatingSchema");


// router.get("/:id", async (req,res) => {
//     try{
//         const review = await Review.findById(req.params.id);
//             res.status(200).json(review);
//         }catch(err){
//             res.status(500).json(err);
//         }
//     });

router.get('/:reviewId', reviewController.read);
router.get('/reviews', reviewController.readAll);


    module.exports = router;