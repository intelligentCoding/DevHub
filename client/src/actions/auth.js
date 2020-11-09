import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from './types';

import setAuthToken from '../utils/setAuthToken';

// Register User
export const register = ({name, email, password}) => async dispatch => {
    //set the headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //getting the data ready to send to api.
    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        //run load user to get user
        dispatch(loadUser());
    } catch (err) {  
        const errorsToSet = err.response.data.errors;
        console.log("errors"+errorsToSet);
        if(errorsToSet){
            errorsToSet.forEach(element => {
                //here we dispathc alerts
                dispatch(setAlert(element.msg, 'danger'));
            });
        }
        dispatch({
            type: REGISTER_FAIL,
        })
    }
};


//LOAD users

export const loadUser = () => async dispatch => {
    //we will check local storage
    //call setAuthToken funciton and set 
    //token in the headers for axios.
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }


    //we will make our request now
    try {
        const res = await axios.get('/api/auth');
        //we successfull we will dispatch the USER_LOADED action
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })

    } catch (error) {
        
        dispatch({
            type: AUTH_ERROR
        })
    }

}


// login User
export const login = (email, password) => async dispatch => {
    //set the headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //getting the data ready to send to api.
    console.log(email)
    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        //run load user to get user
        dispatch(loadUser());
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
            type: LOGIN_FAIL,
        })
    }
};