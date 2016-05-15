import React from 'react';

class ReportData extends React.Component{

  constructor() {
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
    //var visitorData = this.state.visitors[key];
    return(

      <tr>
        <td>175</td>
        <td>Mike Doe</td>
        <td>11-7-2014</td>
        <td><span class="label label-danger">Denied</span></td>
        <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
      </tr>

    )
  }


}

export default ReportData;
