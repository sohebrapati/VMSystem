//Thi swill be opened from DisplayVisitor.js
import React from 'react';
import Rebase from 're-base';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import Webcam from 'react-webcam';

var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");

@autobind
class AddVisitor extends React.Component {

  constructor(){
     super();
     this.state={
         visitors:{},
       data_uri:null,
       vistName:'',
       contNo:''
       //screenshot: null,
     }
  }

  componentDidMount(){

    base.syncState("/visitors",{
      context:this,
      state:'visitors'
    });

  }

  saveVisitor(e){
    e.preventDefault();
    var gen = $('input[name="optionGender"]:checked');
    var frevis = $('input[name="chkbxFreqVisitor"]:checked');
    var genName="", isFreVis=false;
    if(gen.length>0){
      genName = gen[0].value;
    }
    if(frevis.length>0){
      isFreVis=true;
    }


    var objVisitor =    {
      "id":(new Date()).getTime(),
      "name": this.refs.txtName.value,
      "photo": this.state.data_uri,
      "contactNo": this.refs.txtContactNo.value,
      "idProofType": this.refs.cbxIdProofType.value,
      "idProofNo": this.refs.txtIdProofNo.value,
      "visitorType": this.refs.txtVisitorType.value,
      "gender":genName,
      "count":1,
      "blacklist":false,
      "isFrequentVisitor":isFreVis,
      "checkinDetails": [
        {
          "visitPurpose": this.refs.txtVisitPurpose.value,
          "note": this.refs.txtNote.value,
          "personToMeet": this.refs.txtPersonToMeet.value,
          "towerNo": this.refs.txtTowerNo.value,
          "flatNo": this.refs.txtFlatNo.value,
          "vehicleType": this.refs.txtVehicleType.value,
          "vehicleNo": this.refs.txtVehicleNo.value,
          "inTime": (new Date()),
          "outTime": "",
          "gateNo":this.refs.txtGateNo.value,
          "noOfVisitors":this.refs.txtNoOfVisitors.value
        }
      ]
    }

    var key = "visitors-"+ objVisitor.id;
    this.state.visitors[key] = objVisitor;
    this.setState({visitors:this.state.visitors});

    if(!navigator.onLine){
      localStorage.setItem("visitors", JSON.stringify(this.state.visitors));
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
    this.state.vistName=e.currentTarget.value;
    this.setState({vistName: this.state.vistName});
  }

  setContactNo(e){
    this.state.contNo=e.currentTarget.value;
    this.setState({contNo: this.state.contNo});
  }


  render(){
    return (
      <div>
        <section className="content-header">
          <h1>
            Add Visitor
          </h1>
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
                  <li className="active"><a href="#settings" data-toggle="tab">Visitor Detail</a></li>
                </ul>
                <div className="tab-content">

                   <div className="active tab-pane" id="settings">
                    <form className="form-horizontal">

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="txtName" onChange={this.setName} ref="txtName" placeholder="Name"/>
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
                        <label for="inputName" className="col-sm-2 control-label">Visitor Type</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="txtVisitorType" ref="txtVisitorType" placeholder="Visitor Type"/>
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
                        <label for="inputName" className="col-sm-2 control-label">Visit Purpose</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="txtVisitPurpose" ref="txtVisitPurpose" placeholder="Visit Purpose"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Note</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="txtNote" ref="txtNote" placeholder="Note(Optional)"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Person To Meet</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="txtPersonToMeet" ref="txtPersonToMeet" placeholder="Person To Meet"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Tower No</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="txtTowerNo" ref="txtTowerNo" placeholder="Tower No"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Flat No</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="txtFlatNo" ref="txtFlatNo" placeholder="Flat No"/>
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
                        <label for="inputName" className="col-sm-2 control-label">No Of Visitors</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="txtNoOfVisitors" ref="txtNoOfVisitors" placeholder="No Of Visitors"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Frequent Visitor</label>
                        <div className="col-sm-10">
                          <label className="checkbox-inline">
                            <input type="checkbox" name="chkbxFreqVisitor" />   &nbsp;
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button type="submit" className="btn btn-danger pull-right" onClick={this.saveVisitor}>Submit</button>
                        </div>
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

//reactMixin.onClass(AddVisitor, Catalyst.LinkedStateMixin);
reactMixin.onClass(AddVisitor,History);
export default AddVisitor;
