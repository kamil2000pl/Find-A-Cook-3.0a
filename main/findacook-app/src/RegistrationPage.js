import React, { useRef, useState } from "react";
import axios, { Axios } from 'axios';
import { Link } from "react-router-dom";
import BackButton from "./components/BackButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FaGoogle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import "./index.css";
import Autocomplete from "react-google-autocomplete";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalWindow from './components/Modal';
import { render } from "react-dom";

function RegistrationPage() {
  const [user, setUser] = useState({
    user_first_name: "",
    user_last_name: "",
    user_phone_number: "",
    user_email: "",
    user_password: "",
    user_address: "",
    user_birthday: ""
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name + " <> " + value)
    setUser({ ...user, [name]: value });
  };


  const [hasRender, setRender] = useState(false);
   const onShow = React.useCallback(() => setRender(true), []);
   const onUnShow = React.useCallback(() => setRender(false), []);

   
  const submitButtonRef = useRef(null);

  const handleSubmit = (event) => {
    onUnShow();
    event.preventDefault();
    axios
    .post('https://findacook-web.onrender.com/api/user/signup', user)
    .then((response) => {
      console.log("response received", response.data);
      setMessage(response.data.message);
    })
    .catch((error) => {
      console.log("error received", error.response.data);
      setMessage(error.response.data);
    });

  };
  return (
    <>

<div class="login-fg">
    <div class="container-fluid">
        <div class="row">
        <div className="col-xl-8 col-lg-7 col-md-12 bg" style={{backgroundImage: "url('./images/kitchen.png')"}}>
            </div>
            <div class="col-xl-4 col-lg-5 col-md-12 login">
                <div class="login-section">
                    <div class="logo clearfix">
                        <a href="#">
                            Find A Cook
                        </a>
                    </div>
                    <h3>New Here? Join Us!</h3>
                    <ul class="social">
                        <li><a href="#" class="facebook"><FaFacebook />{' '}<span>Facebook</span></a></li>
                        <li><a href="#" class="twitter"><BsTwitter />{' '}<span>Twitter</span></a></li>
                        <li><a href="#" class="google"><FaGoogle />{' '}<span>Google</span></a></li>
                    </ul>
                    <div class="or-login clearfix">
                        <span>Or</span>
                    </div>
                    <div class="form-container">
                        <form onSubmit={handleSubmit}>
                            <div class="form-group form-fg">
                                <input type="email" name="user_email" class="input-text" placeholder="Email Address" value={user.user_email} onChange={handleInputChange}/>
                            </div>
                            <div class="form-group form-fg">
                                <input type="text" name="user_first_name" class="input-text" placeholder="First Name" value={user.user_first_name} onChange={handleInputChange} />
                            </div>
                            <div class="form-group form-fg">
                                <input type="text" name="user_last_name" class="input-text" placeholder="Surname" value={user.user_last_name} onChange={handleInputChange} />
                            </div>
                            <div class="form-group form-fg">
                                <input type="number" name="user_phone_number" class="input-text" placeholder="Phone Number" value={user.user_phone_number} onChange={handleInputChange} />
                            </div>
                            <div class="form-group form-fg">
                                <input type="password" name="user_password" class="input-text" placeholder="Password" value={user.user_password} onChange={handleInputChange} />
                            </div>
                            <div class="form-group form-fg">
                                <Autocomplete name="user_address" options={{ types: ["address"] , componentRestrictions: { country: "ie" } }} apiOptions={{ region: 'ie' }} apiKey="AIzaSyBasdqjFLpnbCBlJT8laLhhG9eHUTqyTes" placeholder="Address" value={user.user_address} onInput={handleInputChange} onBlur={handleInputChange} className="input-text"/>
                            </div>
                            <div class="form-group form-fg">
                                <input type="date" name="user_birthday" class="input-text" placeholder="Birth Date" value={user.user_birthday} onChange={handleInputChange} />
                            </div>
                            <div class="form-group mt-2">
                                {/* <button type="submit" class="btn-md btn-fg btn-block">Register</button> */}
                                <button onClick={onShow} form='register-form' class="btn-md btn-fg btn-block">Register</button>
                                {hasRender && <ModalWindow handleSubmit={handleSubmit} onShow={onShow}/>}
                            </div>
                        </form>
                        {message}
                    </div>
                    <p>Already have an account? <a href="/login" class="linkButton">Sign In</a></p>
                    <p>Or <a href='/'>Go Back to Homepage</a></p>
                </div>
            </div>
        </div>
    </div>
</div>  


    </>
  );
}

export default RegistrationPage;