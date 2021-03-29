import { render } from "react-dom/cjs/react-dom.development";
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink } from 'react-router-dom';
import {toast} from 'react-toastify';
import Axios from 'axios';
import ProfileAdmin from './ProfileAdmin';
import Modal, {closeStyle} from 'simple-react-modal';
toast.configure();

export default class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
    notifi:[],
    keyword:"",
  }
  }
  Logout = () =>{
    localStorage.clear();
    toast.success("Logout Successfully", {
    })
  }
  
  componentDidMount(){
      Axios({
          methos:'GET',
          url:"http://127.0.0.1:8000/api/notification/list",
          data:null
      }).then (res=>{
          this.setState({
            notifi:res.data
          });
      }).catch(err=>{
          console.log(err);
      });
     
  } 
 ///Modal
  show(){
    this.setState({show: true})
  }
  show1(){
    this.setState({show1: true})
  }
  close(){
    this.setState({show: false})
  }
  close1(){
    this.setState({show1: false})
  }
 
  ////Delete

  onDeleted=(id)=>{
    var{notifi}=this.state;
    Axios({
        method:'DELETE',
        url:`http://127.0.0.1:8000/api/notification/delete/${id}`,
        data:null
    }).then(res =>{
        if(res.status === 204){
            var index = this.findIndex(notifi, id);
            console.log(index);
            if(index !== -1){
              notifi.splice(index,1);
                this.setState({
                  notifi:notifi
                });                      
                toast.success("Promotion removed!",{                       
                })
                
            }

        }
    });
    
}
  findIndex =(notifi, id) =>{
      var {notifi} = this.state;
      var result = -1;
      notifi.forEach((notifis, index) =>{
          if(notifis.id === id){
              result =index;
          }
      });
      return result;
  }
render(){
   var notifi=this.state.notifi;
   var profile=this.state.profile;
    return(
      
            <div class="main__title">
                {/* <img src="assets/hello.svg" alt="" /> */}
                
                <div class="main__greeting" width="auto">
                  {/* <marquee  direction="right" >
                    <h1 style={{color:'#FF6347',marginLeft:'30px'}}>Hello GOGO </h1>
                    <p>Welcome to your admin dashboard</p>
                  </marquee> */}
                  
                </div>
                <div class="notifications">
                  {/* <h5 class="numberNotification">2</h5> */}
                  <i onClick={this.show.bind(this)} class="fa fa-bell"></i>
                   <Modal 
                      closeOnOuterClick={true}
                      show={this.state.show}
                      onClose={this.close.bind(this)}>
                
                      <a style={closeStyle} onClick={this.close.bind(this)}>X</a>
                      <div  class="test-classs">
                        <h2 class="title_table"> Notifications  </h2>
                        <table class="styled-table">
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                                       
                          {
                              notifi.map((notifis,index)=>
                              <Item 
                                  key={index} notifiss={notifis}
                                  onDelete={this.onDeleted}
                              ></Item>
                              
                              )}
                        </table>
                    
                      </div>
                  </Modal>
                  <div class="dropdown">
                    <i class="fa fa-user-circle" onClick={this.show1.bind(this)}></i>
                    <Modal  closeOnOuterClick={true}  show={this.state.show1}  onClose={this.close1.bind(this)}>
                      <a style={closeStyle} onClick={this.close1.bind(this)}><i class="fa fa-times" style={{color: "#ffffff"}}></i></a>
                      <div class="profile_admin" >
                        <h2 style={{textAlign: "center"}}> Administrator </h2>                  
                           <ProfileAdmin />
                      </div>
                    </Modal>   
                  </div>
                </div>  
            </div>
       
    )
}

}

class Item extends Component {
  onDelete = (id) =>{
    console.log(id);
		if (confirm('Do you really want to remove this one?')) { //eslint-disable-line
         this.props.onDelete(id);
      }
	}
render(props){
  return(
    <div class="notifi"> 
     <tbody>
              <tr> <td><h6>{this.props.notifiss.created_at}</h6>
              <p>ANNOUNCE: {this.props.notifiss.full_name} has {this.props.notifiss.message}    
          </p></td> 
          <td>  <button class="deleNotifi" type="submit"  onClick ={ () =>this.onDelete(this.props.notifiss.id)}><i class="fa fa-minus"></i></button></td> 
          </tr>  
        
    </tbody>  
        
    </div>
  )
}
}

