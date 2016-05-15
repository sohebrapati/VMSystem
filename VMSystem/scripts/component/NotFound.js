
import React from 'react';
import Rebase from 're-base';
import {History} from 'react-router';
import reactMixin from 'react-mixin';





class NotFound extends React.Component{

  render(){
    return(
     <h1>Not Found</h1>
    )
  }
}

reactMixin.onClass(NotFound,History);
export default NotFound;
