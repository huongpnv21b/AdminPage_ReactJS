import React, { Component } from 'react';
// import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink } from 'react-router-dom';
import Axios from 'axios';
import Menu from './Menu';
import Chart from './Chart';
import Header from './Header';
// import ProfileAdmin from './ProfileAdmin.js';

class Dashboard extends Component{

      constructor(props){
        super(props)
        this.state={
            count_sender:'',
            count_trucker:'',
            count_order:'',            
            keyword:"",
            show: false
          };
          this.showModal = this.showModal.bind(this);
          this.hideModal = this.hideModal.bind(this);
    }

  componentDidMount(){
    
    fetch("http://api-gogo.herokuapp.com/api/count-order")
    .then(response => {
            response.json().then((data1) =>  {
            fetch("http://api-gogo.herokuapp.com/api/count-sender")
            .then(response => {
                    response.json().then((data2) =>  {
                    fetch("http://api-gogo.herokuapp.com/api/count-trucker")
                    .then(response => {
                        response.json().then((data3) =>    {
                                this.updateUI(data1, data2, data3);
                            });
                        
                        });
                       
                });
            });
        });
    });
    }

    updateUI(data1, data2, data3){
      this.setState({
        count_order:data1,
        count_sender:data2,
        count_trucker:data3,
       
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
      console.log(count_order);
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
                    class="fa fa-user-o fa-2x text-lightblue"
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
                <i class="fa fa-user-o  fa-2x text-red"></i>
                  {/* <i class="fa fa-calendar fa-2x text-red" aria-hidden="true"></i> */}
                  <div class="card_inner">
                    <p class="text-primary-p">Number of Sender</p>
                    <span class="font-bold text-title">{this.state.count_sender}</span>
                  </div>
                </div>
              </Link>

              <Link to={'/order'} className="nav-link">
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
                
              </div>
              {/* <!-- MAIN CARDS ENDS HERE --> */}
    
              {/* <!-- CHARTS STARTS HERE --> */}
              <div class="charts">
                <div class="charts__left">
                  <div class="charts__left__title">
                    <div>
                      <h1>Statics Months</h1>
                      <p>VietNam in 2020</p>
                      <Chart/>
                    </div>
                    <i class="fa fa-usd" aria-hidden="true"></i>
                  </div>
                  <div id="contain"></div>
                  
                  
                </div>
    
                <div class="charts__right">
                  <div class="charts__right__title">
                    <div>
                      <h1>Stats Reports</h1>
                      <p>Cupertino, California, USA</p>
                     
                    </div>
                    <i class="fa fa-usd" aria-hidden="true"></i>
                  </div>
    
                  <div class="charts__right__cards">
                    <div class="card1">
                      <h1>Income</h1>
                      <p>$75,300</p>
                    </div>
    
                    <div class="card2">
                      <h1>Sales</h1>
                      <p>$124,200</p>
                    </div>
    
                    <div class="card3">
                      <h1>Users</h1>
                      <p>3900</p>
                    </div>
    
                    <div class="card4">
                      <h1>Orders</h1>
                      <p>1881</p>
                    </div>
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