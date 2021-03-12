import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
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
            url:"http://localhost:8000/api/list_order",
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
                url:`http://localhost:8000/api/delete_order/${id}`,
                data:null
            }).then(res =>{
                if(res.status ===200){
                    var index=this.finIndex(orders,id);
                    if(index !== -1){
                        orders.splice(index,1);
                        this.setState({
                            orders:orders
                        });
                        toast.success("Xoa san pham thanh cong",{
                            // componentDidMount();
                        })
                    }
                }
            });
            
        }
        
    render(){
        var orders=this.state.orders;
        return(
            <div class="orderTable">
                <h2 style={{ marginLeft:'400px', color:'black',textShadow:'2px 2px 2px #cc0000',fontsize:'40px',fontweight: 'bold'}}> Danh sach các đơn hàng </h2>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Send_from</th>
                            <th>Send_to</th>
                            <th>Time Send</th>
                            <th>Name</th>
                            <th>Mass</th>
                            <th>Unit</th>
                            <th>Car_type</th>
                            <th>Note</th>
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
        );
    }
}

class Item extends Component {

    
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
                            <td>{this.props.order.car_type}</td>
                            <td>{this.props.order.note}</td>
                            <td>{this.props.order.send_from}</td>
                            <td>{this.props.order.id_user}</td>
                            <td><button  className="btn btn-danger" type="submit" onClick ={ () =>this.props.onDelete(this.props.order.id)}>Delete</button></td>
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