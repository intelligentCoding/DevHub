import React , {Fragment, useState} from 'react'
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { addEducation} from '../../actions/profile'


const AddEducationi = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = e => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    }
    return (
        <Fragment>
        <h1 className="large text-primary">Add An Education</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add any school or bootcamp you have attended.
        </p>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            addEducation(formData, history);
          }}
        >
          {/* School or bootcamp   */}
          <div className="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              value={school}
              onChange={onChange}
              required
            />
          </div>

          {/* Degree or certificate */}
          <div className="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              value={degree}
              onChange={onChange}
              required
            />
          </div>

          {/* field of study */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Field of Study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={onChange}
            />
          </div>

          {/* from date  */}
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={onChange} />
          </div>

          {/* current school, if user is currently attending this school */}
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={() => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{' '}
              Current School
            </p>
          </div>
          {/* to date */}
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={onChange}
              disabled={current}
            />
          </div>

          {/* Description of the deducation */}
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Programe description"
              value={description}
              onChange={onChange}
            />
          </div>

          {/* submit button */}
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    )
}

AddEducationi.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(AddEducationi)
