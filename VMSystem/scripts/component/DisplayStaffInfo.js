import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class DisplayStaffInfo extends React.Component{


  render(){
    var vis = this.props.staff;
    var checkingDetailsCount = vis.checkinDetails.length-1;
    var checkingDetails = vis.checkinDetails[checkingDetailsCount];
    var visitorName = (checkingDetails.noOfVisitors != 0 ? (vis.name + '+' + checkingDetails.noOfVisitors) : vis.name);
    var divHeader = (vis.blacklist ? "widget-user-header bg-red-gradient" : "widget-user-header bg-aqua-gradient");
    var divBadge = (vis.blacklist ? "pull-right badge bg-aqua" : "pull-right badge bg-red");
    var noOfVisitor = checkingDetails.noOfVisitors == 0 ? "" : checkingDetails.noOfVisitors;
    return (
          <div className="row">
            <div className="box box-primary box-widget widget-user-2">
              <div className={divHeader} >
                <div className="widget-user-image">
                  <img className="media-object img-circle display-info" src={vis.photo} alt={visitorName} />
                </div>
                <h3 className="widget-user-username">{vis.name}<span className={divBadge}>{noOfVisitor}</span></h3>
                <h5 className="widget-user-desc">Contact No: {vis.contactNo}</h5>
              </div>
              <div className="box-footer no-padding">
                <ul className="nav nav-stacked">
                  <li><a><span><b>Check In:</b>&nbsp;&nbsp; {checkingDetails.inTime}</span></a></li>
                  <li><a><span><b>Id Proof:</b>&nbsp;&nbsp; {vis.idProofType} - {vis.idProofNo}</span></a></li>
                  <li><a><span><b>Vehicle:</b>&nbsp;&nbsp; {checkingDetails.vehicleType} - {checkingDetails.vehicleNo}</span></a></li>
                  <li><a><span><b>Gate:</b>&nbsp;&nbsp; {checkingDetails.gateNo}</span></a></li>
                </ul>
              </div>
            </div>
          </div>

    )
  }
}

export default DisplayStaffInfo;
