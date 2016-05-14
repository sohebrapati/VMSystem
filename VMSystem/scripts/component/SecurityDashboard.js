//DisplayVisitor.js goes here

import React from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import DisplayVisitor from './DisplayVisitor';
class SecurityDashboard extends React.Component{

  render(){
    return(
      <div>
        <DisplayVisitor />
      </div>
    )
  }
}

reactMixin.onClass(SecurityDashboard,History);
export default SecurityDashboard;
