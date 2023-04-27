import React, { useState, useEffect } from "react";
import axios from "axios";
import Cook from './Something/Cook'
import './Something/Cook.css'
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'antd/dist/reset.css';
import moment from 'moment';
import Geocode from "react-geocode";




const Homepage = () => {
  const [cooks, setCooks] = useState([]);
  const [closeCooks, setCloseCooks] = useState([]);
  const [bookingDate, setBookingDate] = useState();

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [userLat, setUserLat] = useState();
  const [userLng, setUserLng] = useState();

  var coords = []
  var latlng = []
  var lat1
  var lng1

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);

  function getCoordinates1(data){
    console.log("data from 1 - " + data)
    setLat(data[0])
    setLng(data[1]) 
  }

    function getCoordinates(address, callback)
    {
      console.log("addy from func - " + address)
    Geocode.fromAddress(address).then(
      (response) => {
        
        lat1 = response.results[0].geometry.location.lat;
        // console.log("response - " + response.results[0].geometry.location.lat) // WORKS
        // console.log("orig lat - " + lat) // WORKS
        lng1 = response.results[0].geometry.location.lng;
        // console.log('cook coords = ' + lat + ' ' + lng);
        // myCallback(results[0].geometry.location);

        latlng.push(response.results[0].geometry.location.lat)
        latlng.push(response.results[0].geometry.location.lng)
        console.log("latlng from getcoords func - " + latlng)
        // return latlng;
        callback(latlng)
      },
      (error) => {
        console.error(error);
      }
    )
    }

    console.log(cooks)
  
  useEffect(() => {
    // if(!cooks){
      fetchCooks();
    // }
  }, []);

  const fetchCooks = async () => {
    try {
      const response = await axios.get("http://localhost:5001/cook/allcooks");
      setCooks(response.data.cooks);
    } catch (error) {
      console.error("Error fetching cooks:", error);
    }
  };

  // console.log(cooks)

  // const [firstname, setFirstName] = useState("");
  //   const [lastname, setLastName] = useState("");
  //   const [useraddress, setUserAddress] = useState("");
  //   axios.defaults.withCredentials = true
  //   useEffect(()=> {
  //       axios.get('http://localhost:5001/user/userinfo')
  //       .then((res) => {
  //           // setAddress(res.data.address);
  //           // console.log(res.data.address + " - current user")
  //           setUserAddress(res.data.address);
  //           console.log("WORKING")
  //       })
  //       .catch((err) => {
  //           console.error(err);
  //           console.log("NOT WORKING");
  //       });
  //   }, [])
  //   console.log(useraddress + " - address")

  const useraddress = "32 The Park, Martello Village, Drogheda, County Louth, Ireland"

  

    Geocode.fromAddress(useraddress).then(
      (response) => {
        setUserLat(response.results[0].geometry.location.lat);
        setUserLng(response.results[0].geometry.location.lng);
        // console.log('user coords = ' + userLat + ' ' + userLng);
        // console.log('coords2 = ' + lat + ' ' + lng);
      },
      (error) => {
        console.error(error);
        console.log(useraddress);
      }
    )

    console.log("userlat - " + userLat)
  

  // print cooks in console WORKS
  
  // cooks.forEach( cook => { 
    for (var i=0; i < cooks.length; i++)  {
    // console.log(cook.cook_address);
    // console.log(cook)

    if (i < 13) {
      break;
    }
    
    Geocode.fromAddress(cooks[i].cook_address).then(
        (response) => {
          setLat(response.results[0].geometry.location.lat);
          // console.log("response - " + response.results[0].geometry.location.lat) // WORKS
          // console.log("orig lat - " + lat) // WORKS
          setLng(response.results[0].geometry.location.lng);
          // console.log('cook coords = ' + lat + ' ' + lng);
        },
        (error) => {
          console.error(error);
        }
      )

    // setTimeout(getCoordinates(cooks[i].cook_address, getCoordinates1), 1000)

    console.log(i)

    console.log("please - " + lat + " - " + lng)

    // lat = coords[0];
    // lng = coords[1];

    
      
      console.log("lat - " + lat) // NOT WORKING

      // Distance calculation
      // if (typeof(Number.prototype.toRad) === "undefined") {
      //   Number.prototype.toRad = function() {
      //     return this * Math.PI / 180;
      //   }
      // }
      // console.log("lat1 - " + lat)

      var R = 6371; // km 
      var x1 = userLat-lat;
      // console.log("x1 - " + x1)
      var dLat = x1 * Math.PI / 180;  
      var x2 = userLng-lng;
      // console.log("x2 - " + x2)
      var dLon = x2 * Math.PI / 180;  
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                      Math.cos(lat * Math.PI / 180) * Math.cos(userLat * Math.PI / 180) * 
                      Math.sin(dLon/2) * Math.sin(dLon/2);  
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      // console.log("a - " + a)
      // console.log("c - " + c)
      var d = R * c; 

      // alert(d)
      console.log(d);

      // if (d > 30) {
      //   // alert(d)
      //     closeCooks.push(cook)
      // }

  };

    

  const filterByDate = (dates) => {
    const date = dates.format('DD-MM-YYYY');
    setBookingDate(date);
}
  return (
    <>
    <div>

        <nav className="">
    
        <DatePicker format={'DD-MM-YYYY'} onChange={filterByDate}/>
        {/* <TimePicker format="HH:mm" minuteStep={5}/> */}
      
              <form className="search-container">
                <input
                  id="search-bar"
                  type="search"
                  placeholder="Search..."
                  name="search"
                  // value={text}
                  // onChange={handleSearch}
                />
            
                {/* <button
                  className=""
                  type="submit"
                  disabled={true}
                >
                  Search
                </button> */}
              </form>
            </nav>
            </div>
  
      <div class="test-container">
      <div class="profile-info">
      <div class="product-section">
{cooks.map((cook, index) => (
         <Cook key={cook._id} cook={cook} bookingDate={bookingDate}/>
          ))}
       </div>   
       </div>   
</div>
    </>
  );
};

export default Homepage;