import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PaymentSuccessful = () => {
  // use the useLocation hook from react-router-dom to access location information
  const location = useLocation();

  // get query parameters from location search
  const queryParams = new URLSearchParams(location.search);

  // get the value of the 'success' and 'cook_email' query parameters
  const success = queryParams.get("success") === "true";
  const cook_email = queryParams.get("cook_email");

  useEffect(() => {
    // define an async function to verify the cook's email
    const verifyCookEmail = async () => {
      try {
        // send a POST request to verify the cook's email
        const response = await axios.post("https://findacook-web.onrender.com/api/cook/verify_cook", {
          cook_email: cook_email,
        });

        // if the response is successful, do nothing
        if (!response.data.success) {
          // if the response is unsuccessful, alert the user
          alert("Cook email is not valid or could not be verified");
        }
      } catch (error) {
        // if there's an error, log it to the console and alert the user
        console.error(error);
        alert("An error occurred while verifying cook email. Please try again.");
      }
    };

    // if the payment is successful, verify the cook's email
    if (success) {
      verifyCookEmail();
    }
  }, [success, cook_email]);

  // render the success or failure message depending on the value of success
  return (
    <>
      <div className="successBody">
        <div
          className="successCard"
          style={{
            backgroundImage: "url('./images/successCook.png')",
            backgroundRepeat: "no-repeat",
          }}
        >
          {success ? (
            <>
              <h2>Payment Successful!</h2>
              <p>Well done, Kim! You have successfully taken the final step towards becoming a cook! Your payment has been received and an email containing your invoice will be sent to you shortly. Now, log in and unleash your culinary creativity to whip up some scrumptious dishes!
              </p>
              <div className="applicationButton">
                <a href="/cooklogin"><button className="applicationBtn">Login!</button></a>
              </div>
            </>
          ) : (
            <>
              <h2>Payment Unsuccessful</h2>
              <p>Sorry, your payment was unsuccessful. Please try again or contact support for assistance.</p>
              <div className="applicationButton">
                <a href="/"><button className="applicationBtn">Back to Home</button></a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessful;
