import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Menu';
import Header from './Header';
import {Redirect,Link,NavLink} from 'react-router-dom';
import Modal, {closeStyle} from 'simple-react-modal';
export default class TruckerTempt extends Component{
    constructor(props){
        super(props)
        this.state={
            trucker_tempt:[],
            roles:[],
            keyword:"",
        }
    }
    componentDidMount(){
        Axios({
            methos:'GET',
            url:"https://api-gogo.herokuapp.com/api/trucker/tempt",
            data:null
        }).then (res=>{
            this.setState({
                trucker_tempt:res.data
            });
        }).catch(err=>{
            console.log(err);
        });
        }
    
        onDeleted=(id)=>{
            console.log(id);
            var{trucker_tempt}=this.state;
            Axios({
                method:'DELETE',
                url:`https://api-gogo.herokuapp.com/api/trucker/delete/${id}`,
                data:null
            }).then(res =>{
                if(res.status === 204){
                    var index = this.findIndex(trucker_tempt, id);
                    if(index !== -1){
                        trucker_tempt.splice(index,1);
                        this.setState({
                            trucker_tempt:trucker_tempt
                        });
                        toast.success("Delete Trucker successfully",{
                            // componentDidMount();
                        })
                    }
                }
            });
            
        }

        findIndex =(trucker_tempt, id) =>{
            var {trucker_tempt} = this.state;
            var result = -1;
            trucker_tempt.forEach((trucker_tempts, index) =>{
                if(trucker_tempts.id === id){
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
         var truckers=this.state.truckers;
        var { trucker_tempt,keyword } = this.state;
        let search = this.state.trucker_tempt.filter(
            (trucker_tempts) =>{
              return trucker_tempts.full_name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
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
                <div class="tabOrder">
                    <ul>
                        <li> <Link to={'/checkoutTrucker'} className="orderNew">Checkout Account </Link></li>
                    </ul>
                </div>
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
                            <th>Detail</th>
                            <th>Status</th>
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

    show(){
        this.setState({show: true})
      }

      close(){
        this.setState({show: false})
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
                            <td><img style={{ width:"70px" }} src={this.props.trucker.avatar} alt="Not found image" /></td>
                            <td><i style={{ fontSize:'45px'}} class="fa fa-clipboard-list" onClick={this.show.bind(this)} ></i></td>
                            <td><button  class="button buttonDelete" type="submit">Check</button></td>
                        </tr>
                    
                       
                    </tbody> 
                    
        
        );
    }
}
