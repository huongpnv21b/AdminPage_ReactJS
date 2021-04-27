import React, { Component } from "react";
// import Axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();
class Menu extends Component {
  Logout = () => {
    localStorage.clear();
    toast.success("Signed out!", {});
  };
  myFunction() {
    var x = document.getElementById("sidebar");
    if (x.className === "sidebar__menu") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  render() {
    return (
      <div id="sidebar" className="s-layout">
      {/* Sidebar */}
      
      <div className="s-layout__sidebar">
        <div class="sidebar__title">
            <div class="sidebar__img">
              {/* <img src="Image/LOGO.PNG" alt="logo" /> */}
              <h2
                style={{
                  color: "#001747",
                  fontFamily: "Copperplate Gothic Light",
                }}
              >
                GOGO Dashboard
              </h2>
            </div>
            <i
              onclick="closeSidebar()"
              class="fa fa-times"
              id="sidebarIcon"
              aria-hidden="true"
            ></i>
         </div>
        <a className="s-sidebar__trigger" href="#0">
          <i className="fa fa-bars" />
        </a>
        <nav className="s-sidebar__nav">
          <ul>
            <li>
                <NavLink
                exact
                to={"/dashboard"}
                className="nav-link"
                activeClassName="nav-active"
            >
                <div class="sidebar__link">
                  <i class="fa fa-home"></i>
                  Dashboard
              </div>
              </NavLink>
            </li>
            <li>
            <NavLink
            exact
            to={"/truck"}
            className="nav-link"
            style={{ fontFamily: "Raleway" }}
            activeClassName="nav-active"
          >
             <div class="sidebar__link">
             <i class="fas fa-truck-moving"></i>
               Vehicle
             </div>
           </NavLink>
            </li>
            <li>
                <NavLink
                exact
                to={"/orderNew"}
                className="nav-link"
                activeClassName="nav-active"
              >
                <div class="sidebar__link">
                  <i class="fa fa-list"></i>
                  Order
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
               exact
               to={"/promotion"}
               className="nav-link"
               activeClassName="nav-active" >
               <div class="sidebar__link">
                <i class="fa fa-money"></i>
                 Promotion
               </div>
              </NavLink>
            </li>
            <li>
              <h2>User</h2>
               <NavLink
                 exact
                 to={"/trucker"}
                 className="nav-link"
                 activeClassName="nav-active">
                 <div class="sidebar__link">
                   <i class="fa fa-users"></i>
                   Trucker
                   {/* <a href="#">Trucker Management</a> */}
                 </div>
               </NavLink>
            </li>
            <li>
                <NavLink exact to={"/sender"}
                 className="nav-link"
                 activeClassName="nav-active" >
                 <div class="sidebar__link">
                   <i class="fa fa-user"></i>
                   Sender
                   {/* <a href="#">Sender Management</a> */}
                 </div>
               </NavLink>

            </li>
            <li>
            <Link onClick={this.Logout} to={"/"} className="nav-link">
                   <div class="sidebar__logout">
                     <a>
                       <i class="fa fa-power-off"></i> SIGN OUT
                     </a>
                   </div>
        </Link>
            </li>
          </ul>
          
        </nav>
        
      </div>
    </div>
      
    );
    
  }
  
}



export default Menu;
