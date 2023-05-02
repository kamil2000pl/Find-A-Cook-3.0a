import React, { useState, useEffect } from 'react';
import { Modal, Carousel, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './Review.css'
import { Rating } from '@mui/material';


const Review = ({ review }) => {

    const [show, setShow] = useState(false);

    //date formatting from https://stackoverflow.com/questions/1056728/where-can-i-find-documentation-on-formatting-a-date-in-javascript
    var date_formatted = new Date(review.date);
    var curr_date = date_formatted.getDate();
    var curr_month = date_formatted.getMonth() + 1; //Months are zero based
    var curr_year = date_formatted.getFullYear();


    //number to stars function adapted from https://codereview.stackexchange.com/questions/177945/convert-rating-value-to-visible-stars-using-fontawesome-icons
    // document.getElementById("stars").innerHTML = getStars(review.rating_value);

    // function getStars(rating) {

    //     // Round to nearest half
    //     // rating = Math.round(rating * 2) / 2;
    //     rating = rating/2;
    //     console.log(rating + 'rating')

    //     let output = [];

    //     // Append all the filled whole stars
    //     for (var i = rating; i >= 1; i--)
    //         output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    //     // If there is a half a star, append it
    //     if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    //     // Fill the empty stars
    //     for (let i = (5 - rating); i >= 1; i--)
    //         output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    //     return output.join('');

    // }


    return (
        <>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />


            <div className='review_details'>
                {/* <div className='star_rating'>Rating: <span id='stars'></span></div> */}
                <div className='=star_rating'>
                    {/* Rating: {review.rating_value} */}
                    <Rating
                        name='rating_value'
                        value={review.rating_value}
                        readOnly
                    />
                </div>
                <div className='review_date'>{curr_date + "/" + curr_month + "/" + curr_year}</div>
                <div className='review_img' src={review.filename}></div>
                <div className='review_title'>{review.review_title}</div>
                <div className='review_body'>{review.review_body}</div>
            </div>

        </>

    )


}

export default Review;