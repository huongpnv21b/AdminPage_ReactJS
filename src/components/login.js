import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from 'react-router-dom';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            loggedIn: false,
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var type = target.type;
        var value = target.value;


        this.setState({
            [name]: value,
        });
    }
    onSave = (e) => {
        e.preventDefault();
        var { phone, password } = this.state;
        var { history } = this.props;
        Axios({
            method: 'POST',
            url: 'https://api-gogo.herokuapp.com/api/login',
            data: {
                phone: phone,
                password: password,
                token: "123456"
            }
        }).then((response) => {
            if(response.data.role==3){
                this.setState({loggedIn : true})
                localStorage.setItem('phone', phone); 
                window.location.reload();
            }
            else{
                toast.error("Login failed!", {
                })
            }
          
          }
          )
          .catch((response) => {
            if (response.status == undefined) {
                toast.error("Login failed!", {
                })
            }});


    }

    render() {
        if (this.state.loggedIn) {
            toast.success("Login successfully!", {
          })
          return <Redirect to="/"/>; 
          
        }
        return (
            <div className="to">
                <form class="form" onSubmit={this.onSave}>
                    {/* <img  class="img" src="https://static.thenounproject.com/png/99475-200.png"></img> */}
                    <h2 class="titleLogin">Login to dashboard</h2>
                    {/* <label for="username" class="lbPhone" >Phone</label> */}
                    <input value={this.state.username} onChange={this.onChange} required autofocus  name="phone"  placeholder="Phone number"/>
                    {/* <label for="pwd" class="lbPass" >Password</label> */}
                    <input type="password" value={this.state.username} onChange={this.onChange}  required name="password" maxLength={50} placeholder="Password"/>
                    <div class="custom-control">
                        <input type="checkbox" class="checkbox" id="customCheck1" />
                        <label class="pass-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                    <button id="submit" type="submit" name="submit" value="Login">Login</button>
                </form>
            </div>
        )
    }
}


