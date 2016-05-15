import React from 'react';
import Rebase from 're-base';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");
import autobind from 'autobind-decorator';




@autobind
class DisplayInfo extends React.Component{


  render(){
    var vis = this.props.visitor;
    return (

        <div>Visitor Info goes here!!!</div>

    )
  }
}

export default DisplayInfo;
