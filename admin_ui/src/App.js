import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './components/Home';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';
import AdminHome from './AdminHome'
function App() {
  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand font-weight-bold" to="/">Admin</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

            </ul>

          </div>
        </nav>
        <Fragment>
          <Switch>
            <Redirect exact from="/" to="/AdminHome"></Redirect>
            <Route exact path="/AdminHome" component={()=><AdminHome/>}/>
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
