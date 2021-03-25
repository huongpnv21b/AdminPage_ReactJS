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
                password: password
            }
        }).then((response) => {
            console.log(response.status);
            if(response.data.role==3){
                this.setState({loggedIn : true})
                localStorage.setItem('phone', phone);  
            }
            else{
                toast.error("Đăng nhập thất bại", {
                })
            }
          
          }
          )
          .catch((response) => {
            if (response.status == undefined) {
                console.log(response.error)
                toast.error("Đăng nhập thất bại", {
                })
            }});


    }

    render() {
        if (this.state.loggedIn) {
            toast.success("Đăng nhập thành công", {
          })
          return <Redirect to="/dashboard"/>;
        }
        return (
            <div className="to">
                <form class="form" onSubmit={this.onSave}>
                    <img  class="img" src="https://static.thenounproject.com/png/99475-200.png"></img>
                    <h3 class="titleLogin">Login</h3>
                    <label  class="lbPhone" >Phone</label>
                    <input type="text" value={this.state.username} onChange={this.onChange} required autofocus  name="phone"  />
                    <label class="lbPass" >Password</label>
                    <input type="password" class="ipPass"value={this.state.username} onChange={this.onChange}  required name="password" maxLength={50} />
                    <div class="custom-control">
                        <input type="checkbox" class="checkbox" id="customCheck1" />
                        <label class="pass-label" htmlFor="customCheck1">Nhớ mật khẩu</label>
                    </div>
                    <button id="submit" type="submit" name="submit" value="Login">Login</button>
                </form>
                <br />
            </div>
        )
    }
}

