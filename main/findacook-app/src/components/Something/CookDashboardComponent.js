import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCook } from '../../redux/actions/cookActions'
import axios from 'axios';

async function postImage({documents, description}) {
  const formData = new FormData();
  for (let i = 0; i < documents.length; i++) {
    formData.append('document', documents[i]);
  }
  formData.append('description', description);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const result = await axios.post('http://localhost:5001/cook/documents', formData, config);
  return result.data;
}


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

  const [documentDescription, setDocumentDescription] = useState("")
  const [documents, setDocuments] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({documents, documentDescription});
    setDocuments([...result.documents, ...documents]);
  };
  

  const fileSelected = (event) => {
    const files = event.target.files;
    setDocuments(files);
  };

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [specialities, setSpecialities] = useState("");
  const [description, setDescription] = useState("");
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
          setProfile(res.data.profile);
          console.log(res.data.firstn)
      })
      .catch((err) => {
          console.error(err);
      });
  }, [])
  
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
 
     </section>



     <div className="personal-form-body">
        <main className="personal-form-container">
        <section className="personal-form-section">
          <h2>Personal Information</h2>
          <form encType="multipart/form-data" method="POST" action="/cook/documents" onSubmit={submit} className="personal-form">
        <label for="other">Other</label>
        <input type="file" name="document" multiple onChange={(e) => fileSelected(e)} placeholder="Other" accept=".pdf" /> <br />


        <a href="/submit"><button className="applicationBtn">Apply</button></a>

      </form>
        </section>
        </main>
      </div>

</>
    );
  };
  
  export default CookDashboard;