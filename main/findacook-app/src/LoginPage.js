import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './components/BackButton';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import RememberPassword from './components/RememberPassword';
import { BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FaGoogle } from "react-icons/fa";
import axios from 'axios';
import { useNavigate, Redirect } from "react-router-dom";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true
  const Login = (event) => {
    event.preventDefault();
    axios.post('https://findacook-web.onrender.com/api/user/signin', {
        user_email: email,
        user_password: password,
    }).then((res) => {
        if (res.data.status === "SUCCESS") {
            console.log(res.data);
            // redirect to dashboard
            navigate("/home")
        } else {
            // display error message
            setMessage(res.data.message)
        }
    }).catch((err) => {
        console.error(err);
        // display error message
        setMessage(err.response.data.message)
    });
};

  return (
    <>
    <div class="login-fg">
    <div class="container-fluid">
        <div class="row">
        <div className="col-xl-8 col-lg-7 col-md-12 bg" style={{backgroundImage: "url('./images/kitchen2.png')"}}>
            </div>
            <div class="col-xl-4 col-lg-5 col-md-12 login">
                <div class="login-section">
                    <div class="logo clearfix">
                        <a href="#">
                            Find A Cook
                        </a>
                    </div>
                    <h3>Welcome Back!</h3>
                    <ul class="social">
                        <li><a href="#" class="facebook"><FaFacebook />{' '}<span>Facebook</span></a></li>
                        <li><a href="#" class="twitter"><BsTwitter />{' '}<span>Twitter</span></a></li>
                        <li><a href="#" class="google"><FaGoogle />{' '}<span>Google</span></a></li>
                    </ul>
                    <div class="or-login clearfix">
                        <span>Or</span>
                    </div>
                    <div class="form-container">
                        <form onSubmit={Login}>
                            <div class="form-group form-fg">
                                <input type="email" name="email" class="input-text" placeholder="Email Address" onChange={(event) => setEmail(event.target.value)}/>
                            </div>
                            <div class="form-group form-fg">
                                <input type="password" name="password" class="input-text" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                            <div class="form-group mt-2">
                                <button type="submit" class="btn-md btn-fg btn-block">Login</button>
                            </div>
                            {message}
                        </form>
                    </div>
                    <p>New Here? <a href="/register" class="linkButton">Sign Up!</a></p>
                    <p>Or <a href='/'>Go Back to Homepage</a></p>
                </div>
            </div>
        </div>
    </div>
</div>  
    </>
  );
}

export default LoginPage;
