import Homepage from './components/Homepage'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';

const Home = () => {
    const [firstname, setFirstName] = useState("")
    const [secondname, setSecondName] = useState("")
    axios.defaults.withCredentials = true
    useEffect(()=> {
        axios.get('https://findacook-web.onrender.com/api/user/userinfo')
        .then((res) => {
            setFirstName(res.data.fname);
            setSecondName(res.data.sname);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [])



    
  return (
    <>
      <Navbar />
      <Homepage />
      {/* <div className="container">
        <h1>Welcome to Find A Cook {firstname}</h1>

        <p>Explore our recipes and find your new favorite dish.</p>
      </div> */}
    </>
  );

}

export default Home;