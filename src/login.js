import React, { Component } from 'react';
import './login.css';
import {login} from './api/login.js';
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.handleLoginForm = this.handleLoginForm.bind(this);
    }
    
    async handleLoginForm(e){
        e.preventDefault();
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        if(email !=='' && password !==''){
            var cred = await login(email,password);
            if(cred){
                this.props.history.replace("/home");
            }else{
                return false;
            }
        }
    }
  render() {
    return (
      <div className="container">
                <h2>Login Form</h2>

        <form method="POST" onSubmit={this.handleLoginForm}>

        <div className="container">
            <label htmlFor="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" ref="email" required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" ref="password" required />
                
            <button className="button" type="submit">Login</button>
            
            <Link className="button" to="/register">Register</Link>
            {/* <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember me
            </label> */}
        </div>

        {/* <div className="container" style={{"backgroundColor":"#f1f1f1"}}>
            <button type="button" className="cancelbtn">Cancel</button>
            <span className="psw">Forgot <a href="#">password?</a></span>
        </div> */}
        </form>
      </div>
    );
  }
}

export default Login;