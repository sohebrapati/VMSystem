import React from 'react';
import autobind from 'autobind-decorator';
import Rebase from 're-base';
//var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");
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

    // base.syncState("/visitors",{
    //   context:this,
    //   state:'visitors'
    // });
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

    var visitorsDetails = this.props.visitors;
    var objVisitors =  Object.keys(this.props.visitors).filter((key)=>{

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

      var visitorData = me.props.visitors[value];
      var checkinDetails ="";
      if(visitorData.checkinDetails.length > 0)
      {
        checkinDetails = visitorData.checkinDetails[visitorData.checkinDetails.length-1];
      }
      var isRestricted = (visitorData.blacklist ? "true" : "false");
      var classNameDanger = (visitorData.blacklist ? "label label-danger" : "label");

      var rd = "<tr><td>" + visitorData.name + (checkinDetails.noOfVisitors!="" ? "+" + checkinDetails.noOfVisitors : "") + "</td>"+
        "<td>"+ visitorData.contactNo +"</td>"+
        "<td>"+ (checkinDetails.personToMeet ? checkinDetails.personToMeet : "") +"</td>"+
        "<td>"+ visitorData.visitorType +"</td>"+
        "<td visible='"+ !isRestricted +"' ><span className='"+ classNameDanger +"'>Not Allowed</span></td>"+
        "<td>T"+ (checkinDetails.towerNo ? checkinDetails.towerNo : "") + "-"+ (checkinDetails.flatNo ? checkinDetails.flatNo: "") +"</td>"+
        "<td>"+ (checkinDetails.purpose ? checkinDetails.purpose : "") +"</td>"+
        "<td>"+ (checkinDetails.VehicleType ? checkinDetails.VehicleType+"  " : "") + (checkinDetails.vehicleNo ? checkinDetails.vehicleNo: "") +"</td>"+
        "<td>"+ (checkinDetails.inTime ? (new Date(checkinDetails.inTime)).toLocaleString() : "") +"</td>"+
        "<td>"+ (checkinDetails.outTime ? (new Date(checkinDetails.outTime)).toLocaleString() : "") +"</td>"+
        "</tr>";

      $('#reportDisplaytBody').append(rd);
      $('#reportDiv').show();
    });
  }

  render(){
      return(
        <div>
        <section className="content">
          <div className="row">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Reports</h3>
                  <div className="box-tools pull-right">
                    <button className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                  </div>
                </div>
                <form role="form">
                  <div className="box-body">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Date range:</label>
                      <span className="input-group">
                        <div className="input-group-addon">
                          <i className="fa fa-calendar"></i>
                        </div>
                        <input type="text" className="form-control pull-right" id="reservation" ref="txtDateRange"/>
                      </span>
                    </div>

                    <div className="form-group">
                      <label for="exampleInputPassword1">Tower:</label>
                      <input type="text" className="form-control" id="txtTowerNo" ref="txtTowerNo" placeholder="Tower"/>
                    </div>

                    <div className="form-group">
                      <label for="exampleVehicleNo">Vehicle No.:</label>
                      <input type="text" className="form-control" id="txtVehicleNo" ref="txtVehicleNo" placeholder="Vehicle No"/>
                    </div>
                    <div className="form-group">
                      <label for="exampleVehicleNo">Visitor Type:</label>
                      <input type="text" className="form-control" id="txtVisitorType" ref="txtVisitorType" placeholder="Vehicle Type"/>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" id="chkIsFrequent" ref="chkIsFrequent"/> Frequent
                      </label>
                    </div>

                  </div>
                  <div className="box-footer">
                    <button type="submit" className="btn btn-danger pull-left" onClick={this.clearReport}>Clear</button>
                    <button type="submit" className="btn btn-primary pull-right" onClick={this.GetReport}>Get Report</button>
                  </div>
                </form>
              </div>

              <div className="box box-primary">
                <div className="box-header with-border">
                <div className="col-xs-12"  id="reportDiv" visible="false" hidden="true">
             <div className="box">
               <div className="box-header">
                 <h3 className="box-title">Visitor Details</h3>
                 <div className="box-tools">
                   <div className="input-group">
                     {/*<input type="text" name="table_search" class="form-control input-sm pull-right" placeholder="Search"/>*/}
                     <div className="input-group-btn">
                       {/*<button class="btn btn-sm btn-default"><i class="fa fa-search"></i></button>*/}
                     </div>
                  </div>
                 </div>
              </div>
               <div className="box-body table-responsive no-padding">
                <table className="table table-hover">
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
              </div>
          </div>
        </section>
        </div>
      )
  }
}

export default Report;
