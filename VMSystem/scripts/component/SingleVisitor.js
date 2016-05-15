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
      // <div className='box-comment'>
      //   <img className='media-object dp img-circle imageUser' src='public/dist/img/user5-128x128.jpg' alt='user image' />
      //   <div className='comment-text'>
      //     <span className="username">
      //       Nora Havisham
      //       <span className='text-muted pull-right'>8:03 PM Today</span>
      //     </span>
      //     The point of using Lorem Ipsum is that it has a more-or-less
      //     normal distribution of letters, as opposed to using
      //     'Content here, content here', making it look like readable English.
      //   </div>
      // </div>
      <div>
      <Modal isOpen={this.state.modalIsOpen}
             onAfterOpen={this.afterOpenModal}
             onRequestClose={this.closeModal}
             style={customStyles} >
       <DisplayInfo visitor={this.props.visitor}/>
      </Modal>
    <li className="list-group-item hand-mouse"  onClick={this.openModal}>
    <div className="box-comment">
      {/*}<div className="col-lg-5">*/}
        <div className="media">
          <a className="pull-left">
              <img className="media-object dp img-circle imageUser" src={this.props.visitor.photo} />
          </a>
          <div className="pull-right circle-singleline btn-danger">OUT</div>
          <div className="media-body">
              <h3 className="media-heading">{visitorName}</h3>
              <h4 className="media-heading">{this.props.visitor.contactNo}&nbsp;&nbsp;|&nbsp;&nbsp;Tower {checkingDetails.towerNo} - {checkingDetails.flatNo}</h4>
              <h5 className="media-heading">Reason - {checkingDetails.note}</h5>
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
