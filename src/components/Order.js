import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import {Redirect} from 'react-router-dom';
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
        if(!localStorage.phone){
            return <Redirect to="/"/>;
          }
        return(
            <div class="container">
                <Menu />
                <div class="orderTable">
                <h2 class="title_table"> List Orders </h2>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Send_from</th>
                            <th>Send_to</th>
                            <th>Time Send</th>
                            <th>Name</th>
                            <th>Mass</th>
                         
                            <th>Price</th>
                            <th>Car_type</th>
                            {/* <th>Note</th> */}
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                            {
                        orders.map((order,index)=>
                        <Item 
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
		if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
         this.props.onDelete(id);
      }
	}
    
    render(props) {
        return (
               <tbody>
                        <tr>
                            <td>{this.props.order.id}</td>
                            <td>{this.props.order.send_from}</td>
                            <td>{this.props.order.send_to}</td>
                            <td>{this.props.order.time_send}</td>
                            <td>{this.props.order.name}</td>
                            <td>{this.props.order.mass}</td>
                            
                            <td>{this.props.order.price}</td>
                            <td>{this.props.order.car_type}</td>
                            {/* <td>{this.props.order.note}</td> */}
                            <td>{this.props.order.full_name}</td>
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