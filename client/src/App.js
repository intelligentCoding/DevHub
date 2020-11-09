import './App.css';
import React , { Fragment, useEffect} from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Dashboard from './components/dashboard/Dashboard';
//import alerts
import Alert from './components/layout/alert';

import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
//stuff we need for redex
import {Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//if localstorage has the token we will set it in global headers.
if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => { 

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
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
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
);
  };

export default App;
