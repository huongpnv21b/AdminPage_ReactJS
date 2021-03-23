import { render } from "react-dom/cjs/react-dom.development";
import React, { Component } from 'react';

export default class Header extends Component{

render(){
    return(
      
            <div class="main__title">
                <img src="assets/hello.svg" alt="" />
                <div class="main__greeting">
                  <marquee width="700px" direction="right"  style={{marginLeft:'40%'}}>
                    <h1 style={{color:'#FF6347',marginLeft:'30px'}}>Hello GO GO </h1>
                    <p>Welcome to your admin dashboard</p>
                  </marquee>
                </div>
                {/* <div >   <button type="button" onClick={this.showModal}>pROFILE</button></div> */}
              </div>
       
    )
}

}