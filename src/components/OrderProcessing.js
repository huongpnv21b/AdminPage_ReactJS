import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import {Redirect} from 'react-router-dom';
import Header from './Header';
import _ from 'lodash';
class OrderProcessing extends Component{
    constructor(props){
        super(props)
        this.state={
            orders:[],
            keyword:"",
        }
    }
    componentDidMount(){
        Axios({
            methos:'GET',
            url:"https://api-gogo.herokuapp.com/api/order/list",
            data:null
        }).then (res=>{
            this.setState({
                orders:res.data
            });
        }).catch(err=>{
            console.log(err);
        });

       

        }
        myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");}
    render(){
        var orders=this.state.orders;
        var stt = 1;
        if(!localStorage.phone){
            return <Redirect to="/"/>;
          }
        return(
            
            <div class="container">
                <Menu />
                
                <div class="orderTable">
                <Header />
                
                <div className = "row">
                    <div class="primary__bar">
                    <div class="left__side">
                            <div><p style={{color:"black", fontWeight:"bold",fontSize:"20px",float:"left"}}>List of processing orders</p></div>
                        </div>
                            <div class="right__side">
                            <div class="dropdown1">
                        
                                <button onClick ={ () =>this.myFunction()} class="dropbtn ">Filter by <i class="fa fa-caret-down"></i></button>
                                <div id="myDropdown" class="dropdown-content" style={{right:200}}>
                                    <a href="#home"><Link to={'/orderNew'} className="button buttonDelete ">New Orders </Link></a>
                                    <a href="#home"><Link to={'/orderProcessing'} class="button buttonProcess">Processing Orders</Link></a>
                                    <a href="#about"><Link to={'/orderCompleted'} class="button buttonComplete">Completed Orders</Link></a>
                                </div>
                            </div>
                            </div>  
                       
                    </div>  
                 </div>
                
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Mass</th>
                            <th>Price</th>
                            <th>Vehicle</th>
                            <th>SenderInfor</th>
                            <th>ReceiverInfo</th>
                        </tr>
                    </thead>
                    {(() => {
                                if (_.some(orders, { type: 2 })) {
                                    return orders.map((item, index) => {
                                      if (item.type === 2) {
                                        return <Item id={stt++}
                                                 key={index} order={item}
                                               onDelete={this.onDeleted} />
                                      }
                                    });
                                  } else {
                                    return <p>Don't have processing order </p>;
                                  }
                    })()}       
                </table>
            </div>
            </div>
        );
    }
}

class Item extends Component {

    onDelete = (id) =>{
		if (confirm('Do you really to remove this order ?')) { //eslint-disable-line
         this.props.onDelete(id);
      }
	}
    
    render(props) {
        return (
               <tbody>      
                    <tr>
                        <td>{this.props.id}</td>
                        <td>{JSON.parse(this.props.order.send_from).address}, {JSON.parse(this.props.order.send_from).city}</td>
                        <td>{JSON.parse(this.props.order.send_to).address}, {JSON.parse(this.props.order.send_to).city}</td>
                        <td>{this.props.order.time_send}</td>
                        <td>{this.props.order.name}</td>
                        <td>{this.props.order.mass}</td>                       
                        <td>{this.props.order.price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })}</td>
                        <td>{this.props.order.truck}</td>
                        <td class="pp">{JSON.parse(this.props.order.sender_info).name}</td>
                        <td class="pa">{JSON.parse(this.props.order.sender_info).name}<br></br>
                                     {/* Phone:{JSON.parse(this.props.order.sender_info).phone} <br></br> 
                                    Note:{JSON.parse(this.props.order.sender_info).note}  */}
                                           </td>
                        <td class="pp"> {JSON.parse(this.props.order.receiver_info).name}</td>
                        <td class="pa">{JSON.parse(this.props.order.receiver_info).name}<br></br>
                                    {/* Phone: {JSON.parse(this.props.order.receiver_info).phone} <br></br> 
                                     Note: {JSON.parse(this.props.order.receiver_info).note}  */}
                                           </td>                    </tr>                 
                </tbody> 
        );
    } 
}

export default OrderProcessing;