import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect, BrowserRouter,Switch, Route} from 'react-router-dom';

import Update from './components/Update.js';
import Add from './components/Add.js';
import Dashboard from './components/Dashboard.js';
import Order from './components/Order.js';
import Trucker from './components/Trucker.js';
import Promotion from './components/Promotion.js';
import Sender from './components/Sender.js';
import Login from './components/Login.js';
import ProfileAdmin from './components/ProfileAdmin.js';
import Header from './components/Header.js';
import OrderNew from './components/OrderNew.js';
import CheckoutTrucker from './components/CheckoutTrucker.js';

export default class App1 extends Component {
    
    render() {

        return (

            <BrowserRouter>
                <Switch>
                <Route path='/dashboard' component={ Dashboard } /> 
                <Route path='/order' component={ Order } />
                <Route path='/trucker' component={ Trucker } />
                <Route path='/sender' component={ Sender } />
                <Route path='/promotion' component={ Promotion } />
                <Route path='/update/:id' component={ Update } />
                <Route path='/add' component={ Add } />
                <Route path='/header' component={ Header } />
                <Route path='/orderNew' component={ OrderNew } />
                <Route path='/profile' component={ ProfileAdmin } />
                <Route path='/checkoutTrucker' component={ CheckoutTrucker } />
                <Route exact path='/' component={ Login } />
                </Switch>
            </BrowserRouter>
            
        )
    }
}


