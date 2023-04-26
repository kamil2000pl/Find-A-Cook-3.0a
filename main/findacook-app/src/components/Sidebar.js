import { useState } from "react";
import "./AdminSidebar/Sidebar.css"
import axios from "axios";
import { useNavigate, Redirect } from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          const response = await axios.post("https://findacook-web.onrender.com/api/user/logout");
          if (response.data.status === "SUCCESS") {
            alert("Logged out successfully");
            // Redirect user to login or any other appropriate page
            navigate('/')
          } else {
            alert("Error logging out");
          }
        } catch (error) {
          console.error("Error logging out:", error);
          alert("Error logging out");
        }
      };

    return (
<>

<aside className="admin-sidenav">


        <div class="menu-items">
            <ul class="nav-links">
                <li><a href="/cookdashboard">
                    <span class="link-name">🧑🏻‍🍳 Dashboard</span>
                </a></li>
                <li><a href="/bookings">
                    <span class="link-name">📖 View Bookings</span>
                </a></li>
                <li><a href="/menu">
                    <span class="link-name">🍔 View Menu</span>
                </a></li>
                <li><a href="/addmenu">
                    <span class="link-name">🌭 Add Menu Item</span>
                </a></li>
            </ul>
            
            <ul class="logout-mode">
                <li><a href="/testapp">
                    <i class="uil uil-signout"></i>
                    <span class="link-name">Settings</span>
                </a></li>
                        <li>
                            <a href="#" onClick={handleLogout}>
                                <i class="uil uil-signout"></i>
                                <span class="link-name">Logout</span>
                            </a>
                        </li>

            </ul>
        </div>
    </aside>

</>

    )

}

export default Sidebar