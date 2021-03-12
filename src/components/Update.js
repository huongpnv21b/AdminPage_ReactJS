import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            code: '',
            start_time:'',
            end_time:'',
            min_value: '',
            max_value: '',
            value:'',
        }
    }
    
    componentDidMount(){
        var {match} = this.props;
        if (match) {
          var id = match.params.id;
          axios({
          method: 'GET',
          url :`http://localhost:8000/api/promotion/${id}`,
          data : null
         }).then(res =>{
          var data =res.data;
            this.setState({
              id: data.id,
              name : data.name,
              code : data.code,
              start_time: data.start_time,
              end_time : data.end_time,
              min_value : data.min_value,
              max_value : data.max_value,
              value : data.value,
            });
          }).catch( err =>{
        });
       }
      }
      onChange = (event) =>{
        var target =event.target;
        var name =target.name;
        var type =target.type;
        var value =target.value;
        if (type === 'file') {
          value = this.avatar.value.replace(  /C:\\fakepath\\/i, "/Image/images/" );
        }
  
        this.setState({
          [name] : value,
        });
      }

      onSave =(e) =>{
    	e.preventDefault();
    	var { id, name, code,start_time, end_time, min_value, max_value,value} = this.state;
      var {history} = this.props;
      if (id) {
        axios({
        method: 'PUT',
        url :`http://localhost:8000/api/editPromotion/`+id,
        data : {
            name : name,
            code : code,
            start_time : start_time,
            end_time : end_time,
            min_value : min_value,
            max_value : max_value,
            value : value,
            
          }
        }).then(res =>{
              toast.success("Cập nhật sản phẩm thành công", {
          })
              history.goBack();
        });
      }
    } 
    onClear = () =>{
        this.setState({
              name : '',
              code : '',
              start_time : '',
              end_time: '',
              min_value:'',
              max_value:'',
              value : '',
        });
      }
    render() {         
        var { id, name, code, start_time ,end_time,min_value, max_value, value} = this.state;
        return (
            <div style={{marginTop: 10}}>
                <h3>EDIT Promotion</h3>
                <div className="panel panel-warning col-md-8 ml">
              <div className="container">
              <div className="panel-body mt-4">
                <form onSubmit = {this.onSave} >
                  <div className="form-group">
                    <label>Name Promotion</label>
                    <input type="text" name="name" value ={this.state.name} onChange ={this.onChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Code:</label>
                    <input type="text" name="code" value ={this.state.code} onChange ={this.onChange} className="form-control" />
                  </div>
                  
                  <div className="form-group">
                    <label>Start Time :</label>
                    <input type="timestamp" name="start_time" value ={this.state.start_time} onChange ={this.onChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input type="timestamp" name="end_time" value ={this.state.end_time} onChange ={this.onChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Min min_value</label>
                    <input type="number" name="min_value" value ={this.state.min_value} onChange ={this.onChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Max value:</label>
                    <input type="number" name="max_value" value ={this.state.max_value} onChange ={this.onChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Value </label>
                    <input type="number" name="value" value ={this.state.value} onChange ={this.onChange} className="form-control" />
                  </div>
                  
                  <br />
                  <div className="text-center">
                    <button type="submit"  className="btn btn-primary">Lưu</button>&nbsp;
                    <button type="button" onClick={this.onClear} className="btn btn-primary">Clear</button>
                    <NavLink to="/promotion" className="btn btn-primary ml-1">Trở về</NavLink>
                  </div>
                </form>
              </div>
              </div>
              
            </div>
            </div>
        )
    }
}
//  export default Update;