import React from 'react';
import phone from 'react-icons/lib/fa/phone';
import autobind from 'autobind-decorator';
import DisplayInfo from './DisplayInfo';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : '2px solid rgb(204, 204, 204)',
    borderRadius         : '10px',
    padding: '0px 15px'

  }
};

@autobind
class SingleVisitor extends React.Component{

    constructor(){
       super();
       this.state={
           modalIsOpen: false
       }
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    checkinVisitor(){

      var value = JSON.parse(JSON.stringify(this.props.visitor.checkinDetails[0]));
      value.inTime = (new Date()).toString();
      value.outTime = "";
      this.props.checkinVisitor(this.props.index, value);
    }
    checkOutVisitor(e){
      e.preventDefault();
      this.props.updateVisitor(this.props.index);

      // var visitor = this.props.stateVisitor[this.props.index];
      // var checkingDetails = visitor.checkinDetails;
      // // var objCheckinDetail = '';
      //
      // checkingDetails[checkingDetails.length-1].outTime = (new Date());
      // alert(checkingDetails[checkingDetails.length-1].outTime);
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

    var inOutCss = (inOut == "In" ? "pull-right circle-singleline label-success" : "pull-right circle-singleline label-important")
    var isBanned = (this.props.visitor.blacklist ? "bg-danger" : "");

    return(
      <div>
      <Modal isOpen={this.state.modalIsOpen}
             onAfterOpen={this.afterOpenModal}
             onRequestClose={this.closeModal}
             style={customStyles} >
       <DisplayInfo visitor={this.props.visitor}/>
      </Modal>
    <li className="list-group-item hand-mouse"  onDoubleClick={this.openModal}>
    <div className="box-comment">
      {/*}<div className="col-lg-5">*/}
        <div className="media">
          <a className="pull-left">
              <img className="media-object dp img-circle imageUser" src={this.props.visitor.photo} />
          </a>
          <div className={inOutCss} onClick={inOut == "In" ? this.checkinVisitor : this.checkOutVisitor}>{inOut}</div>
          <div className="media-body">
              <h3 className="media-heading">{visitorName}</h3>
              <h4 className="media-heading">{this.props.visitor.contactNo}&nbsp;&nbsp;|&nbsp;&nbsp;Tower {checkingDetails.towerNo} - {checkingDetails.flatNo}</h4>
              <h5 className="media-heading">Reason - {checkingDetails.purpose}</h5>
          </div>

        {/*</div>*/}
      </div>
    </div>
    </li>
</div>


    )


  }
}

export default SingleVisitor;
