
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
      staff:{}
    }
  }

  componentDidMount(){

    base.syncState("/staff",{
      context:this,
      state:'staff'
    });

  }
  checkLogin(e){
    e.preventDefault();
    var email = this.refs.email.value;
    var pwd = this.refs.pwd.value;
    var objValid =  Object.keys(this.state.staff).filter((key)=>{
      return( this.state.staff[key].email == email && this.state.staff[key].password == pwd)
    });

    this.refs.loginForm.reset();
    if(objValid.length == 1 && this.state.staff[objValid[0]].designation=="admin"){
      this.history.pushState(null,'/admin/'+ email);
    }
   else  if(objValid.length == 1 && this.state.staff[objValid[0]].isGateMan){
      this.history.pushState(null,'/staff/'+ email);
    }
    else{
      alert("Enter valid Email & password");
    }
  }


  render(){
    return(
      <form ref="loginForm">
      <div className="container-fluid">
      <div className="form-group">
      <label htmlFor="email">Email address:</label>
      <input type="email" className="form-control" ref="email"/>
      </div>
      <div className="form-group">
      <label htmlFor="pwd">Password:</label>
      <input type="password" className="form-control" ref="pwd"/>
      </div>

      <button type="submit" onClick={this.checkLogin} >Submit</button>
      </div>

      </form>

    )
  }
}

reactMixin.onClass(Login,History);
export default Login;
