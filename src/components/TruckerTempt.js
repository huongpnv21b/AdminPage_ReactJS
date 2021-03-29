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
                
                <div style={{borderBottom: "1px solid lightgrey", marginBottom: "20px"}}>  
                    <h2 class="title_table"> List of Truckers Tempt</h2>
                </div>
                <div className = "row">
                        <div class="primary__bar">
                            <div class="left__side">
                                <input type="text" className="search" name="keyword"  value={keyword} onChange ={ this.onChange} type="search" placeholder='Search' aria-label="Search" />
                            </div>
                            <div class="right__side">
                                <div class="tabOrder">
                                    <ul>
                                        <li> <Link to={'/truckerTempt'} class="button buttonDelete">Checkout Account </Link></li>
                                    </ul>
                                </div>
                            </div> 
                        </div>  
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

    constructor(props){
        super(props)
        this.state={
            checkout:[]
        }
    }
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

      onCheck=(id)=>{
          console.log(id);
        Axios({
            method:'POST',
            url:`https://api-gogo.herokuapp.com/api/trucker/register/${id}`,
            data:null
        });
        
    }

    onRefuse=(id)=>{
      Axios({
          method:'DELETE',
          url:`https://api-gogo.herokuapp.com/api/trucker/refuse/${id}`,
          data:null
      });
      
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
                            <td><i style={{ fontSize:'45px'}} class="fa fa-clipboard-list" value ={this.props.trucker.id} onClick={this.show.bind(this)} ></i></td>
                            <Modal 
                             //overwrites the default background
                            containerStyle={{ width:'1200px',height:'auto', borderRadius:'20px'}} 
                                closeOnOuterClick={true}
                                show={this.state.show}
                                onClose={this.close.bind(this)}>
                            
                                <a  class="hoverExit" onClick={this.close.bind(this)}><i class="fa fa-times" ></i></a>
                               
                                    <h2>INFORMATION</h2>
                                    <div className="cardd">
                                        <div className="cardds">
                                            <img  class="avatars" src={this.props.trucker.avatar} alt="Avatar"  />
                                            <div className="containerr">
                                                <h5>Full Name: <b > {this.props.trucker.full_name}</b></h5> 
                                                <h5>Id Card : <b >     {this.props.trucker.id_card}</b></h5> 
                                                <h5> Car_type: <b > {this.props.trucker.car_type} </b></h5>
                                                <h5> License Plate: <b >{this.props.trucker.license_plate}</b></h5>
                                                <h5> Payload: <b >{this.props.trucker.payload} </b></h5>
                                                <h5> Registration_paper:</h5>
                                            </div>
                                          
                                            <img style={{width:'300px', height:'200px'}}  src={this.props.trucker.registration_paper}></img>
                                        </div>
                                        <div class="license_card">              
                                            
                                            <div class="id_card">
                                                <div class="cards">
                                                    <h4>Card Front</h4>
                                                    <img  class="image" src={this.props.trucker.id_card_front}/>
                                                </div>
                                                <div class="cards">
                                                    <h4>Card Back</h4>
                                                    <img  class="image" src={this.props.trucker.id_card_back}/>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div class="id_card">
                                                <div class="cards">
                                                    <h4>License Front</h4>
                                                    <img   class="image" src={this.props.trucker.license_front}/>
                                                </div>
                                                <div class="cards">
                                                    <h4>License Back</h4>
                                                    <img   class="image" src={this.props.trucker.license_back}/>
                                                </div>
                                            </div> 
                                        </div>     
                                    </div>
                                
                            </Modal>
                            <td class="checkout"><button  class="button buttonDelete" type="submit" onClick ={ () =>this.onCheck(this.props.trucker.id)}>Check</button>
                            <button  class="button buttonAdd" type="submit" onClick ={ () =>this.onRefuse(this.props.trucker.id)}>Refuse</button></td>
                        </tr>
                    
                       
                    </tbody> 
                    
        
        );
    }
}
