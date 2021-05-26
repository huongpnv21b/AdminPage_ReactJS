import React, { Component } from "react";
  //  import 'style.css';
  import { Link } from 'react-router-dom';
  
  class NotFound extends Component {
    render() {
      return (
    <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>4<img src="https://dev-dtravel-data.s3.ap-northeast-1.amazonaws.com/images/1622028220-sIpI4eS30B60ae2fbc3aaa2" width="150" height="150"/>4</h1>
			</div>
			<h2>Oops! Nothing was found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <Link
					to="/">Return to dashboard</Link></p>
		</div>
	</div>
     
     );
    
    }
    
  }
  export default NotFound;