//This will be opened from DisplayStaff.js
import React from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import Webcam from 'react-webcam';
import autobind from 'autobind-decorator';
//  import Rebase from 're-base';
// var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");

@autobind
class AddStaff extends React.Component{

  constructor(){
    super();
    this.state ={
      staff:{},
      data_uri:null,
      staffName:'',
      contNo:'',
      isAddStaff:true
    }
  }
  componentWillMount (){
    console.log("componentWillMount");
  //  this.props.getChildComp(this);
  }

  componentDidUpdate(){
    console.log("componentDidUpdate ");
  //  this.props.getChildComp(this);
  }

  componentWillUnmount(){
    console.log("componentWillUnmount ");
  //  this.props.getChildComp(this);
  }



  componentDidMount(){

    //  alert("mount");

    // base.syncState("/staff",{
    //   context:this,
    //   state:'staff'
    // });
    //  debugger;
    //   localStorage.setItem("staff", JSON.stringify(this.props.staff));

  }

  saveStaff(e){
    e.preventDefault();

    {/*//// Check unique email
      // var email = this.refs.email.value;
      // var objValid =  Object.keys(this.state.staff).filter((key)=>{
      //   return( this.state.staff[key].email == email && this.state.staff[key].password == pwd)
      // });*/}

      var  validate = true;
      var strError="<span style='color:red'><ul>";
      if(this.refs.txtName.value == ""){
        strError +="<li> Please enter Name </li>";
            validate = false;
      }
      if(this.refs.cbxIdProofType.value == ""){
        strError +="<li> Please select Proof Type </li>";
          validate = false;
      }
      if(this.refs.txtIdProofNo.value == ""){
        strError +="<li> Please enter Proof No </li>";
          validate = false;
      }
      strError+="<ul> <span>";

   if(validate){
       var gen = $('input[name="optionGender"]:checked');
       var gtMen = $('input[name="chkbxFreqVisitor"]:checked');
       var genName="", isGateMen=false;
       if(gen.length>0){
         genName = gen[0].value;
       }
       if(gtMen.length>0){
         isGateMen=true;
       }

       var objStaff =  {
         "id": (new Date()).getTime(),
         "name": this.refs.txtName.value,
         "photo": this.state.data_uri,
         "contactNo": this.refs.txtContactNo.value,
         "idProofType": this.refs.cbxIdProofType.value,
         "idProofNo": this.refs.txtIdProofNo.value,
         "designation": this.refs.txtDesignation.value,
         "gender":genName,
         "department":this.refs.txtDepartment.value,
         "dateOfBirth":this.refs.txtDOB.value,
         "dateOfJoin":this.refs.txtDOJ.value,
         "email":this.refs.txtEmail.value,
         "password":this.refs.txtPassword.value,
         "checkinDetails": [
           {
             "vehicleType": this.refs.txtVehicleType.value,
             "vehicleNo": this.refs.txtVehicleNo.value,
             "inTime": (new Date()),
             "outTime": "",
             "gateNo":this.refs.txtGateNo.value,
           }
         ]
       }

       var key = "emp-"+ objStaff.id;
       this.props.staff[key] = objStaff;

       this.props.addStaffData(objStaff);
       //this.setState({staff:this.state.staff});

      //  if(!navigator.onLine){
         localStorage.setItem("staff", JSON.stringify(this.props.staff));
      //  }
      // this.refs.fromAddStaff.reset();


       this.refs.txtName.value="";
       this.state.data_uri="";
       this.refs.txtContactNo.value="";
       this.refs.txtIdProofNo.value="";
       this.refs.txtDesignation.value="";
       this.refs.txtDepartment.value="";
       this.refs.txtDOB.value="";
       this.refs.txtDOJ.value="";
       this.refs.txtEmail.value="";
       this.refs.txtPassword.value="";
       this.refs.txtVehicleType.value="";
       this.refs.txtVehicleNo.value="";
       this.refs.txtGateNo.value="";
       $("#errorDiv").append("");
     }
     else{
       $("#errorDiv").append(strError);
     }





    }

    handleFile(e) {
      var self = this;
      var reader = new FileReader();
      var file = e.target.files[0];

      reader.onload = function(upload) {
        self.setState({
          data_uri: upload.target.result,
        });
      }

      reader.readAsDataURL(file);
    }


