import React from 'react';
import autobind from 'autobind-decorator';
import Rebase from 're-base';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");

@autobind
class AddVisitor extends React.Component {

 constructor(){
    super();
    this.state={
        visitors:{},
      data_uri:null
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
    var objVisitor =    {
      "id":"5",
      "name": this.refs.txtName.value,
      "photo": this.state.data_uri,
      "contactNo": this.refs.txtContact.value,
      "idProof": "Voter Id",
      "idProofNo": "488s4d8s45f",
      "visitorType": "House Keeping",
      "gender":"M",
      "count":1,
      "blacklist":false,
      "frequentVisitor":false,
      "checkinDetails": [
        {
          "purpose": "Cooking",
          "notes":"",
          "personToMeet": "Soheb Rapati",
          "towerNo": "1",
          "flatNo": "402",
          "vehicalType": "Scooter",
          "vehicalNo": "MH13GK2837",
          "inTime": "18:22",
          "outTime": "",
          "gateNo":"8",
          "noOfVisitors":1
        }
      ]
    }

    var key = "visitors-"+ (new Date()).getTime();
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

  render(){
    return (
      <form className="form-horizontal" role="form" ref="formAddVisitor">

      <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="txtName">Name:</label>
      <div className="col-sm-10">
      <input type="text" className="form-control" id="txtName" ref="txtName" placeholder="Enter name"/>
      </div>
      </div>

      <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="txtContact">Contact No:</label>
      <div className="col-sm-10">
      <input type="text" className="form-control" id="txtContact" ref="txtContact" placeholder="Enter Contact No"/>
      </div>
      </div>

      <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="filePhoto">Photo</label>
      <div className="col-sm-10">
      <input type="file" className="form-control-file" id="filePhoto" onChange={this.handleFile}  />
      <img className='image-preview' src={this.state.data_uri} />
      </div>
      </div>


      <div className="form-group">
      <div className="col-sm-offset-2 col-sm-10">
      <button type="submit" className="btn btn-default" onClick={this.saveVisitor}>Submit</button>
      </div>
      </div>
      </form>
    )
  }
}

export default AddVisitor;
