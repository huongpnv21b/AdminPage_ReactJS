import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Menu';
import Header from './Header';
import {Redirect} from 'react-router-dom';
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
            url:"https://api-gogo.herokuapp.com/api/trucker/list",
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
                url:`https://api-gogo.herokuapp.com/api/trucker/delete/${id}`,
                data:null
            }).then(res =>{
                if(res.status === 204){
                    var index = this.findIndex(truckers, id);
                    if(index !== -1){
                        truckers.splice(index,1);
                        this.setState({
                            truckers:truckers
                        });
                        toast.success("Delete Trucker successfully",{
                            // componentDidMount();
                        })
                    }
                }
            });
            
        }

        findIndex =(truckers, id) =>{
            var {truckers} = this.state;
            var result = -1;
            truckers.forEach((trucker, index) =>{
                if(trucker.id === id){
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
        // var truckers=this.state.truckers;
        var { truckers,keyword } = this.state;
        let search = this.state.truckers.filter(
            (trucker) =>{
              return trucker.full_name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
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
                <h2 class="title_table"> List Trucker</h2>
                <div className="mt-3 float-left">
                    <input className="search" name="keyword" value={keyword} onChange ={ this.onChange} type="search" placeholder="Search" aria-label="Search" />
                </div>  
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
                        search.map((trucker,index)=>
                        <Item 
                            key={index} trucker={trucker}
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
                        
                            <td>{this.props.trucker.full_name}</td>
                            <td>{this.props.trucker.id_card}</td>
                            <td>{this.props.trucker.birthday}</td>
                            <td>{this.props.trucker.address}</td>
                            <td>{this.props.trucker.email}</td>
                            <td>{this.props.trucker.phone}</td>
                            <td><img style={{ width:"70px"}} src={this.props.trucker.avatar} alt="Not found image" /></td>
                            <td>{this.props.trucker.name_role}</td>
                            <td><button  class="button buttonAdd" type="submit" onClick ={ () =>this.onDelete(this.props.trucker.id)}>Delete</button></td>
                        </tr>
                    
                    
                    </tbody> 
        
        );
    }
}
export default Trucker;