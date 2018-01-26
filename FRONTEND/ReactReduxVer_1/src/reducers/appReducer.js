import {DATA_FETCH_BEGIN, DATA_FETCH_ERROR, DATA_FETCH_SUCCESS } from '../actions/appActions.js'

const initialState = {  
  new: {},
  isFetching: false,
  ignore: true
};

export default function data (state = initialState, action) {  
  switch (action.type) {
    case DATA_FETCH_BEGIN: 
      return { ...state, isFetching: true };
    
    case DATA_FETCH_SUCCESS: 
      return { isFetching: false, data: { ...state.data, new: action.payload }};
    
    case DATA_FETCH_ERROR: 
      return { ...state, isFetching: false };
      
    default:
      return state;
  }
}