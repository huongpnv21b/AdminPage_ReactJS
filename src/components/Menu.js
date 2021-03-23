
import React, { Component } from 'react';
// import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink } from 'react-router-dom';
import {toast} from 'react-toastify';
toast.configure()
class Menu extends Component{
  Logout = () =>{
    localStorage.clear();
    toast.success("Đăng xuất thành công", {
    })
  }
    render(){
        return(

            <div id="sidebar">
      
            <div class="sidebar__title">
              <div class="sidebar__img">
                <img src="Image/logo.jpg" alt="logo" />
                <h2 style={{color: "red"}}>GOGO</h2>
              </div>
              <i
                onclick="closeSidebar()"
                class="fa fa-times"
                id="sidebarIcon"
                aria-hidden="true"
              ></i>
            </div>
    
            <div class="sidebar__menu">
              <Link to={'/dashboard'} className="nav-link">
                <div class="sidebar__link active_menu_link">
                  <i class="fa fa-home"></i>
                Dashboard
                </div>
              </Link>

              <Link  class="sidebar__link active_menu_link" to={'/order'} className="nav-link">
                {/* <a href="#">Order</a> */}
                <div class="sidebar__link">
                  <i class="fa fa-list"></i>
                  Order
                </div>
                </Link>

                <Link to={'/promotion'} className="nav-link">
              <div class="sidebar__link">
                <i class="fa fa-money"></i>
                Promotion
              </div>
              </Link>

              <h2>User</h2>
              <Link to={'/trucker'} className="nav-link">
                <div class="sidebar__link">
                  <i class="fa fa-users"></i>
                  Trucker Management
                  {/* <a href="#">Trucker Management</a> */}
                </div>
              </Link>

              <Link to={'/sender'} className="nav-link">
                <div class="sidebar__link">
                  <i class="fa fa-user"></i>
                  Sender Management
                  {/* <a href="#">Sender Management</a> */}
                </div>
                </Link>
              
            <h2>PAYROLL</h2>
              <div class="sidebar__link">
                <i class="fa fa-money"></i>
                <Link to={'/chart'} className="nav-link">Payment</Link>
              </div> 
              <Link onClick={this.Logout} to={'/'} className="nav-link">
                <div class="sidebar__logout">
                  <i class="fa fa-power-off"></i>
                  Logout
                </div>
              </Link>

              <Link to={'/profile'} className="nav-link">
                <div class="sidebar__link">
                  <i class="fa fa-user"></i>
                  Profile
                </div>
                </Link>
            </div>
          </div>
        )
    }
}
export default Menu;