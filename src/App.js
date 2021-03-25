import logo from './logo.svg';
// import './App.css';
// import { Route } from 'react-router';
import React, { Component } from 'react';


import Update from './components/Update.js';
import Add from './components/Add.js';
import Dashboard from './components/Dashboard.js';
import Order from './components/Order.js';
import User from './components/Trucker.js';
import Promotion from './components/Promotion.js';
import Sender from './components/Sender.js';
import Login from './components/Login.js';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        
        <div class="container">
      <nav class="navbar">
        <div class="nav_icon" onclick="toggleSidebar()">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div class="navbar__left">
          <a href="#">Subscribers</a>
          <a href="#">Video Management</a>
          <a class="active_link" href="#">Admin</a>
        </div>
        <div class="navbar__right">
          <a href="#">
            <i class="fa fa-search" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
          </a>
          <a href="#">
            <img width="30" src="assets/avatar.svg" alt="" />
                 </a>
        </div>
      </nav>

      <Switch>
        <Route exact path='/' component={ Dashboard } /> 
        <Route path='/dashboard' component={ Dashboard } /> 
        <Route path='/order' component={ Order } />
        <Route path='/user' component={ User } />
        <Route path='/sender' component={ Sender } />
        <Route path='/promotion' component={ Promotion } />
        <Route path='/update/:id' component={ Update } />
        <Route path='/add' component={ Add } />
        <Route path='/login' component={ Login } />
       
     
      </Switch>
         
   

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
          <div class="sidebar__link active_menu_link">
            <i class="fa fa-home"></i>
            <Link to={'/'} className="nav-link">Dashboard</Link>
          </div>
          <div class="sidebar__link">
            <i class="fa fa-list"></i>
            <Link  class="sidebar__link active_menu_link" to={'/order'} className="nav-link">Order</Link>
            {/* <a href="#">Order</a> */}
          </div>
          <div class="sidebar__link">
            <i class="fa fa-money"></i>
            <Link to={'/promotion'} className="nav-link">Promotion</Link>
            {/* <a href="#">Promotion</a> */}
          </div>
          <h2>User</h2>
          <div class="sidebar__link">
            <i class="fa fa-users"></i>
            <Link to={'/user'} className="nav-link">Trucker Management</Link>
            {/* <a href="#">Trucker Management</a> */}
          </div>
          <div class="sidebar__link">
            <i class="fa fa-user"></i>
            <Link to={'/sender'} className="nav-link">Sender Management</Link>
            {/* <a href="#">Sender Management</a> */}
          </div>
          
          
        <h2>PAYROLL</h2>
          <div class="sidebar__link">
            <i class="fa fa-money"></i>
            <Link to={'/login'} className="nav-link">Login</Link>
          </div>   {/*
          <div class="sidebar__link">
            <i class="fa fa-briefcase"></i>
            <a href="#">Paygrade</a>
          </div> */}
          <div class="sidebar__logout">
            <i class="fa fa-power-off"></i>
            <a href="#">Log out</a>
          </div>
        </div>
      </div>
    </div>

    

  
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="script.js"></script>
    
    </Router>
  );}
}

export default App;
