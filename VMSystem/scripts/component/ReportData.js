import React from 'react';
import autobind from 'autobind-decorator';
import Rebase from 're-base';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");

class ReportData extends React.Component{

  constructor() {
    super();
    this.state ={
      visitors:{},
      staff:{},
      isStaff:false
    }
  }
  // componentDidMount(){
  //
  //   base.syncState("/visitors",{
  //     context:this,
  //     state:'visitors'
  //   });
  // }

  render(){
    var reportData = this.props.state;
    var visitorData = reportData.state.visitors[this.props.visitors];
    var checkinDetails = visitorData.checkinDetails;
    var isRestricted = (visitorData.blacklist ? "true" : "false");
    var classDanger = (visitorData.blacklist ? "label label-danger" : "label");
    return(

      <tr>
        <td>{visitorData.name}</td>
        <td>{visitorData.contactNo}</td>
        <td>{visitorData.visitorType}</td>
        <td><span class={classDanger}>Denied</span></td>
        <td>T{checkinDetails[0].towerNo} - {checkinDetails[0].flatNo}</td>
        <td>T{checkinDetails[0].purpose}</td>
      </tr>

    )
  }


}

export default ReportData;
