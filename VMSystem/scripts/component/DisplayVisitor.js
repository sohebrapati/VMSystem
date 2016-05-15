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
    return <SingleVisitor key={key} index={key} visitor={objVisitor}  />
  }
  render(){
    return(
      // <div class="box span4" ontablet="span6" ondesktop="span4">
      //   <div class="box-content">
      //     <ul className="dashboard-list">
      //           {Object.keys(this.state.visitors).map(this.displayData)}
      //     </ul>
      //   </div>
      // </div>

      // comment by Jignesh
      // <div class="box span4" ontablet="span6" ondesktop="span4">
			// 		<div class="box-header">
			// 			<h2><i class="halflings-icon white user"></i><span class="break"></span>Visitors List</h2>
			// 			<div class="box-icon">
			// 				<a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
			// 				<a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
			// 			</div>
			// 		</div>
			// 		<div class="box-content">
			// 			<ul class="dashboard-list">
			// 			      {Object.keys(this.state.visitors).map(this.displayData)}
			// 			</ul>
			// 		</div>
			// 	</div>

      <div>
        <section className="content-header">
          <h1>List of Visitors</h1>
        </section>
        <section className="content">
          <div className="box box-primary">
            <div className="panel panel-default">
              <ul className="list-group">
                {Object.keys(this.state.visitors).map(this.displayData)}
              </ul>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default DisplayVisitor;
