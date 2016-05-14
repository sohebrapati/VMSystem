


import React from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';

class StaffDashboard extends React.Component{


  render(){
    return(
      <div>
        <h1>  Staff Dashboard </h1>
      </div>
    )
  }
}

reactMixin.onClass(StaffDashboard,History);
export default StaffDashboard;
