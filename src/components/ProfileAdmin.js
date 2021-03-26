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
        <h3 class="name">{this.state.profile.full_name}</h3>  
        
        </div>
        <div class="infor">
          <div class="tag">
            <p><i class="fa fa-calendar" aria-hidden="true"></i>{this.state.profile.birthday}</p>
          </div>
          <div class="tag">
             <p><i class="fa fa-map-marker" aria-hidden="true"></i>{this.state.profile.address}</p>
          </div>
          <div class="tag">
            <p><i class="fa fa-envelope" aria-hidden="true"></i>{this.state.profile.email}</p>
          </div>
          <div class="tag">
            <p><i class="fa fa-phone-square" aria-hidden="true"></i>{this.state.profile.phone}</p>
          </div>
        </div>
      </div>
    )
  }
}
