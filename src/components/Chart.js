
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
          user:[]
        }
      }


      componentDidMount(){
        axios({
            methos:'GET',
            url:"http://127.0.0.1:8000/api/chart",
            data:null
        }).then (res=>{
            this.setState({
              order:res.data
                
            });
           
        }).catch(err=>{
            console.log(err);
        });

        axios({
          methos:'GET',
          url:"http://127.0.0.1:8000/api/chart/line/user",
          data:null
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
                label: "TotalOrder",
                data: orders,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              },
              {
                label: "Total User",
                data: users,
                fill: false,
                borderColor: "#742774",
                backgroundColor: "#D0A9F5"
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