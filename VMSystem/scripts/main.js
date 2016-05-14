import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import DisplayVisitor from './component/DisplayVisitor';
import AddVisitor from './component/AddVisitor';
import Login from './component/Login';
import StaffDashboard from './component/StaffDashboard';
import AdminDashboard from './component/AdminDashboard';


  var routes = (
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="/admin/:email" component={AdminDashboard}/>
        <Route path="/staff/:email" component={StaffDashboard}/>
      {/*<Route path="*" component={NotFound}/>*/}
    </Router>
  )

  ReactDom.render(routes,document.getElementById("main"));
