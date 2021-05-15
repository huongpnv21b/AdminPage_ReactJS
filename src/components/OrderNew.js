import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import {Redirect} from 'react-router-dom';
import Header from './Header';
import _ from 'lodash';
class OrderNew extends Component{
    constructor(props){
        super(props)
        this.state={
            orderNew:[],
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
                orderNew:res.data
            });
        }).catch(err=>{
            console.log(err);
        });
    }
        onDeleted=(id)=>{
            console.log(id);
            var{orderNew}=this.state;
            Axios({
                method:'DELETE',
                url:`https://api-gogo.herokuapp.com/api/order/delete/${id}`,
                data:null
            }).then(res =>{
                if(res.status === 204){
                    var index = this.findIndex(orderNew, id);
                    if(index !== -1){
                        orderNew.splice(index,1);
                        this.setState({
                            orderNew:orderNew
                        });
                        toast.success("Delete Order New successfully",{
                        })
                    }
                }
            });
            
        }

        findIndex =(orderNew, id) =>{
            var {orderNew} = this.state;
            var result = -1;
            orderNew.forEach((order, index) =>{
                if(order.id === id){
                    result =index;
                }
            });
            return result;
        }
        
    render(){
        var orderNew=this.state.orderNew;
        var stt = 1;
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
                        <div class="status_order">
                            {/* <ul>
                                <li> <Link to={'/orderNew'} className="button buttonDelete active1">New Orders </Link></li>
                                <li><Link to={'/orderProcessing'} class="button buttonProcess">Processing Orders</Link></li>
                                <li><Link to={'/orderCompleted'} class="button buttonComplete">Completed Orders</Link></li>
                            </ul> */}
                            <select name="cars" id="cars" >
                                <option>Status Order</option>
                                <Link to={'/orderNew'} className="button buttonDelete active1"><option value="saab">New Orders </option></Link>
                                <Link to={'/orderProcessing'} class="button buttonProcess"><option value="opel">Processing Orders</option></Link>
                                <option value="audi">Completed Orders</option>
                            </select>
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
                                if (_.some(orderNew, { type: 1 })) {
                                    return orderNew.map((item, index) => {
                                      if (item.type === 1) {
                                        return <Item id={stt++}
                                                 key={index} order={item}
                                               onDelete={this.onDeleted} />
                                      }
                                    });
                                  } else {
                                    return <p>No order New</p>;
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


export default OrderNew;


