import React from 'react';

import Rebase from 're-base';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");

import Staff from '../component/Staff';
class App extends React.Component{

  constructor(){
    super();
    this.state ={
      visitors:{},
      staff:{},
      isStaff:false
    }
  }

  componentDidMount(){

    base.syncState("/visitors",{
      context:this,
      state:'visitors'
    });
    base.syncState("/staff",{
      context:this,
      state:'staff'
    });

    if(navigator.onLine){
      var localStorageVisitors = JSON.parse(localStorage.getItem("visitors"));
      if(localStorageVisitors){
        this.setState({
          visitors:localStorageVisitors
        });
      }
    }

  }

  saveData(e){
    e.preventDefault();
    var refs = this.refs;
    var objVisitor={
      id: (new Date()).getTime(),
      name:refs.usr.value,
      sname:refs.lName.value,
      cNo:"9784561253"
    }

    if(this.state.isStaff){
       objVisitor.email=refs.child.refs.email.value;
       objVisitor.password = refs.child.refs.pwd.value;
       var objExist =   this.state.staff.filter((val)=>{return val== objVisitor.email});
       if(objExist.length==0){
         var key = "Emp-"+ (new Date()).getTime();
         this.state.staff[key] = objVisitor;
         this.setState({staff:this.state.staff});
       }
       else{
            alert('Email already exist...')
       }
    }
    else{
      var key = "visitors-"+ (new Date()).getTime();
      this.state.visitors[key] = objVisitor;
      this.setState({visitors:this.state.visitors});
    }


    if(!navigator.onLine){
      localStorage.setItem("visitors", JSON.stringify(this.state.visitors));
      localStorage.setItem("staff", JSON.stringify(this.state.staff));
    }
    else{
      console.log("connected");
    }
  }

  onRadioChange(e){

    var radio = $('input[name="rStaff"]:checked');
    this.state.isStaff = radio[0].value=="isStaff"?true:false;
    this.setState({
      isStaff : this.state.isStaff
    });
  }
  render(){


    return(
      <form id="addForm">
      <div className="container-fluid">
      <div className="radio">
      <label><input type="radio" name="rStaff" value="isStaff" onChange={this.onRadioChange.bind(this)}/>Staff</label>
      </div>
      <div className="radio">
      <label><input type="radio" name="rStaff" value="isVisitor" onChange={this.onRadioChange.bind(this)}/>visitors</label>
      </div>
      <div className="form-group">
      <label htmlFor="usr">Name:</label>
      <input type="text" className="form-control" ref="usr"/>
      </div>
      <div className="form-group">
      <label htmlFor="pwd">Last Name:</label>
      <input type="text" className="form-control" ref="lName"/>
      </div>
      <div hidden={!this.state.isStaff} >
      <Staff ref="child"/>
      </div>
      <button type="submit" onClick={this.saveData.bind(this)} >Submit</button>
      <span className="ErrorMsg">

      </span>
      </div>

      </form>

    )
  }
}

export default App;
