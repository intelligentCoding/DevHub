import axios from 'axios';
import {setAlert } from './alert';


import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_REPOS,
} from './types';

//Get signed in user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//create/update a profile
export const createProfile = (formData, history, edit = false)=> async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    
        dispatch(setAlert(
            edit ? 'Profile Updated' : 
            'Profile Created', 'success'
            ));
    
        if (!edit) {
            history.push('/dashboard');
        }
        } catch (err) {
            const errorsToSet = err.response.data.errors;
            // console.log("errors"+errorsToSet);
            if(errorsToSet){
                errorsToSet.forEach(element => {
                    //here we dispathc alerts
                    dispatch(setAlert(element.msg, 'danger'));
                });
            }
    
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        });
        }
    };

//Add education action
export const addExperience = (formData, history)=> async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    
        dispatch(setAlert(
            'Education Added','success'
            ));
        
        //redirect
        history.push('/dashboard');
        
        } catch (err) {
            const errorsToSet = err.response.data.errors;
            // console.log("errors"+errorsToSet);
            if(errorsToSet){
                errorsToSet.forEach(element => {
                    //here we dispathc alerts
                    dispatch(setAlert(element.msg, 'danger'));
                });
            }
    
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        });
        }
}

//Add experience action
export const addEducation = (formData, history)=> async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    
        dispatch(setAlert(
            'Experience Added', 'success'
            ));
        
        //redirect
        history.push('/dashboard');
        
        } catch (err) {
            const errorsToSet = err.response.data.errors;
            // console.log("errors"+errorsToSet);
            if(errorsToSet){
                errorsToSet.forEach(element => {
                    //here we dispathc alerts
                    dispatch(setAlert(element.msg, 'danger'));
                });
            }
    
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        });
        }
}

// delete the account/profile
export const deleteAccount = () => async (dispatch) => {

    //we will ask the user if he is sure to delete the account.
    if (window.confirm('Are you sure? This can NOT be undone!')) {

        //if confirmed delete the account.
      try {
        await axios.delete('/api/profile');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
  
        dispatch(setAlert('Your account has been deleted'));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };


//delete the expreience
export const deleteExperience = (id) => async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// delete the education
export const deleteEducation = (id) => async (dispatch) => {
    console.log("object")
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  //get all the profiles
export const getProfiles = () => async (dispatch) => {
    //from preventing of flashing of previous profile
    dispatch({ type: CLEAR_PROFILE });
  
    try {
      const res = await axios.get('/api/profile');
  
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

//profile by id
export const getProfileById = (userId) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

//get github repos
// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
        type: GET_REPOS,
        payload: res.data
        });
    } catch (err) {
        dispatch({
        type: NO_REPOS
        });
    }
};



