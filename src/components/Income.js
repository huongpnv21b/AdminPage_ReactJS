
// import React from "react";
//import "./styles.css";
import React, { Component } from 'react';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { now } from 'lodash-es';

export default class Income extends Component {
    constructor(props) {
        super(props);
        this.state = {
          income: [],
        }
      }
      componentDidMount(){
        axios({
            methos:'GET',
            url:"https://api-gogo.herokuapp.com/api/chart/income",
            data:null
        }).then (res=>{
            this.setState({
              income:res.data
                
            });
           
        }).catch(err=>{
            console.log(err);
        });

        }


        
      render(){
          var income=this.state.income;
        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul",'Aug',"Sep","Oct","Nov","Dec"],
            datasets: [
              {
                label: "Income",
                data: income,
                fill: false,
                borderColor: "#ff8000",
                background: "#d8e1e8",
              }
            ]
          };
        return (
            <div className="App">
              <div class="charts__left__title">
<div>
<h1>Money from orders of months</h1>
<p style={{display:"flex"}}><span>VietNam in 2021</span>
</p>
</div>
<i class="fa fa-usd" aria-hidden="true"></i>

</div>
            <Line data={data} />
            </div>
        );
      }
    }