import React, { useState } from 'react';
import { BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FaGoogle } from "react-icons/fa";
import { useNavigate, Redirect } from "react-router-dom";
import axios from 'axios';


function CookLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const login = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5001/cook/cooksignin', {
        cook_email: email,
        cook_password: password,
    }).then((res) => {
        if (res.data.status === "SUCCESS") {
            console.log(res.data);

            navigate("/cookdashboard")
        } else {
            // setMessage(err.response.data.message)

            setMessage('Some Error')
        }
    }).catch((err) => {
        console.error(err);
        setMessage(err.response.data.message)
    });
  
};

  
  return (
    <>
    <div class="login-fg">
    <div class="container-fluid">
        <div class="row">
        <div className="col-xl-8 col-lg-7 col-md-12 bg" style={{backgroundImage: "url('./images/cookLogin.png')"}}>
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
                        <form onSubmit={login}>
                            <div class="form-group form-fg">
                                <input type="email" name="email" class="input-text" placeholder="Email Address" onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div class="form-group form-fg">
                                <input type="password" name="password" class="input-text" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            {message}
                            <div class="form-group mt-2">
                                <button type="submit" class="btn-md btn-fg btn-block">Login</button>
                            </div>
                        </form>
                    </div>
                    <p>Interested in becoming a <strong>cook</strong>? <a href="/cookregistration" class="linkButton">Sign Up!</a></p>
                    <p>Or <a href='/'>Go Back to Homepage</a></p>
                </div>
            </div>
        </div>
    </div>
</div>  
    </>
  );
}

export default CookLoginPage;