import axios from 'axios';
import {setAlert } from './alert';


import {
    GET_PROFILE,
    PROFILE_ERROR
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
