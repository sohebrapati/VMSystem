import React from 'react';

class SingleStaff extends React.Component{



  render(){
    console.log(this.props.staff.name);
    return(
      <li className="menu-fish" >
      <div className="row">
      <div className="col-lg-5">
      <div className="media">
      <a className="pull-left" href="#">
      <img className="media-object dp img-circle imageUser" src={this.props.staff.photo} />
      </a>
      <div className="media-body">
      <h4 className="media-heading"> {this.props.staff.name} <small> India</small></h4>
      </div>
      </div>
      </div>

      </div>
      </li>
      
    )
  }
}

export default SingleStaff;
