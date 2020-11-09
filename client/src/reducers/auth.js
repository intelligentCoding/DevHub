import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
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
            return {
                ...state,
                token: null,
                isAuthenticated: true,
                loading: false,
            };
        case AUTH_ERROR:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            }
        case LOGIN_SUCCESS:
            //set token in local storage
            localStorage.setItem('token', payload.token);
            return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
            };
        case LOGIN_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
  }