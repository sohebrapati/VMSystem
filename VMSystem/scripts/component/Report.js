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
      reportDisplay:''
    }
  }

  componentDidMount(){

    base.syncState("/visitors",{
      context:this,
      state:'visitors'
    });
  }
  clearReport(){
    this.refs.txtTowerNo.value = "";
    this.refs.chkIsFrequent.checked = false;
    this.refs.txtVehicleNo.value = "";
    this.refs.txtVisitorType.value = "";
    this.refs.txtDateRange.value = "";
    $('#reportDiv').hide();
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
      endDate.setDate(endDate.getDate() + 1);
      var isDateRange=true;
    }
    var towerNo = this.refs.txtTowerNo.value.trim();
    var isFrequent = this.refs.chkIsFrequent.checked;
    var vehicleNo = this.refs.txtVehicleNo.value.trim().toLowerCase();
    var visType =  this.refs.txtVisitorType.value.trim().toLowerCase();

    var visitorsDetails = this.state.visitors;
    var objVisitors =  Object.keys(this.state.visitors).filter((key)=>{

      var i = 0;
      var singelVisitor = visitorsDetails[key];
      var checkinDetails = singelVisitor.checkinDetails;
      var tempCheckin = [];
      var isFrequentSatisfied = true;
      var isRangeSatisfied = false;
      var isTowerSatisfied = false;
      var isVehicleNoSatisfied = false;
      var isVisTypeSatisfied = true;

      if(isFrequent && !singelVisitor.frequentVisitor){
          isFrequentSatisfied = false;
          return;
      }

      if(isFrequentSatisfied && vehicleNo != ""){
        for(i=checkinDetails.length-1; i >= 0; i--)
        {
          if(checkinDetails[i].vehicleNo.toLowerCase().indexOf(vehicleNo) > -1)
          {
              isVehicleNoSatisfied = true;
              break;
          }
          tempCheckin.push(checkinDetails[i]);
          checkinDetails.pop(i);
        }
      }
      else {
        isVehicleNoSatisfied = true;
      }

      if(isVehicleNoSatisfied && towerNo != ""){
        for(i=checkinDetails.length-1; i >= 0; i--)
        {
          if(towerNo.indexOf(checkinDetails[i].towerNo) > -1)
            {
              isTowerSatisfied = true;
              break;
            }
            tempCheckin.push(checkinDetails[i]);
            checkinDetails.pop(i);
        }
      }
      else {
        isTowerSatisfied = true;
      }

      if(isTowerSatisfied && isDateRange)
      {
        for(i=checkinDetails.length-1; i >= 0; i--)
        {
          var inDate = (new Date(checkinDetails[i].inTime));
          var outDate = (new Date(checkinDetails[i].outTime));

          if((inDate >= startDate && inDate <= endDate) || (outDate >= startDate && outDate <= endDate))
          {
            isRangeSatisfied = true;
            break;
          }
          tempCheckin.push(checkinDetails[i]);
          checkinDetails.pop(i);
        }
      }
      else {
        isRangeSatisfied = true;
      }

      if(isRangeSatisfied && visType != "" &&
              (
                ( (visType.toLowerCase().indexOf(singelVisitor.visitorType.toLowerCase()) == -1)&&
                  (singelVisitor.visitorType.toLowerCase().indexOf(visType.toLowerCase()) == -1)
                ) || singelVisitor.visitorType.trim() == ""
              )
          ){
          isVisTypeSatisfied = false;
      }

      if(isFrequentSatisfied && isRangeSatisfied && isTowerSatisfied && isVehicleNoSatisfied && isVisTypeSatisfied)
      {
        return(
              key
        )
      }
      else {
        if(tempCheckin.length > 0)
          singelVisitor.checkinDetails = tempCheckin;
      }
    });

    console.log(objVisitors);
    if(objVisitors.length == 0)
      $('#reportDiv').hide();
  //  objVisitors.map((value)=> {return <ReportData key={value} />})
  var me = this;
  $('#reportDisplaytBody').html('');
  me.state.reportDisplay = '';
    $.each(objVisitors, function(index,value){

      var visitorData = me.state.visitors[value];
      var checkinDetails ="";
      if(visitorData.checkinDetails.length > 0)
      {
        checkinDetails = visitorData.checkinDetails[visitorData.checkinDetails.length-1];
      }
      var isRestricted = (visitorData.blacklist ? "true" : "false");
      var classDanger = (visitorData.blacklist ? "label label-danger" : "label");

      var rd = "<tr><td>" + visitorData.name + (checkinDetails.noOfVisitors!="" ? "+" + checkinDetails.noOfVisitors : "") + "</td>"+
        "<td>"+ visitorData.contactNo +"</td>"+
        "<td>"+ (checkinDetails.personToMeet ? checkinDetails.personToMeet : "") +"</td>"+
        "<td>"+ visitorData.visitorType +"</td>"+
        "<td visible='"+ !isRestricted +"' ><span class='"+ classDanger +"'>Not Allowed</span></td>"+
        "<td>T"+ (checkinDetails.towerNo ? checkinDetails.towerNo : "") + "-"+ (checkinDetails.flatNo ? checkinDetails.flatNo: "") +"</td>"+
        "<td>"+ (checkinDetails.purpose ? checkinDetails.purpose : "") +"</td>"+
        "<td>"+ (checkinDetails.VehicleType ? checkinDetails.VehicleType+"  " : "") + (checkinDetails.vehicleNo ? checkinDetails.vehicleNo: "") +"</td>"+
        "<td>"+ (checkinDetails.inTime ? checkinDetails.inTime : "") +"</td>"+
        "<td>"+ (checkinDetails.outTime ? checkinDetails.outTime : "") +"</td>"+
        "</tr>";

      $('#reportDisplaytBody').append(rd);
      $('#reportDiv').show();
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
                        <label>Frequent:</label>
                        <input type="checkbox" ref="chkIsFrequent"/>
                      </span>
                      <span class="input-group">
                        <label>Vehicle No.:</label>
                        <input type="text" ref="txtVehicleNo"/>
                      </span>

                      <span class="input-group">
                        <label>Visitor Type: </label>
                        <input type="text" ref="txtVisitorType"/>
                      </span>

                      <span class="input-group">
                        <input type="submit" value="Get Report" ref="btnGetReport" onClick={this.GetReport}></input>
                        <input type="submit" value="Clear" ref="btnClearReport" onClick={this.clearReport}></input>
                      </span>


              </div>
            </div>
          </div>

          {/*<div>
            <ul>
              <ReportData />
            </ul>
          </div>*/}
          <div class="col-xs-12"  id="reportDiv" visible="false" hidden="true">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Visitor Details</h3>
                  <div class="box-tools">
                    <div class="input-group">
                      {/*<input type="text" name="table_search" class="form-control input-sm pull-right" placeholder="Search"/>*/}
                      <div class="input-group-btn">
                        {/*<button class="btn btn-sm btn-default"><i class="fa fa-search"></i></button>*/}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="box-body table-responsive no-padding">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <td>Visitor Name</td>
                        <td>Contact No.</td>
                        <td>Person To Meet</td>
                        <td>Type</td>
                        <td>Is Allowed</td>
                        <td>Tower-Flat</td>
                        <td>Purpose</td>
                        <td>Vehicle</td>
                        <td>In Time</td>
                        <td>Out Time</td>
                      </tr>
                    </thead>
                    <tbody id="reportDisplaytBody">
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
