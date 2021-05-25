import React, { Component } from 'react';
import CoolTabs from 'react-cool-tabs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink } from 'react-router-dom';
import Axios from 'axios';
import Menu from './Menu';
import Chart from './Chart';
import Income from './Income';
import Header from './Header';
import {Redirect} from 'react-router-dom';
import { random } from 'lodash-es';

class Dashboard extends Component{

      constructor(props){
        super(props)
        this.state={
            count_sender:'',
            count_trucker:'',
            count_order:'',
            revenue:'',       
            keyword:"",
            show: false,
            year:2021
          };
          this.showModal = this.showModal.bind(this);
          this.hideModal = this.hideModal.bind(this);
    }
    componentDidMount(){
    

      Axios({
        methos:'GET',
        url:"https://api-gogo.herokuapp.com/api/count-sender",
        data:null
          }).then (res=>{
              this.setState({
                  count_sender:res.data
              });
          })
          Axios({
            methos:'GET',
            url:"https://api-gogo.herokuapp.com/api/revenue",
            data:null
          }).then (res=>{
              this.setState({
                  revenue:res.data
              });
          })
        Axios({
          methos:'GET',
          url:"https://api-gogo.herokuapp.com/api/count-trucker",
          data:null
        }).then (res=>{
            this.setState({
                count_trucker:res.data
            });
        })
  
        Axios({
          methos:'GET',
          url:"https://api-gogo.herokuapp.com/api/count-order",
          data:null
        }).then (res=>{
            this.setState({
                count_order:res.data
            });
        })
  
        Axios({
          methos:'GET',
          url:"https://api-gogo.herokuapp.com/api/count-user",
          data:null
        }).then (res=>{
            this.setState({
                count_user:res.data
            });
        })
      }
  

    showModal = () => {
      this.setState({ show: true });
    };
  
    hideModal = () => {
      this.setState({ show: false });
    };

    render(){
      const  count_order = this.state.count_order;
      if(!localStorage.phone || localStorage.phone!="0981536770"){
        return <Redirect to="/"/>;
      }
        return(
          <div class="container">
          <Menu />
            <main>
            <div class="main__container">
            
              <Header />
              
              <div class="main__cards">
              <Link to={'/trucker'} className="nav-link">
                <div class="card">
                  <i
                    class="fa fa-users fa-2x text-lightblue"
                    aria-hidden="true"
                  ></i>
                  <div class="card_inner">
                    <p class="text-primary-p">Number of Trucker</p>
                    <span class="font-bold text-title" >{this.state.count_trucker}</span>
                  </div>
                </div>
              </Link>
              <Link to={'/sender'} className="nav-link">
                <div class="card">
                <i class="fa fa-user  fa-2x text-red"></i>
                  {/* <i class="fa fa-calendar fa-2x text-red" aria-hidden="true"></i> */}
                  <div class="card_inner">
                    <p class="text-primary-p">Number of Sender</p>
                    <span class="font-bold text-title">{this.state.count_sender}</span>
                  </div>
                </div>
              </Link>

              <Link to={'/orderNew'} className="nav-link">
                <div class="card">
                  <i
                    class="fa fa-list fa-2x text-yellow"
                    aria-hidden="true"
                  ></i>
                  <div class="card_inner">
                    <p class="text-primary-p">Number of Orders</p>
                    <span class="font-bold text-title">{count_order}</span>
                  </div>
                </div>
                </Link>
                <Link to={'/orderCompleted'} className="nav-link">
                <div class="card">
                  <i
                    class="fa fa-money fa-2x text-money"
                    aria-hidden="true"
                  ></i>
                  <div class="card_inner">
                    <p class="text-primary-p">Revenue</p>
                    <span class="font-bold text-title">{this.state.revenue.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })}</span>
                  </div>
                </div>
                </Link>
              </div>
              {/* <!-- MAIN CARDS ENDS HERE --> */}
    
              {/* <!-- CHARTS STARTS HERE --> */}
              <div class="charts">
<div class="charts__left">
<div id="contain">
<CoolTabs
	       tabKey={'1'}
	       style={{ width:  "100%", height:  800, background:  'white' }}
	       activeTabStyle={{ background:  '#e3ffff', color:  'black' }}
	       unActiveTabStyle={{ background:  '#3b4d6e', color:  'white' }}
	       activeLeftTabBorderBottomStyle={{ background:  'yellow', height:  4 }}
	       activeRightTabBorderBottomStyle={{ background:  'yellow', height:  4 }}
	       tabsBorderBottomStyle={{ background:  'white', height:  4 }}
	       leftContentStyle={{ background:  'white' }}
	       rightContentStyle={{ background:  'white' }}
	       leftTabTitle={'Number of orders and users'}
	       rightTabTitle={'Money from orders per months'}
	       leftContent={<Chart/>}
	       rightContent={<Income/>}
	       contentTransitionStyle={'transform 0.6s ease-in'}
	       borderTransitionStyle={'all 0.6s ease-in'}/>
{/* <Chart/> */}
</div>
</div>
</div>
              {/* <!-- CHARTS ENDS HERE --> */}
            </div>
            
          </main>
         
          </div>
    
        );
    }
}

export default Dashboard;