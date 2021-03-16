import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
class Promotion extends Component{
    constructor(props){
        super(props)
        this.state={
            promotions:[],
            keyword:"",
        }
    }
    componentDidMount(){
        Axios({
            methos:'GET',
            url:"http://localhost:8000/api/list_promotion",
            data:null
        }).then (res=>{
            this.setState({
                promotions:res.data
            });
        }).catch(err=>{
            console.log(err);
        });
        }
        onDeleted=(id)=>{
            console.log(id);
            var{promotions}=this.state;
            // var{history}=this.prop;
            Axios({
                method:'DELETE',
                url:`http://localhost:8000/api/delete_promotion/${id}`,
                data:null
            }).then(res =>{
                if(res.status ===200){
                    var index=this.finIndex(promotions,id);
                    if(index !== -1){
                        promotions.splice(index,1);
                        this.setState({
                            promotions:promotions
                        });
                        toast.success("Xoa san pham thanh cong",{
                            // componentDidMount();
                        })
                        
                    }
                }
                // history.componentDidMount();
            });
            
        }
    render(){
        var promotions=this.state.promotions;
        return(

            <div class="orderTable">
            <h2 style={{ marginLeft:'400px', color:'black',textShadow:'2px 2px 2px #cc0000',fontsize:'40px',fontweight: 'bold'}}> Danh sach các đơn hàng </h2>
            <div className = "row">
                <button class="styled-button" onClick={this.addEmployee}><Link to={'/Add'} className="nav-link">Add </Link> <i class="fas fa-plus"></i></button>
            </div>
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th> Start_Time</th>
                        <th>End_Time</th>
                        <th>Min_Value</th>
                        <th>Max_Value</th>
                        <th>Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                        promotions.map((promotion,index)=>
                        <Item 
                            key={index} promotion={promotion}
                            onDelete={this.onDeleted}
                        ></Item>
                        
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
                            <td>{this.props.promotion.id}</td>
                            <td>{this.props.promotion.name}</td>
                            <td>{this.props.promotion.code}</td>
                            <td>{this.props.promotion.start_time}</td>
                            <td>{this.props.promotion.end_time}</td>
                            <td>{this.props.promotion.min_value}</td>
                            <td>{this.props.promotion.max_value}</td>
                            <td>{this.props.promotion.value}</td>
                            <td><button  class="red-button" type="submit" onClick ={ () =>this.props.onDelete(this.props.promotion.id)}>Delete</button>
                            <button class="yellow-button"><Link to={"/update/"+this.props.promotion.id} class="nav-link">Edit</Link></button></td>

                        </tr>
                    
                    
                    </tbody> 
        
        );
    }
}
export default Promotion;