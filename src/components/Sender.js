import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Menu';
import Header from './Header';
import {Redirect} from 'react-router-dom';
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
            url:"https://api-gogo.herokuapp.com/api/sender/list",
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
                url:`https://api-gogo.herokuapp.com/api/sender/delete/${id}`,
                data:null
            }).then(res =>{
                if(res.status === 204){
                    var index = this.findIndex(senders, id);
                    if(index !== -1){
                        senders.splice(index,1);
                        this.setState({
                            senders:senders
                        });
                        toast.success("Sender removed!",{
                        })
                        this.componentDidMount();
                    }
                }
            });
            
        }

        
        findIndex =(senders, id) =>{
            var {senders} = this.state;
            var result = -1;
            senders.forEach((sender, index) =>{
                if(sender.id === id){
                    result =index;
                }
            });
            return result;
        }

        onChange = (event) =>{
            var target = event.target;
            var name = target.name;
            var value = target.value;
            this.setState({
              [name] : value
            });
          }

    render(){
        // var senders=this.state.senders;
        var { senders,keyword } = this.state;
        let search = this.state.senders.filter(
            (sender) =>{
              return (sender.full_name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1||sender.phone.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 ||
               sender.id_card.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 ||sender.address.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1
               ||sender.email.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1);
            }
          );
          if(!localStorage.phone){
            return <Redirect to="/"/>;
          }

        return(
            <div class="container">
             <Menu/>
              <div class="orderTable">
              <Header />
              {/* <div style={{borderBottom: "1px solid lightgrey",marginBottom: "20px"}}>  
                        <h2 class="title_table"> List of Senders</h2>
                    </div> */}
                <div class="primary__bar">
                    <input class="search" name="keyword" value={keyword} onChange ={ this.onChange} type="search" placeholder="Search" aria-label="Search" />
                </div>  
                <table class="styled-table">
                    <thead>
                        <tr>
                         
                            <th>Full name</th>
                            <th>ID card</th>
                            <th>Birthday</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Avatar</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    

{
                        search.map((sender,index)=>
                        <Item 
                            key={index} sender={sender}
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
		if (confirm('Do you really want to remove this user?')) { //eslint-disable-line
         this.props.onDelete(id);
      }
	}
    render(props) {
        return (
               <tbody>
                        <tr>
                            <td width="auto">{this.props.sender.full_name}</td>
                            <td>{this.props.sender.id_card}</td>
                            <td>{this.props.sender.birthday}</td>
                            <td>{this.props.sender.address}</td>
                            <td>{this.props.sender.email}</td>
                            <td>{this.props.sender.phone}</td>
                            <td><img style={{ width:"85px", height:"70px"}} src={this.props.sender.avatar} alt="Not found image" /></td>
                            <td><i class="fas fa-trash-alt" style={{color:"red"}}type="submit" onClick ={ () =>this.onDelete(this.props.sender.id)}></i> </td>
                        </tr>
                    
                    
                    </tbody> 
        
        );
    }
}
export default Sender;