import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Menu from './Menu';
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
            url:"https://api-gogo.herokuapp.com/api/promotion/list",
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
            var{promotions}=this.state;
            Axios({
                method:'DELETE',
                url:`https://api-gogo.herokuapp.com/api/promotion/delete/${id}`,
                data:null
            }).then(res =>{
                if(res.status === 204){
                    var index = this.findIndex(promotions, id);
                    console.log(index);
                    if(index !== -1){
                        promotions.splice(index,1);
                        this.setState({
                            promotions:promotions
                        });                      
                        toast.success("Removed successfully!",{                       
                        })
                        
                    }

                }
            });
            
        }


        
          findIndex =(promotions, id) =>{
              var {promotions} = this.state;
              var result = -1;
              promotions.forEach((promotion, index) =>{
                  if(promotion.id === id){
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
      
        // var promotions=this.state.promotions;
        var { promotions,keyword } = this.state;
        var stt = 1;
        let search = this.state.promotions.filter(
            (promotion) =>{
              return (promotion.code.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 || promotion.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 );
            }
          );
          if(!localStorage.phone){
            return <Redirect to="/"/>;
          }
        return(
            <div class="container">
            <Menu />
                    <div class="orderTable">
                    <h2 class="title_table"> List of Promotions </h2>
                    <div className = "row">
                        <div className="mt-3 float-left">
                            <input className="search" name="keyword" value={keyword} onChange ={ this.onChange} type="search" placeholder="Search" aria-label="Search" />
                        </div>     
                        <Link to={'/Add'} class="link"><button class="button buttonDelete">Add{' '}<i class="fa fa-plus-circle"></i></button> </Link> 
                    </div>
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>NO.</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Start time</th>
                                <th>End time</th>
                                <th>Min value</th>
                                <th>Max value</th>
                                <th>Value</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                                search.map((promotion,index)=>
                                <Item 
                                    id = {stt++}
                                    key={index} promotion={promotion}
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
		if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
         this.props.onDelete(id);
      }
	}
    
    render(props) {
        return (
               <tbody>
                        <tr>
                            <td>{this.props.id}</td>
                            <td>{this.props.promotion.name}</td>
                            <td>{this.props.promotion.code}</td>
                            <td>{this.props.promotion.start_time}</td>
                            <td>{this.props.promotion.end_time}</td>
                            <td>{this.props.promotion.min_value}</td>
                            <td>{this.props.promotion.max_value}</td>
                            <td>{this.props.promotion.value}</td>
                            <td><button class="button1 buttonAdd" type="submit"  onClick ={ () =>this.onDelete(this.props.promotion.id)}>Delete</button>
                            <Link to={"/update/"+this.props.promotion.id} class= "link"><button class="yellow-button">Edit</button></Link></td>

                        </tr>
                    
                    
                    </tbody> 
        
        );
    }
}
export default Promotion;