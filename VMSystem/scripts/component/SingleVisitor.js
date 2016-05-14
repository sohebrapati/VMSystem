import React from 'react';

class SingleVisitor extends React.Component{

  render(){

    var checkingDetailsCount = this.props.visitor.checkinDetails.length-1;
    var checkingDetails = this.props.visitor.checkinDetails[checkingDetailsCount];
    // var date = (new Date(checkingDetails.inTime)).toDateString();
    // var today = (new Date()).toDateString();
    var visitorName = (checkingDetails.noOfVisitors != 0 ? (this.props.visitor.name + '+' + checkingDetails.noOfVisitors) : this.props.visitor.name);

      return(
        <div>
            <img src={this.props.visitor.photo} height="50" width="50" />

               {visitorName} | {this.props.visitor.contactNo}

               T{checkingDetails.towerNo}-{checkingDetails.flatNo}
                    | Reason : {checkingDetails.purpose}

            {/*<input type="Submit" value="In" onChange=""></input>*/}
        </div>
      )
  }
}

export default SingleVisitor;
