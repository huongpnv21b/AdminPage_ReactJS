import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import {Redirect} from 'react-router-dom';
import Header from './Header';
class Order extends Component{
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
        onDeleted=(id)=>{
            console.log(id);
            var{orders}=this.state;
            Axios({
                method:'DELETE',
                url:`https://api-gogo.herokuapp.com/api/order/delete/${id}`,
                data:null
            }).then(res =>{
                if(res.status === 204){
                    var index = this.findIndex(orders, id);
                    if(index !== -1){
                        orders.splice(index,1);
                        this.setState({
                            orders:orders
                        });
                        toast.success("Delete Order successfully",{
                        })
                    }
                }
            });
            
        }

        findIndex =(orders, id) =>{
            var {orders} = this.state;
            var result = -1;
            orders.forEach((order, index) =>{
                if(order.id === id){
                    result =index;
                }
            });
            return result;
        }
        
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
                            {/* <div class="left__side">
                                <input type="text" className="search" name="keyword"  value={keyword} onChange ={ this.onChange} type="search" placeholder='Search' aria-label="Search" />
                            </div> */}
                            <div class="right__side">
                                <div class="tabOrder">
                                    <ul>
                                        <li> <Link to={'/orderNew'} className="button buttonDelete">New Orders</Link></li>
                                        <li><a href="#news" className="button buttonComplete">Completed Orders</a></li>
                                    </ul>
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
                            <th>Type</th>
                            <th>Vehicle</th>
                            <th>SenderInfor</th>
                            <th>ReceiverInfo</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                            {
                        orders.map((order,index)=>
                        <Item  id={stt++}
                            key={index} order={order}
                            onDelete={this.onDeleted}
                        ></Item>
                        // <p> {product.price}</p>  
                        )}
                  
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
                            <td>{this.props.order.price}</td>
                            <td>{this.props.order.type}</td>
                            <td>{this.props.order.truck}</td>
                            <td>{JSON.parse(this.props.order.sender_info).name}</td>
                            <td>{JSON.parse(this.props.order.receiver_info).name}</td>
                            <td><button  class="button buttonAdd" type="submit" onClick ={ () =>this.onDelete(this.props.order.id)}>Delete</button></td>
                        </tr>
                        {/* <tr class="active-row">
                            <td>Melissa</td>
                            <td>5150</td>
                        </tr> */}
                    
                </tbody> 
        
        );
    }
}



export default Order;