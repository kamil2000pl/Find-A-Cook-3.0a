import React, { useState, useEffect } from "react";
import axios from "axios";
import Cook from './Something/Cook'
import './Something/Cook.css'
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'antd/dist/reset.css';
import moment from 'moment';


const Homepage = () => {
  const [cooks, setCooks] = useState([]);
  const [bookingDate, setBookingDate] = useState();
  
  useEffect(() => {
    fetchCooks();
  }, []);

  const fetchCooks = async () => {
    try {
      const response = await axios.get("https://findacook-web.onrender.com/api/cook/allcooks");
      setCooks(response.data.cooks);
    } catch (error) {
      console.error("Error fetching cooks:", error);
    }
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
         <Cook key={cook._id} cook={cook} /*bookingDate={bookingDate}*//>
          ))}
       </div>   
       </div>   
</div>
    </>
  );
};

export default Homepage;
