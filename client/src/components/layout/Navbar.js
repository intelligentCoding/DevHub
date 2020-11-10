import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {connect } from 'react-redux';
import PropTypes from 'prop-types'
import {logout } from '../../actions/auth';


const Navbar = ({ auth: {isAuthenticated, loading}, logout}) => {
    //these are the links for user loged in
    const authLinks = (
      <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i> { ' ' }
          {/* hide logout text on small screen */}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
      <li><Link to="/dashboard">
          <i className="fas fa-user"></i> { ' ' }
          {/* hide logout text on small screen */}
          <span className='hide-sm'>Dashboard</span>
        </Link></li>
    </ul>

    )
    
    //These are the links for users not loged in
    const guestLinks = (
      <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );
    return (
    <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-laptop-code"></i> DevHub</Link>
        </h1>
        { !loading && (<Fragment>
            {isAuthenticated ? authLinks: guestLinks}
        </Fragment>)}
      </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {logout})(Navbar);