    screenshot() {
      var screenshot = this.refs.webcam.getScreenshot();
      this.setState({data_uri: screenshot});
    }

    setName(e){
      this.state.staffName=e.currentTarget.value;
      this.setState({vistName: this.state.staffName});
    }

    setContactNo(e){
      this.state.contNo=e.currentTarget.value;
      this.setState({contNo: this.state.contNo});
    }

    render(){
      return (
        <div>
        <section className="content-header">
        {/*<h1>
        Add Staff
        </h1>*/}
        {/*<ol className="breadcrumb">
        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Examples</a></li>
        <li className="active">User profile</li>
        </ol>*/}
        </section>


        <section className="content">

        <div className="row">
        <div className="col-md-3">
        <div className="box box-primary">
        <div className="box-body box-profile">
        {/* <img className="profile-user-img img-responsive img-circle" src="../../public/dist/img/user4-128x128.jpg" alt="User profile picture"/>*/}
        <Webcam className="webcam-circle img-responsive img-circle" ref='webcam'/>
        <h3 className="profile-username text-center">{this.state.vistName}</h3>
        <p className="text-muted text-center">{this.state.contNo}</p>
        {/*  <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a> */}
        <div className="form-group">
        <div>
        <input type="file" className="btn btn-info pull-left" id="filePhoto" onChange={this.handleFile}  />
        {/* <button type="submit" className="btn btn-danger pull-left">Browse...</button>*/}
        <button type="submit" className="btn btn-success pull-right" onClick={this.screenshot}>Capture</button>
        </div>
        </div>
        </div>
        </div>
        <div className="box box-primary">
        <div className="box-body box-profile">
        <img className="webcam-circle-captured img-responsive img-circle" src={this.state.data_uri} alt="Captured image display here."/>
        </div>
        </div>
        </div>

        <div className="col-md-9">
        <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">
        <li className="active"><a href="#settings" data-toggle="tab">Staff Detail</a></li>
        </ul>
        <div className="tab-content">

        <div className="active tab-pane" id="settings">
        <form className="form-horizontal">

        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Name</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtName"  onChange={this.setName} ref="txtName" placeholder="Name"/>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Contact No</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtContactNo" onChange={this.setContactNo} ref="txtContactNo" placeholder="Contact No"/>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Id Proof Type</label>
        <div className="col-sm-10">
        <select className="form-control" id="cbxIdProofType" ref="cbxIdProofType" >
        <option>Voter Id</option>
        <option>Aadhar Card</option>
        <option>PAN Card</option>
        <option>Driving License</option>
        <option>Passport</option>
        </select>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Id Proof No</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtIdProofNo" ref="txtIdProofNo" placeholder="Id Proof No"/>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Designation</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtDesignation" ref="txtDesignation" placeholder="Designation"/>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Gender</label>
        <div className="col-sm-10">
        <label className="radio-inline">
        <input type="radio" name="optionGender" value="Male" />
        Male
        </label>
        <label className="radio-inline">
        <input type="radio" name="optionGender" value="Female"/>
        Female
        </label>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Department</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtDepartment" ref="txtDepartment" placeholder="Department"/>
        </div>
        </div>

        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Date of Birth</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtDOB" ref="txtDOB" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask placeholder="dd/mm/yyyy" />
        </div>
        </div>

        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Date of Join</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtDOJ" ref="txtDOJ" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask placeholder="dd/mm/yyyy"/>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Email</label>
        <div className="col-sm-10">
        <input type="email" className="form-control" id="txtEmail" ref="txtEmail" placeholder="Email" />
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Password</label>
        <div className="col-sm-10">
        <input type="password" className="form-control" id="txtPassword" ref="txtPassword" placeholder="Password"/>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Vehicle Type</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtVehicleType" ref="txtVehicleType" placeholder="Vehicle Type"/>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Vehicle No</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtVehicleNo" ref="txtVehicleNo" placeholder="Vehicle No"/>
        </div>
        </div>
        <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Gate No</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="txtGateNo" ref="txtGateNo" placeholder="Gate No"/>
        </div>
        </div>

        <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
        <button type="submit" className="btn btn-danger pull-right" onClick={this.saveStaff}>Submit</button>
        </div>
        </div>
        <div id="errorDiv">

        </div>

        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>


        </div>)
      }
    }

    reactMixin.onClass(AddStaff,History);
    export default AddStaff;
