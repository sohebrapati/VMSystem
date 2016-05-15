import React from 'react';
import phone from 'react-icons/lib/fa/phone';
import autobind from 'autobind-decorator';
 import DisplayStaffInfo from './DisplayStaffInfo';
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
class SingleStaff extends React.Component{

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

  editStaffData(){
    this.props.changeActiveTab(false,true,this.props.index);
  }

  render(){
    var checkingDetailsCount = this.props.staff.checkinDetails.length-1;
    var checkingDetails = this.props.staff.checkinDetails[checkingDetailsCount];
    // var date = (new Date(checkingDetails.inTime)).toDateString();
    // var today = (new Date()).toDateString();
    var inOut = (checkingDetails.outTime == "" ? "Out" : "In");
    var visitorName = (checkingDetails.noOfVisitors != 0 ? (this.props.staff.name + '+' + checkingDetails.noOfVisitors) : this.props.staff.name);
    var labelImportant = (this.props.staff.blacklist ? "label label-important" : "label label-success");
  //  var isBanned = (this.props.visitor.blacklist ? "Banned" : "");


    var isBanned = (this.props.staff.blacklist ? "bg-danger" : "");

    return(
      <div>
      <Modal isOpen={this.state.modalIsOpen}
             onAfterOpen={this.afterOpenModal}
             onRequestClose={this.closeModal}
             style={customStyles} >
       <DisplayStaffInfo staff={this.props.staff}/>
      </Modal>
    <li className="list-group-item hand-mouse"  onDoubleClick={this.openModal}>
    <div className="box-comment">
      {/*}<div className="col-lg-5">*/}
        <div className="media">
          <a className="pull-left">
              <img className="media-object dp img-circle imageUser" src={this.props.staff.photo} />
          </a>
          <div className="pull-right circle-singleline btn-danger" onClick={this.editStaffData}>Edit</div>
          <div className="media-body">
              <h3 className="media-heading">{this.props.staff.name}</h3>
              <h4 className="media-heading">{this.props.staff.contactNo}&nbsp;&nbsp;|&nbsp;&nbsp; Date Of Joining : {this.props.staff.dateOfJoining}</h4>
              <h5 className="media-heading">Designation - {this.props.staff.designation}</h5>
          </div>

        {/*</div>*/}
      </div>
    </div>
    </li>
</div>
    )
  }
}

export default SingleStaff;
