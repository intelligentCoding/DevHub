import React , { Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
const Register = ({setAlert}) => {
  
    //state using hooks
    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password:'',
        password2:'',
    });
    
    const {name, email, password, password2} = formData;
    
    //on change function that get's called when we enter data 
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    //when user clicks on register.
    const onSubmit = (e) =>{
        //prevent default behaviiour
        e.preventDefault();
        if(password !== password2){
            setAlert('Password do not match', 'danger')
        } else {
            console.log(formData)
        }
    }

    return (
        <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={ e => onSubmit(e)}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    );
};
export default connect(null, {setAlert})(Register);