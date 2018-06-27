import React, { Component } from 'react';
import './register.css';
import {Link} from 'react-router-dom';
import {register} from './api/register.js';

class Register extends Component {
    constructor(props){
        super(props);
        this.handleRegisterForm = this.handleRegisterForm.bind(this);
    }
    
    async handleRegisterForm(e){
        e.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        var confirmPass = this.refs.confirmPass.value;
        if(password !== confirmPass)
        {
            return false;
        }
        if(username !=='' && password !==''){
            var res = await register(username, password, confirmPass);
            if(res){
                window.location='/';
            }else{
                return false;
            }
        }
    }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleRegisterForm} style={{"border":"1px solid #ccc"}}>
            <div className="container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr />

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="username" ref="username" required />

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" ref="password" required />

                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="confirmPass" ref="confirmPass" required />
                
                {/* <label>
                <input type="checkbox" checked="checked" name="remember" style={{"margin-bottom":"15px"}} /> Remember me
                </label> */}
                
                {/* <p>By creating an account you agree to our <a href="#" style={{"color":"dodgerblue"}}>Terms & Privacy</a>.</p> */}

                <div className="clearfix">
                <Link className="cancelbtn" to="/">Cancel</Link>
                <button type="submit" className="button signupbtn">Sign Up</button>
                </div>
            </div>
        </form>
      </div>
    );
  }
}

export default Register;