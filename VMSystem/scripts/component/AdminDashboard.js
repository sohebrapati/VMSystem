

import React from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';

class AdminDashboard extends React.Component{


  render(){
    return(
      <div>
        <h1>  Admin Dashboard </h1>
      </div>
    )
  }
}

reactMixin.onClass(AdminDashboard,History);
export default AdminDashboard;
