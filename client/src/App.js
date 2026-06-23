import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Aside from './components/layout/Aside';
import Overlay from './components/layout/Overlay';
import Footer from './components/layout/Footer';
import ScrollUp from './components/layout/ScrollUp';
import Landing from './components/landing/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Test from './components/test/Test';

import './App.css';

const App = () => (
  <Router>
    <Fragment>
      {/* <Test /> */}
      <Navbar />
      <Aside />
      <Overlay />
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
      <ScrollUp />
    </Fragment>
  </Router>
);


export default App;
