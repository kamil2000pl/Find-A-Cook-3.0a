import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminCookDisplay.css";
import { Link } from "react-router-dom";

const AdminCookDisplay = () => {
	const [cooks, setCooks] = useState([]);
  
    useEffect(() => {
      fetchCooks();
    }, []);
  
    const fetchCooks = async () => {
      try {
        const response = await axios.get("https://findacook-server.onrender.com/api/cook/allcooks");
        setCooks(response.data.cooks);
      } catch (error) {
        console.error("Error fetching cooks:", error);
      }
    };
    return(
    <>

<div className="container">
<main>
			{/* <h1>Users</h1> */}
			<table className="adminCookDisplay">
				<thead>
					<tr>
						<th>Name</th>
						<th>Application Status</th>
						<th>Verified</th>
					</tr>
				</thead>
				<tbody>
					{/* <tr>
						<td>John Doe</td>
						<td>Jan 1, 2023</td>
						<td>Yes</td>
					</tr> */}
					{cooks.map((cook, index) => (
            <tr key={index}>
              <td>{cook.cook_first_name} {cook.cook_last_name}</td>
			  <td>{cook.application_status}</td>
			  <td>
				<img src='../images/tick.jpg' className="applicationIcon"/>
			  <img src='../images/reject.jpg' className="applicationIcon"/>
			  </td>

            </tr>
          ))}
				</tbody>
			</table>
		</main>
        </div>
    </>
    )
   
}

export default AdminCookDisplay