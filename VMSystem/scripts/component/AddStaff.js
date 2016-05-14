
import React from 'react';
import Rebase from 're-base';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");



@autobind
class AddStaff extends React.Component{

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

  saveStaff(e){
    e.preventDefault();

    //// Check unique email
    // var email = this.refs.email.value;
    // var objValid =  Object.keys(this.state.staff).filter((key)=>{
    //   return( this.state.staff[key].email == email && this.state.staff[key].password == pwd)
    // });

    var objStaff =  {
      "id": (new Date()).getTime(),
      "name": "Soheb Rapati",
      "photo": "",
      "contactNo": "7774080370",
      "idProof": "Voter Id",
      "idProofNo": "488s4d8s45f",
      "designation": "secuirity",
      "gender":"M",
      "department":"",
      "dateOfBirth":"",
      "dateOfJoining":"",
      "password":"aa@123",
      "email":"soheb@yahoo.com",
      "isGateMan":true,
      "checkinDetails": [
        {
          "vehicleType": "Scooter",
          "vehicleNo": "MH13GK2837",
          "inTime": "18:22",
          "outTime": "",
          "gateNo":"8"

        }
      ]
    }

    var key = "emp-"+ objStaff.id;
    this.state.staff[key] = objStaff;
    this.setState({staff:this.state.staff});

    if(!navigator.onLine){
      localStorage.setItem("staff", JSON.stringify(this.state.staff));
    }
  }

  render(){
    return(
      <form ref="loginForm">
      <div className="container-fluid">
       <h1> ADMIN DASHBORD</h1>
      <button type="submit" onClick={this.saveStaff} >Submit</button>

      </div>

      </form>

    )
  }
}

reactMixin.onClass(AddStaff,History);
export default AddStaff;
