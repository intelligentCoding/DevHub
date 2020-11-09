import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';


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
        })
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