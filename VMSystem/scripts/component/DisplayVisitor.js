import React from 'react';
import Rebase from 're-base';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");

class DisplayVisitor extends React.Component{

  constructor(){
    super();
    this.state ={
      visitors:{},
      staff:{},
      isStaff:false
    }
  }

  componentDidMount(){

    base.syncState("/visitors",{
      context:this,
      state:'visitors'
    });

  }

  render(){
    return(
      <div>
         dsafsda f
      </div>

    )
  }
}

export default DisplayVisitor;
