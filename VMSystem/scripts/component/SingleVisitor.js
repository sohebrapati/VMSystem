import React from 'react';
import phone from 'react-icons/lib/fa/phone';

class SingleVisitor extends React.Component{

  render(){

    var checkingDetailsCount = this.props.visitor.checkinDetails.length-1;
    var checkingDetails = this.props.visitor.checkinDetails[checkingDetailsCount];
    // var date = (new Date(checkingDetails.inTime)).toDateString();
    // var today = (new Date()).toDateString();
    var inOut = (checkingDetails.outTime == "" ? "Out" : "In");
    var visitorName = (checkingDetails.noOfVisitors != 0 ? (this.props.visitor.name + '+' + checkingDetails.noOfVisitors) : this.props.visitor.name);
    var labelImportant = (this.props.visitor.blacklist ? "label label-important" : "label label-success");
    var isBanned = (this.props.visitor.blacklist ? "Banned" : "");

      return(
        // <div>
        //     <img src={this.props.visitor.photo} height="50" width="50" />
        //
        //        {visitorName} | {this.props.visitor.contactNo}
        //
        //        T{checkingDetails.towerNo}-{checkingDetails.flatNo}
        //             | Reason : {checkingDetails.purpose}
        //
        //     <label> {inOut}</label>
        // </div>

        //comment by Jignesh
        // <li>
				// 		{/*<img className="avatar" alt="No Image" src={this.props.visitor.photo} />
				// 		<strong>{visitorName}</strong> <a href="#">{this.props.visitor.contactNo}</a>
				// 		T{checkingDetails.towerNo}-{checkingDetails.flatNo}, {checkingDetails.purpose}
        //     <strong> | Status:</strong> <span className={labelImportant}> {isBanned}</span>
        //     <label>{inOut}</label>*/}
        //     <img src={this.props.visitor.photo} height="50" width="50" />
        //
        //             {visitorName} | {this.props.visitor.contactNo}
        //
        //             T{checkingDetails.towerNo}-{checkingDetails.flatNo}
        //                  | Reason : {checkingDetails.purpose}
        //
        //          <label> {inOut}</label>
				// </li>

        <li className="menu-fish">
          <img src={this.props.visitor.photo} alt={visitorName} className="imageCurve" />
          <span>
             <span className="visitorName">{visitorName}</span> | <phone> {this.props.visitor.contactNo} </phone> | {this.props.visitor.visitorType}
          </span>
          <p className="visContent">{checkingDetails.purpose} | T{checkingDetails.towerNo}-{checkingDetails.flatNo}</p>
          Hello <phone />? 123
        </li>
      )
  }
}

export default SingleVisitor;
