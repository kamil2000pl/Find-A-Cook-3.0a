import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCook } from '../../redux/actions/cookActions'
import axios from 'axios';
import Scheduler from '../Scheduler';
import Maps from '../Maps';
import Geocode from "react-geocode";
// import { getSchedules } from '../../redux/actions/scheduleActions';

const CookDashboard = () => {
  const navigate = useNavigate();
	const { cookId } = useParams();
	console.log('', cookId)
	
	const dispatch = useDispatch(); 


	useEffect(() => {
		dispatch(getCook(cookId));
	}, [dispatch, cookId]);

	const { cook } = useSelector(state => state.cooks);
  console.log(cook);

  Geocode.setApiKey("AIzaSyBasdqjFLpnbCBlJT8laLhhG9eHUTqyTes");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [specialities, setSpecialities] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState("");
  axios.defaults.withCredentials = true
  useEffect(()=> {
      axios.get('http://localhost:5001/cook/cookinfo')
      .then((res) => {
          setFirstName(res.data.firstn);
          setLastName(res.data.lastn);
          setEmail(res.data.email);
          setSpecialities(res.data.special);
          setDescription(res.data.descrip);
          setAddress(res.data.address);
          setProfile(res.data.profile);
          console.log(res.data.cook_address)
      })
      .catch((err) => {
          console.error(err);
      });
  }, [])


//   useEffect(() => {
// 		dispatch(getSchedules);
// 	}, [dispatch]);

//   const [scheduleTitle, setScheduleTitle] = useState("");
//   const [scheduleStart, setScheduleStart] = useState("");
//   const [scheduleAddress, setScheduleAddress] = useState("");
//   useEffect(()=> {
//     axios.get('http://localhost:5001/schedule/schedules')
//     .then((res) => {
//       setScheduleTitle(res.data.title);
//       setScheduleStart(res.data.start);
//       setScheduleAddress(res.data.address);
//     })
//     .catch((err) => {
//         console.error(err);
//     });
// }, [])

// console.log(scheduleTitle)

  // const [data, setData] = useState('');
  
  // const parentToChild = () => {
  //   setData(address);
  // }
  // console.log(address)

  
  const [userLat, setUserLat] = useState();
  const [userLng, setUserLng] = useState();
  var latlng = []

  
  Geocode.fromAddress(address).then(
    (response) => {
      setUserLat(response.results[0].geometry.location.lat);
      setUserLng(response.results[0].geometry.location.lng);
      // console.log('user coords = ' + userLat + ' ' + userLng);
      // console.log('coords2 = ' + lat + ' ' + lng);
    },
    (error) => {
      console.error(error);
    }
  )

  console.log("lat - " + userLat + "- lng - " + userLng)
  if(latlng) {latlng.push(userLat)
  latlng.push(userLng)
  }

  var schedule = [{title: "Brian Cullen", start: "2023-02-28 15:00", lat: 54.001024 , lng: -6.386164},
  {title: "Joseph Bell", start: "2023-02-24 12:00", lat: 54.002736 , lng: -6.422944}
                  ]

    return (
<>



     <section class="dashboard">

     <div class="row">
             <div class="col-xl-4">
               <div class="card-box">
                 <h4 class="header-title mt-0">Personal Information</h4>
                 <div class="panel-body">
                   <p class="text-muted font-13">
                     Hi, I'm {firstname} {lastname}. {description}
                   </p>
                   <hr />
                   <div class="text-left">
                     <p class="text-muted font-13">
                       <strong>Full Name :</strong>{" "}
                       <span class="m-l-15">{firstname} {lastname}</span>
                     </p>
                     <p class="text-muted font-13">
                       <strong>Mobile :</strong>
                       <span class="m-l-15"></span>
                     </p>
                     <p class="text-muted font-13">
                       <strong>Email :</strong>{" "}
                       <span class="m-l-15">{email}</span>
                     </p>
                     <p class="text-muted font-13">
                       <strong>Location :</strong> <span class="m-l-15">KH</span>
                     </p>
                     <p class="text-muted font-13">
                       <strong>Cuisine(s) :</strong>{" "}
                       <span class="m-l-5">
                         <span
                           class="flag-icon flag-icon-us m-r-5 m-t-0"
                           title="us"
                         ></span>
                         <span>{specialities}</span>{" "}
                       </span>
                     </p>
                   </div>
                 </div>
               </div>
             </div>
             <div class="col-xl-8">
               <div class="row">
                 <div class="col-sm-4">
                   <div className="cook-img-container">
                     <div className="cook-dash-img">
                       <img src={profile} alt="" />
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        <Scheduler />
        
        <Maps data={latlng} schedule={schedule}/>
     </section>

</>
    );
  };
  
  export default CookDashboard;
