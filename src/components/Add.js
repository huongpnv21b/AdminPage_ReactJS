import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Menu from "./Menu";
import "react-toastify/dist/ReactToastify.css";
import DateTimePicker from "react-datetime-picker";
import Header from './Header';
export default class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      code: "",
      start_time: "",
      end_time: "",
      min_value: "",
      max_value: "",
      value: "",
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      axios({
        method: "GET",
        url: `https://api-gogo.herokuapp.com/api/promotion/${id}`,
        data: null,
      })
        .then((res) => {
          var data = res.data;
          this.setState({
            id: data.id,
            name: data.name,
            code: data.code,
            start_time: data.start_time,
            end_time: data.end_time,
            min_value: data.min_value,
            max_value: data.mã_value,
            value: data.value,
          });
        })
        .catch((err) => {});
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var type = target.type;
    var value = target.value;
    if (type === "file") {
      value = this.avatar.value.replace(/C:\\fakepath\\/i, "/Image/images/");
    }

    this.setState({
      [name]: value,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    var {
      id,
      name,
      code,
      start_time,
      end_time,
      min_value,
      max_value,
      value,
    } = this.state;
    var { history } = this.props;

    if (
      name === "" &&
      code === "" &&
      start_time === "" &&
      end_time === "" &&
      value === ""
    ) {
      toast.warn("Please fill out barely!", {});
    } else {
      axios({
        method: "POST",
        url: "https://api-gogo.herokuapp.com/api/promotion/create",
        data: {
          name: name,
          code: code,
          start_time: start_time,
          end_time: end_time,
          min_value: min_value,
          max_value: max_value,
          value: value,
        },
      }).then((res) => {
        toast.success("Added Promotion successfully", {});
        history.goBack();
      });
    }
    // }
  };

  onClear = () => {
    this.setState({
      name: "",
      code: "",
      start_time: "",
      end_time: "",
      min_value: "",
      max_value: "",
      value: "",
    });
  };
  render() {
    var {
      id,
      name,
      code,
      start_time,
      end_time,
      min_value,
      max_value,
      value,
    } = this.state;
    return (
      <div class="container">
        <Menu />
        <div class="orderTable">
          <Header/>
          <NavLink
            to="/promotion"
            class="link-nav"
            style={{ textDecoration: "none", fontSize: "15px" }}
          >
            <i class="fa fa-chevron-left"></i> BACK
          </NavLink>
          <div class="container1">
            {/* <div></div> */}
            <h3>ADD Promotion</h3>
            <form onSubmit={this.onSave}>
              <div class="flex-box">
                <label for="name">Title: <span style={{color:"red"}}> *</span></label>
                <input
                required
                  type="text"
                  name="name"
                  class="form-input"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div class="flex-box">
                <label for="code">Code:  <span style={{color:"red"}}> *</span> </label>
                <input
                required
                minlength="4" 
                maxlength="15"
                  type="text"
                  name="code"
                  class="form-input"
                  value={this.state.code}
                  onChange={this.onChange}
                />
              </div>

              <div class="flex-box">
                <label for="start_time">Start Time: <span style={{color:"red"}}> *</span></label>
                <input required
               min="2021-05-17T00:00" 
                  type="datetime-local"
                  name="start_time"
                  class="form-input"
                  value={this.state.start_time}
                  onChange={this.onChange}
                />
              </div>

              <div class="flex-box">
                <label for="end_time">End Time: <span style={{color:"red"}}> *</span></label>
                <input
                required
                min="2021-05-17T00:00" 
                type="datetime-local"
                  name="end_time"
                  class="form-input"
                  value={this.state.end_time}
                  onChange={this.onChange}
                />
              </div>
              <div class="flex-box">
                <label for="min_value">Apply for (VNĐ) <span style={{color:"red"}}>*</span>:</label>
                <div class="small-flex-box">
                  <input
                  // step="0.01" 
                  required
                  min="100000"
                  max="100000000"
                    type="number"
                    name="min_value"
                    class="small-input"
                    value={this.state.min_value.toLocaleString()}
                    placeholder="Min value(100,000)"
                    onChange={this.onChange}
                  />
                  <input
                  required
                  min="100000"
                  max="100000000"
                    type="number"
                    name="max_value"
                    class="small-input"
                    placeholder="Max value"
                    value={this.state.max_value.toLocaleString()}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div class="flex-box">
                <label for="value">Value (%):<span style={{color:"red"}}> *</span> </label>
                <input
                required
                min="5"
                max="100"
                  type="number"
                  name="value"
                  class="number-input"
                  value={this.state.value}
                  onChange={this.onChange}
                />
              </div>

              <br />
              <div style={{margin: "0 34%", display: "flex"}}>
                <button class="styled-button" type="submit">
                  SAVE
                </button>
                &nbsp;
                <button class="red-button" type="button" onClick={this.onClear}>
                  CLEAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
//  export default Add;
