import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"; 
import axios from "axios"; 

const PaymentField = (props) => {
  const plans = [
    {
      name: "Cook Subscription",
      price_id: "price_1MiyTuDYuzoeBKxGwv312odT",
      price_for_user: "€200 / year",
    },
  ];

  const [cook_email, setCookEmail] = useState(""); // Initializing state for cook's email

  const checkout = (priceId) => {
    let data = {
      priceId: priceId,
      customerEmailId: cook_email,
    };
    axios
      .post("https://findacook-web.onrender.com/api/create_checkout_link", data) //POST request with data as payload
      .then((response) => {
        window.open(response.data.url, '_self'); //If the request is successful, URL is opened that's returned from the server in the same window ('_self').
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <>
      <div className="payment-body">
        <div class="payment-card">
          <div class="payment-card-header">
            <img src="./images/payment_cook.jpg" alt="" />
          </div>
          <div class="payment-card-body">
            <div class="payment-card-title">Subscription Details</div>
            <div class="payment-card-text">
              You are one step closer to being able to offer tasty dishes to the
              world!
            </div>
            <div class="payment-card-plan">
              <div class="payment-card-plan-img">
                <img src="./images/smallPotIcon.png" alt="" />
              </div>
              <div class="payment-card-plan-text">
                <div class="payment-card-plan-title">Annual Subscription Plan</div>
                <div class="payment-card-plan-price">€200/year</div>
              </div>
            </div>
            <div className="payment-card-email">
              <label htmlFor="cook-email">Enter Your Email:</label>
              <input
                type="email"
                id="cook_email"
                name="cook_email"
                placeholder="johndoe@email.com"
                onChange={(e) => setCookEmail(e.target.value)}
                value={cook_email}
              />
            </div>
            {plans.map((plan) => {
              return (
                <>
                  <div class="card-payment-button">
                    <button onClick={() => checkout(plan.price_id)}>
                      Proceed to Payment
                    </button>
                  </div>
                </>
              );
            })}

            <div class="card-cancel-button">
              <a href="/">
                <button>Cancel</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentField;
