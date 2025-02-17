import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {Link, withRouter } from 'react-router-dom';
import {createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({profile: { profile, loading}, 
    createProfile, getCurrentProfile ,history}) => 
    {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })

    //social inputs display
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();
        if (!loading && profile) {
            const profileData = { ...formData };
            for (const key in profile) {
              if (key in profileData) profileData[key] = profile[key];
            }
            for (const key in profile.social) {
              if (key in profileData) profileData[key] = profile.social[key];
            }
            if (Array.isArray(profileData.skills))
              profileData.skills = profileData.skills.join(', ');
            setFormData(profileData);
          }
    }, [getCurrentProfile])
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]  : e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }
    return <Fragment>
        <h1 className="large text-primary">
        Create Your Profile
        </h1>
        <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={onSubmit}>
        <div className="form-group">

            {/* Professional status */}
            <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
            </select>
            <small className="form-text"
            >Give us an idea of where you are at in your career</small
            >
        </div>

        {/* //Company */}
        <div className="form-group" >
            <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
            <small className="form-text"
            >Could be your own company or one you work for</small
            >
        </div>

        {/* Website if user have a website */}
        <div className="form-group">
            <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
            <small className="form-text"
            >Could be your own or a company website</small
            >
        </div>

        {/* Location  */}
        <div className="form-group">
            <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
            <small className="form-text"
            >City and state suggested (eg. Boston, MA)</small
            >
        </div>

        {/* skills  */}
        <div className="form-group">
            <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} />
            <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
            >
        </div>

        {/* Github username  */}
        <div className="form-group">
            <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={onChange}
            />
            <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
            >
        </div>

        {/* Bio of the user */}
        <div className="form-group">
            <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange}></textarea>
            <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
            <button onClick={() =>toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
            </button>
            <span>Optional</span>
        </div>
        {displaySocialInputs && <Fragment>                   
                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x" />
                    <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={twitter}
                    onChange={onChange}
                    />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x" />
                    <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={onChange}
                    />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x" />
                    <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    value={youtube}
                    onChange={onChange}
                    />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x" />
                    <input
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={linkedin}
                    onChange={onChange}
                    />
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x" />
                    <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={onChange}
                    />
                </div>
            </Fragment>
        }
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
    </Fragment>
}
EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state =>({
    profile: state.profile
})
export default connect(mapStateToProps, 
{createProfile, getCurrentProfile})
(withRouter(EditProfile));