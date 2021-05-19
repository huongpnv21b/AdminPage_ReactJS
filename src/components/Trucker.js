import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './Menu';
import Header from './Header';
import {Redirect,Link,withRouter} from 'react-router-dom';
import Modal, {closeStyle} from 'simple-react-modal';
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
                        toast.success("Trucker removed!",{
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
          myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");}
    render(){
        // var truckers=this.state.truckers;
        var { truckers,keyword } = this.state;
        let search = this.state.truckers.filter(
            (trucker) =>{
                return (trucker.full_name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1||trucker.phone.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1
                ||trucker.id_card.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1 ||trucker.address.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1
               ||trucker.email.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1);           }
          );
          if(!localStorage.phone){
            return <Redirect to="/"/>;
          }

        return(
            <div class="container">
                <Menu/>
              <div class="orderTable">
              <Header />
                <div className = "row">
                    <div class="primary__bar">
                        <div class="left__side">
                            <input type="text" className="search" name="keyword"  value={keyword} onChange ={ this.onChange} type="search" placeholder='Search' aria-label="Search" />
                            <div><p style={{color:"black", fontWeight:"bold",fontSize:"20px",float:"left"}}>List of Approved Trucker</p></div>
                        </div>

                            <div class="right__side right">
                                <div class="dropdowntrucker">
                                    <button onClick ={ () =>this.myFunction()} class="dropbtn ">Filter by status <i class="fa fa-caret-down"></i></button>
                                    <div id="myDropdown" class="dropdown-content" style={{right:0}}>
                                        <a href="#home"><Link to={'/trucker'}>Approved</Link></a>
                                        <a href="#home"><Link to={'/truckerTempt'} >Pending</Link></a>
                                    </div>
                                </div>
                            </div>                      
                    </div>
                </div>
                <table class="styled-table">
                    <thead>
                        <tr>
                         
                            <th>Full name</th>
                            <th>ID card</th>
                            <th>Date of birth</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Avatar</th>
                            <th>Detail</th>
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
    constructor(props){
        super(props)
        this.state={
            checkout:[]
        }
    }
    onDelete = (id) =>{
		if (confirm('Do you really want to remove this user?')) { //eslint-disable-line
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
                            <td><img style={{ width:"85px", height:"70px"}} src={this.props.trucker.avatar} alt="Not found image" /></td>
                            <td><i class="fa fa-clipboard-list" value ={this.props.trucker.id} onClick={this.show.bind(this)} ></i></td>
                            <td><i class="fas fa-trash-alt" style={{color:"red"}}type="submit" onClick ={ () =>this.onDelete(this.props.trucker.id)}></i>
                             </td>
                        </tr>
                        <Modal 
                             //overwrites the default background
                            containerStyle={{ width:'1200px',height:'auto', borderRadius:'20px'}} 
                                closeOnOuterClick={true}
                                show={this.state.show}
                                onClose={this.close.bind(this)}>
                            
                                <a class="hoverExit" onClick={this.close.bind(this)}><i class="fa fa-times" ></i></a>
                               
                                    <h2>Trucker credential</h2>
                                    <div className="cardd">
                                        <div className="cardds">
                                            <img  class="avatars" src={this.props.trucker.avatar} alt="Avatar"  />
                                            <div className="containerr">
                                                <div class="primary__bar">
                                                    <h5 class="left__side">Full name: </h5>
                                                    <h5 style={{fontWeight: "bolder"}} class="right__side"> {this.props.trucker.full_name}</h5> 
                                                </div>
                                                <div class="primary__bar">
                                                    <h5 class="left__side">ID card: </h5>
                                                    <h5 style={{fontWeight: "bolder"}} class="right__side"> {this.props.trucker.id_card}</h5> 
                                                </div>
                                                <div class="primary__bar">
                                                    <h5 class="left__side">Vehicle: </h5>
                                                    <h5 style={{fontWeight: "bolder"}} class="right__side">  {this.props.trucker.car_type}</h5> 
                                                </div>
                                                <div class="primary__bar">
                                                    <h5 class="left__side">License Plate: </h5>
                                                    <h5 style={{fontWeight: "bolder"}} class="right__side"> {this.props.trucker.license_plate}</h5> 
                                                </div>
                                                <div class="primary__bar">
                                                    <h5 class="left__side">Payload: </h5>
                                                    <h5 style={{fontWeight: "bolder"}} class="right__side"> {this.props.trucker.payload}</h5> 
                                                </div>
                                                
                                            </div>
                                          
                                            
                                        </div>
                                        <div class="license_card">
                                            <div class="title__bar">
                                                <h5 style={{fontWeight: "bolder"}}>ID card</h5>
                                            </div> 
                                            
                                            <div class="id_card">
                                                <div class="cards">
                                                    <p>Front</p>
                                                    <img  class="image" src={this.props.trucker.id_card_front}/>
                                                </div>
                                                <div class="cards">
                                                    <p>Back</p>
                                                    <img  class="image" src={this.props.trucker.id_card_back}/>
                                                </div>
                                            </div>
                                            <div class="title__bar">
                                                <h5 style={{fontWeight: "bolder"}}>Driving license</h5>
                                            </div> 
                                            <div class="id_card">
                                                <div class="cards">
                                                    <p>Front</p>
                                                    <img   class="image" src={this.props.trucker.license_front}/>
                                                </div>
                                                <div class="cards">
                                                    <p>Back</p>
                                                    <img   class="image" src={this.props.trucker.license_back}/>
                                                </div>
                                            </div> 
                                            <div class="title__bar">
                                                <h5 style={{fontWeight: "bolder"}}>Registration paper</h5>
                                            </div>
                                            <div class="id_card" style={{margin: "0 10%"}}>
                                                <img style={{width:'100%', height:'25%'}}  src={this.props.trucker.registration_paper}></img> 
                                            </div>
                                        </div>     
                                    </div>
                                
                            </Modal>
                    
                    </tbody> 
        
        );
    }
}
export default withRouter(Trucker) ;