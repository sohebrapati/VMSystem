import React from 'react';
import autobind from 'autobind-decorator';
import Rebase from 're-base';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");
import ReportData from './ReportData';

@autobind
class Report extends React.Component{
  constructor(){
    super();
    this.state ={
      visitors:{},
      staff:{},
      isStaff:false,
      reportDisplay:null
    }
  }

  componentDidMount(){

    base.syncState("/visitors",{
      context:this,
      state:'visitors'
    });
  }

  GetReport(e) {
    e.preventDefault();
    var startDate = this.refs.txtDateRange.value;
    if(startDate.indexOf("-") > -1)
    {
      var endDate = startDate.split('-')[1].trim();
      startDate =  startDate.split('-')[0].trim();
      startDate = (new Date(startDate));
      endDate = (new Date(endDate));
      var isDateRange=true;
    }
    var towerNo = this.refs.txtTowerNo.value.trim();
    var isFrequent = this.refs.chkIsFrequent.checked;
    var vehicleNo = this.refs.txtVehicleNo.value.trim();

    var visitorsDetails = this.state.visitors;
    var objVisitors =  Object.keys(this.state.visitors).filter((key)=>{

      var i = 0;
      var singelVisitor = visitorsDetails[key];
      var checkinDetails = singelVisitor.checkinDetails;
      var isFrequentSatisfied = true;
      var isRangeSatisfies = false;
      var isTowerSatisfied = false;
      var isVehicleNoSatisfied = false;

      if(isFrequent && !singelVisitor.frequentVisitor){
          isFrequentSatisfied = false;
          return(
                null
          )
      }
      if(isFrequentSatisfied && vehicleNo != ""){
        for(i=0; i < checkinDetails.length; i++)
        {
          if(checkinDetails[i].vehicleNo.indexOf(vehicleNo) > -1)
          {
              isVehicleNoSatisfied = true;
              break;
          }
        }
      }
      else {
        isVehicleNoSatisfied = true;
      }
      if(isVehicleNoSatisfied && towerNo != ""){
        for(i=0; i < checkinDetails.length; i++)
        {
          if(checkinDetails[i].towerNo.indexOf(towerNo) > -1)
            {
              isTowerSatisfied = true;
              break;
            }
        }
      }
      else {
        isTowerSatisfied = true;
      }
      if(isTowerSatisfied && isDateRange)
      {
        for(i=0; i < checkinDetails.length; i++)
        {
          var inDate = (new Date(checkinDetails[i].inTime));
          var outDate = (new Date(checkinDetails[i].outTime));

          if((inDate >= startDate && inDate <= endDate) || (outDate >= startDate && outDate <= endDate))
          {
            isRangeSatisfies = true;
            break;
          }
        }
      }
      else {
        isRangeSatisfies = true;
      }

      if(isFrequentSatisfied && isRangeSatisfies && isTowerSatisfied && isVehicleNoSatisfied)
      {
        return(
              key
        )
      }
    });

    console.log(objVisitors);
  //  objVisitors.map((value)=> {return <ReportData key={value} />})
  var me = this;
    $.each(objVisitors, function(value){
      me.state.reportDisplay= <ReportData key={value} />
      me.setState({
        reportDisplay:me.state.reportDisplay
      });
    });

  }

  render(){
      return(
        <div class="col-md-6">
          <div class="box box-primary">
            <div class="box-header">
              <h3 class="box-title">Select Report Criteria</h3>
            </div>
            <div class="box-body">
              <div class="form-group">

                  <label>Date range:</label>
                  <span class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-calendar"></i>
                    </div>
                    <input type="text" class="form-control pull-right" id="reservation" ref="txtDateRange"/>
                  </span>

                      <span class="input-group">
                        <label>Tower:</label>
                        <input type="text" ref="txtTowerNo"/>
                      </span>
                      <span class="input-group">
                        <label>Is Frequent:</label>
                        <input type="checkbox" ref="chkIsFrequent"/>
                      </span>
                      <span class="input-group">
                        <label>Vehicle No.:</label>
                        <input type="text" ref="txtVehicleNo"/>
                      </span>
                      <span class="input-group">
                        <input type="submit" value="Get Report" ref="btnGetReport" onClick={this.GetReport}></input>
                      </span>


              </div>
            </div>
          </div>

          {/*<div>
            <ul>
              <ReportData />
            </ul>
          </div>*/}
          <div class="col-xs-12">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Visitor Details</h3>
                  <div class="box-tools">
                    <div class="input-group">
                      {/*<input type="text" name="table_search" class="form-control input-sm pull-right" placeholder="Search"/>*/}
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-default"><i class="fa fa-search"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="box-body table-responsive no-padding">
                  <table class="table table-hover">
                    <tbody>
                    {this.state.reportDisplay}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

        </div>


      )
  }
}

export default Report;
