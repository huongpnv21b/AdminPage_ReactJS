import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import {Redirect} from 'react-router-dom';
import Header from './Header';
import _ from 'lodash';
class OrderCompleted extends Component{
    constructor(props){
        super(props)
        this.state={
            orderCompleted:[],
            keyword:"",
        }
    }
    componentDidMount(){
        Axios({
            methos:'GET',
            url:'https://api-gogo.herokuapp.com/api/order/list',
            data:null
        }).then (res=>{
            this.setState({
                orderCompleted:res.data
            });
        }).catch(err=>{
            console.log(err);
        });
    }
        onDeleted=(id)=>{
            console.log(id);
            var{orderCompleted}=this.state;
            Axios({
                method:'DELETE',
                url:`https://api-gogo.herokuapp.com/api/order/delete/${id}`,
                data:null
            }).then(res =>{
                if(res.status === 204){
                    var index = this.findIndex(orderCompleted, id);
                    if(index !== -1){
                        orderCompleted.splice(index,1);
                        this.setState({
                            orderCompleted:orderCompleted
                        });
                        toast.success("Delete Order Complete successfully",{
                        })
                    }
                }
            });
            
        }

        findIndex =(orderCompleted, id) =>{
            var {orderCompleted} = this.state;
            var result = -1;
            orderCompleted.forEach((order, index) =>{
                if(order.id === id){
                    result =index;
                }
            });
            return result;
        }
        
    render(){
        var orderCompleted=this.state.orderCompleted;
        var stt=1
        if(!localStorage.phone){
            return <Redirect to="/"/>;
          }
        return(
            
            <div class="container">
                <Menu />
                
                <div class="orderTable">
                <Header />
                <div class="primary__bar">
                    <div class="right__side">
                        <div class="tabOrder">
                            <ul>
                                <li> <Link to={'/orderNew'} className="button buttonDelete ">New Orders </Link></li>
                                <li><Link to={'/orderProcessing'} class="button buttonProcess">Processing Orders</Link></li>
                                <li><Link to={'/orderCompleted'} class="button buttonComplete1 active3">Completed Orders</Link></li>
                            </ul>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    {(() => {
                                if (_.some(orderCompleted, { type: 3 })) {
                                    return orderCompleted.map((item, index) => {
                                      if (item.type === 3) {
                                        return <Item id={stt++}
                                                 key={index} order={item}
                                               onDelete={this.onDeleted} />
                                      }
                                    });
                                  } else {
                                    return <p>No order</p>;
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
		if (confirm('Do you really want to remove this order?')) { //eslint-disable-line
         this.props.onDelete(id);
      }
	}
    
    render(props) {
        // if (this.props.order.type === 1)  {
            return (
                <tbody>  
                    
                   <tr>
                            <td>{this.props.id}</td>
                            <td>{JSON.parse(this.props.order.send_from).address}, {JSON.parse(this.props.order.send_from).city}</td>
                            <td>{JSON.parse(this.props.order.send_to).address}, {JSON.parse(this.props.order.send_to).city}</td>
                            <td>{this.props.order.time_send}</td>
                            <td>{this.props.order.name}</td>
                            <td>{this.props.order.mass}</td>                       
                            <td>{this.props.order.price}</td>
                            <td>{this.props.order.truck}</td>
                            <td class="pp">{JSON.parse(this.props.order.sender_info).name}</td>
                            <td class="pa">Name: {JSON.parse(this.props.order.sender_info).name}<br></br>
                                            Phone: {JSON.parse(this.props.order.sender_info).phone} <br></br> 
                                            Note: {JSON.parse(this.props.order.sender_info).note} 
                                           </td>
                            <td class="pp"> {JSON.parse(this.props.order.receiver_info).name}</td>
                            <td class="pa">Name: {JSON.parse(this.props.order.receiver_info).name}<br></br>
                                            Phone: {JSON.parse(this.props.order.receiver_info).phone} <br></br> 
                                            Note: {JSON.parse(this.props.order.receiver_info).note} 
                                           </td>
                            <td><button  class="button buttonAdd" type="submit" onClick ={ () =>this.onDelete(this.props.order.id)}>Delete</button></td>
                        </tr>
                    </tbody> 
            )
        }
    

}


export default OrderCompleted;


