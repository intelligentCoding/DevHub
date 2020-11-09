import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  
  export default function (state = initialState, action) {

      //destruct action
    const { type, payload } = action;
  
    switch (type) {
        case REGISTER_SUCCESS:
            //set token in local storage
            localStorage.setItem('token', payload.token);
            return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
            };
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: true,
                loading: false,
            };
        case AUTH_ERROR:
        case USER_LOADED:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        case LOGIN_SUCCESS:
            //set token in local storage
            localStorage.setItem('token', payload.token);
            return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
            };
        default:
            return state;
    }
  }