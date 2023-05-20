import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCook } from '../../redux/actions/cookActions'
import { BsArrowDownLeft } from 'react-icons/bs';
import { BsArrowDownRight } from 'react-icons/bs';
import { FaWindowClose } from 'react-icons/fa'
import { Modal, Button } from "react-bootstrap";
import BookingForm from './BookingForm';
import axios from "axios";
import './Reviews.css';
import Review from './../Review/Review';
import CreateReview from '../Review/CreateReview';
import moment from 'moment';

const CustomerBooking = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };


  const navigate = useNavigate();
  const { cookId, bookingDate } = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCook(cookId));
  }, [dispatch, cookId]);

  const handleClick = () => {

    setOpenModal(true);

  };

  const { cook } = useSelector(state => state.cooks);

  console.log(cook)

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5001/cook/allreviews");
      const filteredReviews = response.filter(review => review.cookId === cook.cookId);
      console.log(response)
      setReviews(filteredReviews.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };


  // const { roomid, bookingDate } = useParams();
  const theDate = moment(bookingDate, 'DD-MM-YYYY').format('DD-MM-YYYY');


  return (
    <>


      {cook && (

        <div className='cookContainer'>
          {open && (
            <div className="slider">
              <FaWindowClose
                className="close"
                onClick={() => setOpen(false)}
              />
              <BsArrowDownLeft
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src='../images/bao.jpg'
                  alt=""
                  className="sliderImg"
                />

              </div>
              <BsArrowDownRight
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="cookWrapper">
            <button className="bookNow" onClick={handleShow}>Book Now!</button>
            <div className="profile-picture">
              <img src={`/uploads/${cook.profile_picture}`} alt="Profile Picture" />
            </div>
            <h1 className="cookName">{cook.cook_first_name} {cook.cook_last_name}</h1>
            <div className="credentials">
              <p className='verifiedTooltip'>Verified Cook <img src='/images/verified.png' className='verifiedImg' /><span className="tooltiptext">This cook is 100% verified by Find A Cook and meets our standards to ensure the highest quality experience for our clients.</span></p>
              <p className='verifiedTooltip'>Food Safety Cert <img src='/images/certification.png' className='verifiedImg' /><span className="tooltiptext">This cook maintains a certificate for food safety and sanitation to ensure ingredients, handling and preparation are in line with industry standards.</span></p>
              <p><img src='/images/rating.jpg' id="rating-img" />(67 reviews)</p>
            </div>
            <p>{cook.description}</p>
            <span className="selectedDatesHighlight">
              Selected Date: {theDate}
            </span>

            <div className="cookFoodImages">
              <div className="cookFoodImgWrapper" >
                <img
                  // onClick={() => setOpen(true)}
                  src='/images/bao.jpg'
                  alt=""
                  className="cookFoodlImg"
                />

              </div>
              <div className="cookFoodImgWrapper" >
                <img
                  // onClick={() => handleOpen(i)}
                  src='/images/bao.jpg'
                  alt=""
                  className="cookFoodlImg"
                />

              </div>
              <div className="cookFoodImgWrapper" >
                <img
                  // onClick={() => handleOpen(i)}
                  src='/images/bao.jpg'
                  alt=""
                  className="cookFoodlImg"
                />

              </div>
              <div className="cookFoodImgWrapper" >
                <img
                  // onClick={() => handleOpen(i)}
                  src='/images/bao.jpg'
                  alt=""
                  className="cookFoodlImg"
                />

              </div>
              <div className="cookFoodImgWrapper" >
                <img
                  // onClick={() => handleOpen(i)}
                  src='/images/bao.jpg'
                  alt=""
                  className="cookFoodlImg"
                />

              </div>

              <div className="cookFoodImgWrapper" >
                <img
                  // onClick={() => handleOpen(i)}
                  src='/images/bao.jpg'
                  alt=""
                  className="cookFoodlImg"
                />

              </div>

            </div>






          </div>

          <div className="reviewWrapper">
            <CreateReview />
            <h1 className="reviewHeader">{cook.cook_first_name}'s Reviews</h1>
            {reviews.map((review, index) => (
              <Review key={review._id} review={review} />
            ))}
          </div>

        </div>

      )}
      {/* {openModal && <BookingForm setOpen={setOpenModal} cookId={cookId}/>} */}




      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select your menu items: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="rItem" >
            <div className="rItemInfo">
              <div className="rTitle">Bao Buns</div>
              <div className="rDesc">Yum</div>

              <div className="rPrice">€10</div>
            </div>
            <div className="selectFood">

              <div className="food">
                <input
                  type="checkbox"
                />
              </div>

            </div>

          </div>

          <div className="rItem" >
            <div className="rItemInfo">
              <div className="rTitle">Beef Burger </div>
              <div className="rDesc">Tasty</div>

              <div className="rPrice">€10</div>
            </div>
            <div className="selectFood">

              <div className="food">
                <input
                  type="checkbox"
                />
              </div>

            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='modalButton' onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default CustomerBooking;
