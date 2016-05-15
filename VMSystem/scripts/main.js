import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';


import Login from './component/Login';
import SecurityDashboard from './component/SecurityDashboard';
import AdminDashboard from './component/AdminDashboard';
import AddStaff from './component/AddStaff';
import Report from './component/Report';

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/admin/:email" component={AdminDashboard}/>
    <Route path="/security/:email" component={SecurityDashboard}/>
  </Router>
)

ReactDom.render(routes,document.getElementById("main"));
//ReactDom.render(<Report/>,document.getElementById("main"));
