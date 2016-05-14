import React from 'react';
import Rebase from 're-base';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");

import SingleVisitor from './SingleVisitor';

import autobind from 'autobind-decorator';

@autobind
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


  displayData(key){
    console.log(key);
    var objVisitor = this.state.visitors[key];
    console.log(objVisitor);
    return <SingleVisitor key={key} index={key} visitor={objVisitor} />
  }
  render(){
    return(
      <div>
            {Object.keys(this.state.visitors).map(this.displayData)}          
      </div>

    )
  }
}

export default DisplayVisitor;
