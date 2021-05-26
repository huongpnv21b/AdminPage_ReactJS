import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect, BrowserRouter,Switch, Route} from 'react-router-dom';

import Update from './components/Update.js';
import Add from './components/Add.js';
import Dashboard from './components/Dashboard.js';
import Trucker from './components/Trucker.js';
import Promotion from './components/Promotion.js';
import Sender from './components/Sender.js';
import Login from './components/Login.js';
import ProfileAdmin from './components/ProfileAdmin.js';
import Header from './components/Header.js';
import OrderNew from './components/OrderNew.js';
import TruckerTempt from './components/TruckerTempt.js';
import Vehicle from './components/Vehicle.js';
import OrderProcessing from './components/OrderProcessing.js';
import OrderCompleted from './components/OrderCompleted.js';
import NotFound from './components/NotFound.js';
export default class App1 extends Component {
    
    render() {

        return (

            <BrowserRouter>
                <Switch>
                <Route exact path='/dashboard' component={ Dashboard } /> 
                <Route exact path='/orderProcessing' component={ OrderProcessing } />
                <Route exact path='/orderNew' component={ OrderNew } />
                <Route exact path='/orderCompleted' component={ OrderCompleted } />
                <Route exact path='/trucker' component={ Trucker } />
                <Route exact path='/sender' component={ Sender } />
                <Route exact path='/promotion' component={ Promotion } />
                <Route exact path='/update/:id' component={ Update } />
                <Route exact path='/add' component={ Add } />
                <Route exact path='/header' component={ Header } />
                <Route exact path='/profile' component={ ProfileAdmin } />
                <Route exact path='/truckerTempt' component={ TruckerTempt } />
                <Route exact path='/truck' component={ Vehicle } />
                <Route exact path='/' component={ !localStorage.phone||localStorage.phone!="0981536770"? Login:Dashboard } />
                <Route path="" component={NotFound} /> // empty ""
                <Route path="*" component={NotFound} /> // star *
                <Route component={NotFound} /> // without path
                </Switch>
            </BrowserRouter>
            
        )
    }
}


