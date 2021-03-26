import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import {Redirect} from 'react-router-dom';
import Header from './Header';
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
            url:"https://api-gogo.herokuapp.com/api/order/new",
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
                        toast.success("Delete Order successfully",{
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
        if(!localStorage.phone){
            return <Redirect to="/"/>;
          }
        return(
            
            <div class="container">
                <Menu />
                
                <div class="orderTable">
                <Header />
                <div class="tabOrder">
                    <ul>
                        <li> <Link to={'/orderNew'} className="button buttonDelete">Order New </Link></li>
                        <li><a href="#news">Order Complete</a></li>
                    </ul>
                </div>
                <h2 class="title_table"> List Order New</h2>
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
                        orderNew.map((order,index)=>
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



export default OrderNew;