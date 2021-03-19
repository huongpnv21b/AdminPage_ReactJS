import React, { Component } from 'react';
// import '../../public/css/style.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Menu from './Menu';
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
          url :`https://api-gogo.herokuapp.com/api/promotion/${id}`,
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
        url :`https://api-gogo.herokuapp.com/api/promotion/edit/`+id,
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
          
          <div class="container">
          <Menu />
          <div class="orderTable"style={{marginTop: 10}}>
          <NavLink to="/promotion" class="link-nav"><i class="fas fa-chevron-left"></i>Trở về</NavLink>
          <div class="container1">
            {/* <div></div> */}
            <h3>EDIT Promotion</h3>           
            <form  onSubmit={this.onSave}>
              <label for="name">Name Promotion:</label>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  className="form-control"
                />
                </div>
              <label for="code">Code:</label>
              <div className="form-group">
                <input
                type="text"
                name="code"
                value={this.state.code}
                onChange={this.onChange}
                className="form-control"
                />
              </div>

              <label for="start_time">Start Time:</label>
              <div className="form-group">
                <input
                type="timestamp"
                name="start_time"
                value={this.state.start_time}
                onChange={this.onChange}
                className="form-control"
                />
              </div>
              <label for="end_time">End Time:</label>
              <div className="form-group">
                <input
                type="timestamp"
                name="end_time"
                value={this.state.end_time}
                onChange={this.onChange}
                className="form-control"
                />
              </div>

              <div class="flex-box">
                <div class="box-inside">
                  <label for="min_value">Min value:</label>

                  <input
                    type="number"
                    name="min_value"
                    value={this.state.min_value}
                    onChange={this.onChange}
                    className="form-control"
                  />
                </div>
                <div class="box-inside">
                  <label for="max_value">Max value:</label>
                  <input
                    type="number"
                    name="max_value"
                    value={this.state.max_value}
                    onChange={this.onChange}
                    className="form-control"
                  />
                </div>
              </div>
              <label >Value: </label>
              <div className="form-group">
                <input
                  type="number"
                  name="value"
                  value={this.state.value}
                  onChange={this.onChange}
                  className="form-control"
                />
              </div>

              <br />
              <div className="text-center">
                <button class="styled-button" type="submit">
                  SAVE
                </button>
                &nbsp;
                <button
                class="red-button"
                  type="button"
                  onClick={this.onClear}
                >
                  CLEAR
                </button>
                
              </div>
            </form>
         
            
          </div>
        </div>
          </div>
        )
    }
}
//  export default Update;