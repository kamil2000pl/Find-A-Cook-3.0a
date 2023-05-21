import React, { useState, useEffect } from 'react';
import { Modal, Carousel, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './Review.css'
// import { Rating } from 'react-simple-star-rating'
// import { Ratings } from 'react-ratings-declarative'
import Rating from '@mui/material/Rating';
import axios, { Axios } from 'axios';
import FileBase64 from 'react-file-base64';


const CreateReview = () => {

    // const [rating, setRating] = useState(0)

    // // Catch Rating value
    // const handleRating = (rate: number) => {
    //     setRating(rate)

    //     // other logic
    // }

    // const onPointerMove = (value: number, index: number) => console.log(value, index)


    // return (
    //     <>
    //         <div className='create_review'>
    //             <h3>Leave a Rating</h3>
    //             <div className='new_review_container'>
    //                 <div className='new_rating_stars'>
    //                     <Rating
    //                         // onClick={handleRating}
    //                         // onPointerMove={onPointerMove}
    //                     /* Available Props */
    //                     />
    //                 </div>
    //             </div>


    //         </div>


    //     </>

    // )

    const [value, setValue] = useState(0)
    const [filename, setFilename] = useState("");

    const [review, setReview] = useState({
        review_title: "",
        review_body: "",
        rating_value: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReview({ ...review, [name]: value });
        console.log(review)
        console.log(filename)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('https://findacook-web.onrender.com/api/cook/createreview', review, filename)
            .then((response) => {
                console.log("response received", response.data);
            })
            .catch((error) => {
                console.log("error received", error.response.data);
            });

    };

    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        setFilename(image);
    };

    return (
        <>
            <div className='create_rating_wrapper'>
                <h3>Leave a Rating</h3>
                <div className='star_wrapper'>
                    <Rating
                        name="rating_value"
                        defaultValue={0}
                        // precision={0.5}
                        value={review.value}
                        size="large"
                        // onChange={(event, newValue) => {
                        //     setValue(newValue);
                        //     console.log(newValue)
                        // }}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    {/* <input
                        type="file"
                        className="form-input"
                        name="filename"
                        accept="images/*"
                        // hidden
                        onChange={handleImageUpload}
                    /> */}

                </div>
                <div className='review_form'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="file"
                                className="form-input"
                                name="filename"
                                accept="images/*"
                                // hidden
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className='create_review_title'>
                            <input type="text" name="review_title" placeholder="Review Title" value={review.review_title} onChange={handleInputChange} />
                        </div>
                        <div className='create_review_body'>
                            <input type="text" name="review_body" placeholder="Review Body" value={review.review_body} onChange={handleInputChange} />
                        </div>
                        <div className='review_submit'>
                            <button type="submit" >Submit Review</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )



}

export default CreateReview;