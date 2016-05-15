
import React from 'react';
import Rebase from 're-base';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");



@autobind
class Login extends React.Component{

  constructor(){
    super();
    this.state ={
      staff:{},
      authenticator:{}
    }
  }

  componentDidMount(){

    base.syncState("/authenticator",{
      context:this,
      state:'authenticator'
    });

    // base.syncState("/authenticator",{
    //   context:this,
    //   state:'authenticator'
    // });

  }
  checkLogin(e){
    e.preventDefault();


    var email = this.refs.email.value;
    var pwd = this.refs.pwd.value;
    var objValid =  Object.keys(this.state.authenticator).filter((key)=>{
      return( this.state.authenticator[key].email == email && this.state.authenticator[key].password == pwd)
    });

    this.refs.loginForm.reset();
    if(objValid.length == 1 && this.state.authenticator[objValid[0]].designation=="admin"){
      this.history.pushState(null,'/admin/'+ email);
    }
   else  if(objValid.length == 1 && this.state.authenticator[objValid[0]].designation.toLocaleLowerCase()=="secuirity"){
      this.history.pushState(null,'/security/'+ email);
    }
    else{
      alert("Enter valid Email & password");
    }
  }


  render(){
    return(
      // <form ref="loginForm">
      // <div classNameName="container-fluid">
      // <div classNameName="form-group">
      // <label htmlFor="email">Email address:</label>
      // <input type="email" classNameName="form-control" ref="email"/>
      // </div>
      // <div classNameName="form-group">
      // <label htmlFor="pwd">Password:</label>
      // <input type="password" classNameName="form-control" ref="pwd"/>
      // </div>
      //
      // <button type="submit" onClick={this.checkLogin.bind(this)} >Submit</button>
      // </div>
      // </form>

      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html"><b>Cakewalk</b>&nbsp;vsm</a>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form ref="loginForm">
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email" ref="email"/>
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" ref="pwd"/>
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  {/*<label>
                    <input type="checkbox"/> Remember Me
                  </label>*/}
                </div>
              </div>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat" onClick={this.checkLogin.bind(this)}>Sign In</button>
              </div>
            </div>
          </form>

          {/*<div className="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook"></i> Sign in using Facebook</a>
            <a href="#" className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus"></i> Sign in using Google+</a>
          </div>*/}

          {/*<a href="#">I forgot my password</a><br>
          <a href="register.html" className="text-center">Register a new membership</a>*/}

        </div>
      </div>
    )
  }
}

reactMixin.onClass(Login,History);
export default Login;
