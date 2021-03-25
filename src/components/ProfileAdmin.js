import Modal, {closeStyle} from 'simple-react-modal'
import React, { Component } from 'react';
import Axios from 'axios';
export default class ProfileAdmin extends Component{
  _isMounted = false;
  constructor(props){
    super(props)
    this.state={
        profile:[],
        keyword:"",
    }
  }
  componentDidMount(){
    this._isMounted = true;
    Axios({
        methos:'GET',
        url:"https://api-gogo.herokuapp.com/api/profile/4",
        data:null
    }).then(res =>{
      var data =res.data;
      console.log(data);
      this.setState({
        profile :res.data.user,
      });
      }).catch(err=>{
        console.log(err);
    });
   
} 
 

  render(){
    var {profile} = this.state;
    var profiles = this.state.profile;
    return (
      <div class="border">  
        <div class="avt1">
        <img class="avatar" src={this.state.profile.avatar}></img>
        <p> Adminnistrator</p>
        </div>
        <div class="infor">
          
            <p class="name"><i class="fa fa-user"></i>{this.state.profile.full_name}</p>  
            <p><i class="fa fa-calendar" aria-hidden="true"></i>{this.state.profile.birthday}</p>
          
             <p style={{display:'flex'}}><i class="fa fa-address-book" aria-hidden="true"></i>{this.state.profile.address}</p>
         
          
           <p><i class="fa fa-envelope" aria-hidden="true"></i>{this.state.profile.email}</p>
         
            <p><i class="fa fa-phone-square" aria-hidden="true"></i>{this.state.profile.phone}</p>
        
        </div>
      </div>
    )
  }
}