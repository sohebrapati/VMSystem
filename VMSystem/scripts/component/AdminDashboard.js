//DisplayStaff.js goes here

import React from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import DisplayStaff from './DisplayStaff';
import AddStaff from './AddStaff';
import NotFound from './NotFound';
import autobind from 'autobind-decorator';
import Catalyst from 'react-catalyst';

import Rebase from 're-base';
var base = Rebase.createClass("https://jigneshdb.firebaseio.com/");

@autobind
class AdminDashboard extends React.Component{

  constructor(){
    super();
    this.state ={
      staff: {},
      isStaffDisplay:false,
      activeTab1:true,
      activeTab2:false,
    addStaffThis:{},
      objStaff:{
        "id": "",
        "name": "",
        "photo": "",
        "contactNo": "",
        "idProofType": "",
        "idProofNo": "",
        "designation": "",
        "gender":"",
        "department":"",
        "dateOfBirth":"",
        "dateOfJoin":"",
        "email":"",
        "password":"",
        "checkinDetails": [
          {
            "vehicleType": "",
            "vehicleNo": "",
            "inTime": "",
            "outTime": "",
            "gateNo":"",
          }
        ]
      }
    }

    //JSON.parse(localStorage.getItem("staff"))
  }

  getChildComp(objThis){
   if(objThis.state.isAddStaff){
     this.state.addStaffThis = objThis;
     this.setState({addStaffThis:this.state.addStaffThis});
   }
  }

  changeActiveTab(tab1,tab2,key){
     this.state.activeTab1 = tab1;
     this.setState({activeTab1:this.state.activeTab1});
     this.state.activeTab2 = tab2;
     this.setState({activeTab2:this.state.activeTab2});

    //  if(key !=""){
    //    this.state.objStaff = this.state.staff[key];
    //    this.setState({objStaff:this.state.objStaff});
    //  }

  }

  addStaffData(objStaff){
    var key = "emp-"+ objStaff.id;
    this.state.staff[key] = objStaff;
    this.setState({staff:this.state.staff});
    alert("Data inserted...");
  }

  componentDidMount(){
    base.syncState("/staff",{
      context:this,
      state:'staff'
    });

  }

 displayAddStaff(e){
   e.preventDefault();
  //  this.state.isStaffDisplay = true;
  //  this.setState({
  //     isStaff:this.state.isStaffDisplay
  //  });
  this.history.pushState(null,'/');
 }

