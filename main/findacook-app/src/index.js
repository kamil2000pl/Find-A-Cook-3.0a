import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LandingPage from './LandingPage';
// import LoginPage from './LoginPage';
// import UploadDocuments from './UploadDocuments';
// import RegistrationPage from './RegistrationPage';
// import GuestPage from './GuestPage';
// import TestPage from './TestPage';
// import CartPage2 from './CartPage2';
// import OrderInfoPage from './OrderInfoPage';
// import ProductPage from './ProductPage';
import './index.css';
import reportWebVitals from './reportWebVitals';
import VerifyPage from './VerifyPage';
import CookDashboard from './CookDashboard';
import RegisinfoPage from './RegisInfoPage';
import TermsPage from './TermsPage';
// import 'font-awesome/css/font-awesome.min.css';
import CookProfile from './CookProfile';
import ViewCooks from './ViewCooks';
import { commerce } from './lib/commerce';
// import data from './components/Data/data';
import App from './App';
import {Provider} from 'react-redux'
import store from './redux/store';



// const store = configureStore({ allReducers });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <Provider store={store}><App /></Provider>
    {/* <Routes>
      
    </Routes> */}
    {/* The various pages will be displayed by the `Main` component. */}
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
