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

import EditProfile from './components/profile-forms/EditProfile';
import CreateProfile from './components/profile-forms/CreateProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles'

//stuff we need for redex
import {Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Profile from './components/profile/Profile';

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
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
);
  };

export default App;
