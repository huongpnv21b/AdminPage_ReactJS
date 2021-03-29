
// import React from "react";
//import "./styles.css";
import React, { Component } from 'react';
import axios from 'axios';
import { Line } from "react-chartjs-2";




export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Data: []
        }
      }


      componentDidMount(){
        axios({
            methos:'GET',
            url:"https://api-gogo.herokuapp.com/api/chart",
            data:null
        }).then (res=>{
            this.setState({
              Data:res.data
                
            });
           
        }).catch(err=>{
            console.log(err);
        });
        }


        
      render(){
        
          var Datas=this.state.Data;
        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "TotalOrder",
                data: Datas,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              },
              {
                label: "Second dataset",
                data: [33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: "#742774"
              }
            ]
          };
        return (
            <div className="App">
            <Line data={data} />
            </div>
        );
      }
    }