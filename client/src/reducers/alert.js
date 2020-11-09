//Import actions types
import {SET_ALERT, REMOVE_ALERT} from '../actions/types';

//alerts will be array of objects
const initialState = [];
export default function (state = initialState, action) {
    //action will have type and payload (not always payload)
    //De-struct actioin
    const {type, payload}  = action;
    switch(type){
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id !== payload);
        default: 
            return state;
    }
}