  render(){
    // var tabActive = (this.state.activeTab1? "active" : "");
    // var tabItemActive = (this.state.ActiveCls? "active tab-pane" : "tab-pane");
    //
    // var v1 = this.state.ActiveCls

    return(

      <div className="wrapper hold-transition skin-blue sidebar-mini">
        <header className="main-header">
          <a href="index.html" className="logo">
          <span className="logo-mini"><b>V</b>MS</span>
           <span className="logo-lg"><b>Cakewalk</b>VMS</span>
          </a>
          <nav className="navbar navbar-static-top" role="navigation">
            <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
              <span className="sr-only">Toggle navigation</span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown messages-menu">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-envelope-o"></i>
                    <span className="label label-success">4</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 4 messages</li>
                    <li>
                      <ul className="menu">
                        <li>
                          <a href="#">
                            <div className="pull-left">
                              <img src="public/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              Support Team
                              <small><i className="fa fa-clock-o"></i> 5 mins</small>
                            </h4>
                            <p>Why not buy a new awesome theme?</p>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <div className="pull-left">
                              <img src="public/dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              AdminLTE Design Team
                              <small><i className="fa fa-clock-o"></i> 2 hours</small>
                            </h4>
                            <p>Why not buy a new awesome theme?</p>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <div className="pull-left">
                              <img src="public/dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              Developers
                              <small><i className="fa fa-clock-o"></i> Today</small>
                            </h4>
                            <p>Why not buy a new awesome theme?</p>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <div className="pull-left">
                              <img src="public/dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              Sales Department
                              <small><i className="fa fa-clock-o"></i> Yesterday</small>
                            </h4>
                            <p>Why not buy a new awesome theme?</p>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <div className="pull-left">
                              <img src="public/dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              Reviewers
                              <small><i className="fa fa-clock-o"></i> 2 days</small>
                            </h4>
                            <p>Why not buy a new awesome theme?</p>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="footer"><a href="#">See All Messages</a></li>
                  </ul>
                </li>
                <li className="dropdown notifications-menu">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-bell-o"></i>
                    <span className="label label-warning">10</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 10 notifications</li>
                    <li>
                      <ul className="menu">
                        <li>
                          <a href="#">
                            <i className="fa fa-users text-aqua"></i> 5 new members joined today
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-warning text-yellow"></i> Very long description here that may not fit into the page and may cause design problems
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-users text-red"></i> 5 new members joined
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-shopping-cart text-green"></i> 25 sales made
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-user text-red"></i> You changed your username
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="footer"><a href="#">View all</a></li>
                  </ul>
                </li>
                <li className="dropdown tasks-menu">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-flag-o"></i>
                    <span className="label label-danger">9</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 9 tasks</li>
                    <li>
                      <ul className="menu">
                        <li>
                          <a href="#">
                            <h3>
                              Design some buttons
                              <small className="pull-right">20%</small>
                            </h3>
                            <div className="progress xs">
                              <div className="progress-bar progress-bar-aqua div-width-20"  role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">20% Complete</span>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <h3>
                              Create a nice theme
                              <small className="pull-right">40%</small>
                            </h3>
                            <div className="progress xs">
                              <div className="progress-bar progress-bar-green div-width-40"  role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">40% Complete</span>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <h3>
                              Some task I need to do
                              <small className="pull-right">60%</small>
                            </h3>
                            <div className="progress xs">
                              <div className="progress-bar progress-bar-red div-width-60"  role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">60% Complete</span>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <h3>
                              Make beautiful transitions
                              <small className="pull-right">80%</small>
                            </h3>
                            <div className="progress xs">
                              <div className="progress-bar progress-bar-yellow div-width-80"  role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">80% Complete</span>
                              </div>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="footer">
                      <a href="#">View all tasks</a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown user user-menu">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <img src="public/dist/img/user2-160x160.jpg" className="user-image" alt="User Image"/>
                    <span className="hidden-xs">Alexander Pierce</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="user-header">
                      <img src="public/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                      <p>
                        Alexander Pierce - Web Developer
                        <small>Member since Nov. 2012</small>
                      </p>
                    </li>

                    <li className="user-body">
                      <div className="col-xs-4 text-center">
                        <a href="#">Followers</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="#">Sales</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="#">Friends</a>
                      </div>
                    </li>

                    <li className="user-footer">
                      <div className="pull-left">
                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                      </div>
                      <div className="pull-right">
                        <a href="#" className="btn btn-default btn-flat">Sign out</a>
                      </div>
                    </li>
                  </ul>
                </li>

                <li>
                  <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                </li>
              </ul>
            </div>
          </nav>
        </header>


        <aside className="main-sidebar">

          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img src="public/dist/img/avatar.png" className="img-circle" alt="User Image"/>
              </div>
              <div className="pull-left info">
                <p>Security Check</p>
                <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
              </div>
            </div>
            <form action="#" method="get" className="sidebar-form">
              <div className="input-group">
                <input type="text" name="q" className="form-control" placeholder="Search..."/>
                <span className="input-group-btn">
                  <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i></button>
                </span>
              </div>
            </form>

            <ul className="sidebar-menu">
              <li className="header">MAIN NAVIGATION</li>
              <li className="active treeview">
                <a href="#">
                  <i className="fa fa-dashboard"></i> <span>Dashboard</span> <i className="fa fa-angle-left pull-right"></i>
                </a>
                <ul className="treeview-menu">
                  <li className="active"><a href="index.html"><i className="fa fa-circle-o"></i> Dashboard v1</a></li>
                  <li><a href="index2.html"><i className="fa fa-circle-o"></i> Dashboard v2</a></li>
                </ul>
              </li>
              <li><a href="#"  ><i className="fa fa-users"></i> <span>Staff List</span></a></li>
              <li><a href="documentation/index.html"><i className="fa fa-users"></i> <span>Visitor List</span></a></li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-files-o"></i>
                  <span>VMS Reports</span>
                  <span className="label label-primary pull-right">4</span>
                </a>
                <ul className="treeview-menu">
                  <li><a href="public/pages/layout/top-nav.html"><i className="fa fa-circle-o"></i> Date-Time Wise</a></li>
                  <li><a href="public/pages/layout/boxed.html"><i className="fa fa-circle-o"></i> Tower-Flat Wise</a></li>
                  <li><a href="public/pages/layout/fixed.html"><i className="fa fa-circle-o"></i> Vehicle Wise</a></li>
                  <li><a href="public/pages/layout/collapsed-sidebar.html"><i className="fa fa-circle-o"></i> Frequent</a></li>
                </ul>
              </li>


            </ul>
          </section>
        </aside>

        <div className="content-wrapper" id="dividdashboard">
               {/*<DisplayStaff staff={this.state.staff}/>*/}

               {/*<div className="col-md-9">
                 <div className="nav-tabs-custom">
                   <ul className="nav nav-tabs">
                     <li  className="active"><a href="#timeline" data-toggle="tab">Staff List</a></li>
                     <li><a href="#settings" data-toggle="tab">Add Staff</a></li>
                   </ul>
                   <div className="tab-content">

                     <div className="tab-pane" id="timeline">
                         <DisplayStaff staff={this.state.staff}/>
                     </div>

                     <div className="tab-pane" id="settings">
                         <NotFound staff={this.state.staff}/>
                     </div>
                   </div>
                 </div>
               </div>*/}
               <div>
                 <section className="content">
                  <div className="row">
                    <div className="box-body">
                       <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                          <li className={(this.state.activeTab1 ? "active" : "" )}><a href="#staffList" data-toggle="tab">Staff List</a></li>
                          <li className={(this.state.activeTab2 ? "active" : "" )}><a href="#addStaff" data-toggle="tab">Add Staff</a></li>
                        </ul>
                        </div>
                      <div className="tab-content">
                        <div className={(this.state.activeTab1 ? "active tab-pane" : "tab-pane" )} id="staffList">
                          <div className="post">
                              <DisplayStaff staff={this.state.staff}  objStaff={this.state.objStaff} changeActiveTab={this.changeActiveTab}/>
                          </div>
                        </div>
                        <div className={(this.state.activeTab2 ? "active tab-pane" : "tab-pane" )} id="addStaff">
                          <div className="post">
                              <AddStaff staff={this.state.staff} addStaffThis={this.state.addStaffThis} getChildComp={this.getChildComp} objStaff={this.state.objStaff} addStaffData={this.addStaffData} changeActiveTab={this.changeActiveTab} linkState={this.linkState.bind(this)}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 </section>
               </div>
               {/*<div>
               <section className="content-header">
                 <h1>List of Staff</h1>
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
             </div>*/}
        </div>
        <footer className="main-footer">
          <div className="pull-right hidden-xs">
            <b>Version</b> 1.0.0
          </div>
          <strong>Copyright &copy; 2016 <a href="http://almsaeedstudio.com">Team SAJ </a>.</strong> All rights reserved.
        </footer>

        <aside className="control-sidebar control-sidebar-dark">
          <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
            <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home"></i></a></li>
            <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears"></i></a></li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane" id="control-sidebar-home-tab">
              <h3 className="control-sidebar-heading">Recent Activity</h3>
              <ul className="control-sidebar-menu">
                <li>
                  <a href="javascript::;">
                    <i className="menu-icon fa fa-birthday-cake bg-red"></i>
                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Langdon''s Birthday</h4>
                      <p>Will be 23 on April 24th</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript::;">
                    <i className="menu-icon fa fa-user bg-yellow"></i>
                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Frodo Updated His Profile</h4>
                      <p>New phone +1(800)555-1234</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript::;">
                    <i className="menu-icon fa fa-envelope-o bg-light-blue"></i>
                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Nora Joined Mailing List</h4>
                      <p>nora@example.com</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript::;">
                    <i className="menu-icon fa fa-file-code-o bg-green"></i>
                    <div className="menu-info">
                      <h4 className="control-sidebar-subheading">Cron Job 254 Executed</h4>
                      <p>Execution time 5 seconds</p>
                    </div>
                  </a>
                </li>
              </ul>

              <h3 className="control-sidebar-heading">Tasks Progress</h3>
              <ul className="control-sidebar-menu">
                <li>
                  <a href="javascript::;">
                    <h4 className="control-sidebar-subheading">
                      Custom Template Design
                      <span className="label label-danger pull-right">70%</span>
                    </h4>
                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-danger div-width-70"></div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript::;">
                    <h4 className="control-sidebar-subheading">
                      Update Resume
                      <span className="label label-success pull-right">95%</span>
                    </h4>
                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-success div-width-95" ></div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript::;">
                    <h4 className="control-sidebar-subheading">
                      Laravel Integration
                      <span className="label label-warning pull-right">50%</span>
                    </h4>
                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-warning div-width-50" ></div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="javascript::;">
                    <h4 className="control-sidebar-subheading">
                      Back End Framework
                      <span className="label label-primary pull-right">68%</span>
                    </h4>
                    <div className="progress progress-xxs">
                      <div className="progress-bar progress-bar-primary div-width-68" ></div>
                    </div>
                  </a>
                </li>
              </ul>

            </div>

            <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>

            <div className="tab-pane" id="control-sidebar-settings-tab">
              <form method="post">
                <h3 className="control-sidebar-heading">General Settings</h3>
                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Report panel usage
                    <input type="checkbox" className="pull-right" />
                  </label>
                  <p>
                    Some information about this general settings option
                  </p>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Allow mail redirect
                    <input type="checkbox" className="pull-right" />
                  </label>
                  <p>
                    Other sets of options are available
                  </p>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Expose author name in posts
                    <input type="checkbox" className="pull-right" />
                  </label>
                  <p>
                    Allow the user to show his name in blog posts
                  </p>
                </div>

                <h3 className="control-sidebar-heading">Chat Settings</h3>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Show me as online
                    <input type="checkbox" className="pull-right" />
                  </label>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Turn off notifications
                    <input type="checkbox" className="pull-right"/>
                  </label>
                </div>

                <div className="form-group">
                  <label className="control-sidebar-subheading">
                    Delete chat history
                    <a href="javascript::;" className="text-red pull-right"><i className="fa fa-trash-o"></i></a>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </aside>
        <div className="control-sidebar-bg"></div>
      </div>


    )
  }
}

reactMixin.onClass(AdminDashboard,History);
reactMixin.onClass(AdminDashboard,Catalyst.LinkedStateMixin);
export default AdminDashboard;
