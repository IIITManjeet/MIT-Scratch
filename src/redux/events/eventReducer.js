import { SET_REPEAT, SET_WAIT, SET_FLAG, SET_SPACE, STOP } from "./eventTypes";

const initialState = {
  repeat: {},
  wait: {},
  flag: 0,
  space: 0,
  
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPEAT:
      return {
        ...state,
        repeat: action.value,
      };

    case SET_WAIT:
      return {
        ...state,
        wait: action.value,
      };
    case SET_FLAG:
      return {
        ...state,
        flag: action.value,
      };
    case SET_SPACE:
      return {
        ...state,
        space: action.value,
      };
    
    default:
      return state;
  }
};
