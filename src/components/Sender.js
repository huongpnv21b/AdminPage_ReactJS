import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Sender extends Component{
    constructor(props){
        super(props)
        this.state={
            senders:[],
            roles:[],
            keyword:"",
        }
    }
    componentDidMount(){
        Axios({
            methos:'GET',
            url:"http://localhost:8000/api/list_sender",
            data:null
        }).then (res=>{
            this.setState({
                senders:res.data
            });
        }).catch(err=>{
            console.log(err);
        });
        }
    
        onDeleted=(id)=>{
            console.log(id);
            var{senders}=this.state;
            Axios({
                method:'DELETE',
                url:`http://localhost:8000/api/delete_user/${id}`,
                data:null
            }).then(res =>{
                if(res.status ===200){
                    var index=this.finIndex(senders,id);
                    if(index !== -1){
                        senders.splice(index,1);
                        this.setState({
                            senders:senders
                        });
                        toast.success("Xoa san pham thanh cong",{
                            // componentDidMount();
                        })
                    }
                }
            });
            
        }
    render(){
        var senders=this.state.senders;
        return(
           
              <div class="orderTable">
                <h2 style={{ marginLeft:'400px', color:'black',textShadow:'2px 2px 2px #cc0000',fontsize:'40px',fontweight: 'bold'}}> Danh sach các tai xe</h2>
                <table class="styled-table">
                    <thead>
                        <tr>
                         
                            <th>Full Name</th>
                            <th>Id_card</th>
                            <th>Birthday</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Avatart</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    

{
                        senders.map((sender,index)=>
                        <Item 
                            key={index} sender={sender}
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
                        
                            <td>{this.props.sender.full_name}</td>
                            <td>{this.props.sender.id_card}</td>
                            <td>{this.props.sender.birthday}</td>
                            <td>{this.props.sender.address}</td>
                            <td>{this.props.sender.email}</td>
                            <td>{this.props.sender.phone}</td>
                            <td><img style={{ width:"70px"}} src={this.props.sender.avatar} alt="Not found image" /></td>
                            <td>{this.props.sender.role}</td>
                            <td><button  className="btn btn-danger" type="submit" onClick ={ () =>this.props.onDelete(this.props.sender.id)}>Delete</button></td>
                        </tr>
                    
                    
                    </tbody> 
        
        );
    }
}
export default Sender;