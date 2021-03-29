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
  render() {
    return (
      <div id="sidebar">
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

        <div class="sidebar__menu">
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

          <NavLink
            exact
            to={"/order"}
            className="nav-link"
            activeClassName="nav-active"
          >
            {/* <a href="#">Order</a> */}
            <div class="sidebar__link">
              <i class="fa fa-list"></i>
              Order
            </div>
          </NavLink>

          <NavLink
            exact
            to={"/promotion"}
            className="nav-link"
            activeClassName="nav-active"
          >
            <div class="sidebar__link">
              <i class="fa fa-money"></i>
              Promotion
            </div>
          </NavLink>

          <h2>User</h2>
          <NavLink
            exact
            to={"/trucker"}
            className="nav-link"
            activeClassName="nav-active"
          >
            <div class="sidebar__link">
              <i class="fa fa-users"></i>
              Trucker
              {/* <a href="#">Trucker Management</a> */}
            </div>
          </NavLink>

          <NavLink
            exact
            to={"/sender"}
            className="nav-link"
            activeClassName="nav-active"
          >
            <div class="sidebar__link">
              <i class="fa fa-user"></i>
              Sender
              {/* <a href="#">Sender Management</a> */}
            </div>
          </NavLink>

          <h2>Payroll</h2>
          <NavLink
            exact
            to={"/chart"}
            className="nav-link"
            style={{ fontFamily: "Raleway" }}
            activeClassName="nav-active"
          >
            <div class="sidebar__link">
              <i class="fa fa-money"></i>
              Payment
            </div>
          </NavLink>

          <Link onClick={this.Logout} to={"/"} className="nav-link">
            <div class="sidebar__logout">
              <a>
                <i class="fa fa-power-off"></i> SIGN OUT
              </a>
            </div>
          </Link>

          {/* <Link to={'/profile'} className="nav-link">
                <div class="sidebar__link">
                  <i class="fa fa-user"></i>
                  Profile
                </div>
                </Link> */}
        </div>
      </div>
    );
  }
}

export default Menu;
