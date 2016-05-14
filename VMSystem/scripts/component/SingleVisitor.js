import React from 'react';
import phone from 'react-icons/lib/fa/phone';

class SingleVisitor extends React.Component{

 onClick(){
   alert('test');
 }

  render(){

    var checkingDetailsCount = this.props.visitor.checkinDetails.length-1;
    var checkingDetails = this.props.visitor.checkinDetails[checkingDetailsCount];
    // var date = (new Date(checkingDetails.inTime)).toDateString();
    // var today = (new Date()).toDateString();
    var inOut = (checkingDetails.outTime == "" ? "Out" : "In");
    var visitorName = (checkingDetails.noOfVisitors != 0 ? (this.props.visitor.name + '+' + checkingDetails.noOfVisitors) : this.props.visitor.name);
    var labelImportant = (this.props.visitor.blacklist ? "label label-important" : "label label-success");
  //  var isBanned = (this.props.visitor.blacklist ? "Banned" : "");


    var isBanned = (this.props.visitor.blacklist ? "bg-danger" : "");

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

      // <li className="menu-fish">
      //   <img src={this.props.visitor.photo} alt={visitorName} className="imageCurve" />
      //   <span>
      //      <span className="visitorName">{visitorName}</span> | <phone> {this.props.visitor.contactNo} </phone> | {this.props.visitor.visitorType}
      //   </span>
      //   <p className="visContent">{checkingDetails.purpose} | T{checkingDetails.towerNo}-{checkingDetails.flatNo}</p>
      //   Hello <phone />? 123
      // </li>

      // <li className="menu-fish">
      // <img src={this.props.visitor.photo} alt={visitorName} className="imageCurve" />
      // <div class="list-group">
      // <a href="#" class="list-group-item active">
      // <h4 class="list-group-item-heading">{visitorName}</h4>
      // <p class="list-group-item-text">{this.props.visitor.visitorType}</p>
      // </a>
      // </div>
      // </li>



      <li className="menu-fish" onClick={this.onClick}>

      <div className="row">


    <div className="col-lg-5">
        <div className="media">
            <a className="pull-left" href="#">
                <img className="media-object dp img-circle imageUser" src="https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm" />
            </a>
            <div className="media-body">
                <h4 className="media-heading">Hardik Sondagar <small> India</small></h4>
            </div>
        </div>

    </div>



</div>
      </li>
    )


  }
}

export default SingleVisitor;
