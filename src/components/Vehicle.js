import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import {Redirect} from 'react-router-dom';
import Header from './Header';
  class Vehicle extends Component{
    constructor(props){
        super(props)
        this.state={
            trucks:[],
            keyword:"",
        }
    }
    componentDidMount(){
        Axios({
            methos:'GET',
            url:"https://api-gogo.herokuapp.com/api/truck/list",
            data:null
        }).then (res=>{
            this.setState({
                trucks:res.data
            });
        }).catch(err=>{
            console.log(err);
        });
        }
        
        onDeleted=(id)=>{
            var{trucks}=this.state;
            Axios({
                method:'DELETE',
                url:`https://api-gogo.herokuapp.com/api/truck/delete/${id}`,
                data:null
            }).then(res =>{
                if(res.status === 204){
                    var index = this.findIndex(trucks, id);
                    if(index !== -1){
                        trucks.splice(index,1);
                        this.setState({
                            trucks:trucks
                        });
                        toast.success("Delete Truck successfully",{

                        })
                    }
                }
            });
            
        }

        findIndex =(trucks, id) =>{
            var {trucks} = this.state;
            var result = -1;
            trucks.forEach((truck, index) =>{
                if(truck.id === id){
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
        // var trucks=this.state.trucks;
        var { trucks,keyword } = this.state;
        var stt = 1;
        let search = this.state.trucks.filter(
            (truck) =>{
              return (truck.payload.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 || truck.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1||
               truck.description.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1  );
            }
          );
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
                        <div class="left__side">
                            <input type="text" className="search" name="keyword"  value={keyword} onChange ={ this.onChange} type="search" placeholder='Search' aria-label="Search" />
                        </div>                  
                    </div>
                </div>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Unit_price</th>
                            <th>Bonus_price</th>
                            <th class="image1">Image</th>
                            <th>Payload</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                   
                    {
                          search.map((truck,index)=>
                        <Item  id={stt++}
                            key={index} truck={truck}
                            onDelete={this.onDeleted}
                        ></Item>
                        )}
                  
                  
                 
                </table>

            </div>
            </div>
        );
    }
}

class Item extends Component {

    onDelete = (id) =>{
		if (confirm('Do you really to remove this truck ?')) { //eslint-disable-line
         this.props.onDelete(id);
      }
	}
    
    render(props) {
        return (
               <tbody>
                        <tr>
                            <td>{this.props.id}</td>
                            <td>{this.props.truck.name}</td>
                            <td>{this.props.truck.description}</td>
                            <td>{this.props.truck.unit_price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}</td>
                             <td>{this.props.truck.bonus_price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}</td>                      
                            <td class="image2"><img class="image" src={this.props.truck.image}></img></td>
                            <td>{this.props.truck.payload}</td>

                            <td><i class="fas fa-trash-alt" style={{color:"red"}}type="submit" onClick ={ () =>this.onDelete(this.props.truck.id)}></i></td>
                        </tr>
                    
                </tbody> 
        
        );
    }
}
export default Vehicle;
