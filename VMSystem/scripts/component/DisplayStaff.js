import React from 'react';
// import Rebase from 're-base';
// var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");
import SingleStaff from './SingleStaff';

import autobind from 'autobind-decorator';

@autobind
class DisplayStaff extends React.Component{

  constructor(){
    super();
    this.state ={
      staff:{},
      isStaff:false
    }
  }
  //
  // componentDidMount(){
  //
  //   base.syncState("/staff",{
  //     context:this,
  //     state:'staff'
  //   });
  //
  // }


  displayData(key){
    console.log(key);
    var objStaff = this.props.staff[key];
    console.log(objStaff);
    return <SingleStaff key={key} index={key} staff={objStaff} changeActiveTab={this.props.changeActiveTab} objStaff={this.props.objStaff} />
  }
  render(){
    return(
      <div>
            {Object.keys(this.props.staff).map(this.displayData)}
      </div>

    )
  }
}

export default DisplayStaff;
