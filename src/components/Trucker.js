import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Trucker extends Component{
    constructor(props){
        super(props)
        this.state={
            truckers:[],
            roles:[],
            keyword:"",
        }
    }
    componentDidMount(){
        Axios({
            methos:'GET',
            url:"http://localhost:8000/api/list_trucker",
            data:null
        }).then (res=>{
            this.setState({
                truckers:res.data
            });
        }).catch(err=>{
            console.log(err);
        });
        }
    
        onDeleted=(id)=>{
            console.log(id);
            var{truckers}=this.state;
            Axios({
                method:'DELETE',
                url:`http://localhost:8000/api/delete_user/${id}`,
                data:null
            }).then(res =>{
                if(res.status ===200){
                    var index=this.finIndex(truckers,id);
                    if(index !== -1){
                        truckers.splice(index,1);
                        this.setState({
                            truckers:truckers
                        });
                        toast.success("Xoa san pham thanh cong",{
                            // componentDidMount();
                        })
                    }
                }
            });
            
        }
    render(){
        var truckers=this.state.truckers;
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
                        truckers.map((trucker,index)=>
                        <Item 
                            key={index} trucker={trucker}
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
                        
                            <td>{this.props.trucker.full_name}</td>
                            <td>{this.props.trucker.id_card}</td>
                            <td>{this.props.trucker.birthday}</td>
                            <td>{this.props.trucker.address}</td>
                            <td>{this.props.trucker.email}</td>
                            <td>{this.props.trucker.phone}</td>
                            <td><img style={{ width:"70px"}} src={this.props.trucker.avatar} alt="Not found image" /></td>
                            <td>{this.props.trucker.role}</td>
                            <td><button  className="btn btn-danger" type="submit" onClick ={ () =>this.props.onDelete(this.props.trucker.id)}>Delete</button></td>
                        </tr>
                    
                    
                    </tbody> 
        
        );
    }
}
export default Trucker;