import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import React, { Fragment } from 'react';
// import CardDetails from './components/productDetails'
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link class="navbar-brand font-weight-bold" to="/">ShopCart</Link>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

            </ul>

          </div>
        </nav>
        <Fragment>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route exact path="/home" component={(props)=><Home {...props}/>}/>
            <Route exact path="/home/:orderId" component={(props)=><Home {...props}/>}/>
            {/* <Route exact path="/prodDetails" component={(props)=><CardDetails {...props}/>}/> */}
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
