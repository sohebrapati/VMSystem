import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, Link, browserHistory } from 'react-router';

import DisplayVisitor from './component/DisplayVisitor';
// import AddVisitor from './component/AddVisitor';
import Login from './component/Login';
import SecurityDashboard from './component/SecurityDashboard';
import AdminDashboard from './component/AdminDashboard';

  var routes = (
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="/admin/:email" component={AdminDashboard}/>
        <Route path="/security/:email" component={SecurityDashboard}/>
      {/*<Route path="*" component={NotFound}/>*/}
    </Router>

  )

  ReactDom.render(routes,document.getElementById("main"));
