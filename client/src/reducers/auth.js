import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
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
        default:
            return state;
    }
  }