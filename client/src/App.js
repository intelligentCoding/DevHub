import './App.css';
import React , { Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

//import alerts
import Alert from './components/layout/alert';

//stuff we need for redex
import {Provider } from 'react-redux';
import store from './store';

const App = () => (
  //wrape everything in Provider to get redux state to each component.
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar/>
      <Route exact path='/' component={Landing}/>
      {/* //we want to have section with class name container because every page has container class around it except landing page. */}
      <section className="container">
        <Alert/>
        {/* switch can only have routes. */}
        <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
);

export default App;
