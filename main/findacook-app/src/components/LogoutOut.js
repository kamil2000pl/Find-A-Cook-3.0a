import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('https://findacook-web.onrender.com/api/user/logout')
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <button className='logoutButton' onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
