import React, { useEffect, useState } from "react";
import "./topbar.css";
import { FaLanguage } from "react-icons/fa";
import axios from "axios";

const Topbar = () => {

  const [firstname, setFirstName] = useState("");
  const [profile, setProfile] = useState("");
  axios.defaults.withCredentials = true
  useEffect(()=> {
    axios.get('http://localhost:5001/cook/cookinfo')
    .then((res) => {
      setFirstName(res.data.firstn);
      setProfile(res.data.profile);
      console.log(res.data.firstn)
    })
    .catch((err) => {
      console.error(err);
    });
  }, [])

    return(
        <>
            <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Hi {firstname}</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            {/* <NotificationsNone /> */}
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <FaLanguage />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            {/* <Settings /> */}
          </div>
          <img src="../images/admin.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
        </>
    )
}

export default Topbar