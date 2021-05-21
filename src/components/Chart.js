
// import React from "react";
//import "./styles.css";
import React, { Component } from 'react';
import axios from 'axios';
import { Line } from "react-chartjs-2";




export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          order: [],
          user:[],
          year:'2021'
        }
      }
      onChange = () => {
        this.setState({year: document.querySelector('#year').value});
    }
      componentDidMount(){
        axios({
            methos:'GET',
            url:"https://api-gogo.herokuapp.com/api/chart",
            data:this.state.year
        }).then (res=>{
            this.setState({
              order:res.data
                
            });
           
        }).catch(err=>{
            console.log(err);
        });

        axios({
          methos:'GET',
          url:"https://api-gogo.herokuapp.com/api/chart/line/user",
          data:this.state.year
      }).then (res=>{
          this.setState({
            user:res.data
              
          });
         
      }).catch(err=>{
          console.log(err);
      });

        }


        
      render(){
          var orders=this.state.order;
          var users=this.state.user;
        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Apr",'Aug',"Sep","Oct","Nov","Dec"],
            datasets: [
              {
                label: "Total Orders",
                data: orders,
                fill: true,
                borderColor: "#dcab00"
              },
              {
                label: "Total Users",
                data: users,
                fill: false,
                borderColor: "#742774",
              }
            ]
          };
        return (
            <div className="App">
              <div class="charts__left__title">
<div>
<h1>Statics Months</h1>
<p style={{display:"flex"}}><span>VietNam in</span>
  <form>
      <select id="year" onChange={this.onChange} value={this.state.year}>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </form>
</p>
</div>
<i class="fa fa-usd" aria-hidden="true"></i>

</div>
            <Line data={data} />
            </div>
        );
      }
    }