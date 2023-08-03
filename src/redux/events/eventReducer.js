import { SET_REPEAT, SET_WAIT, SET_FLAG } from "./eventTypes";

const initialState = {
  repeat: {},
  wait: {},
  flag: 0,
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
    default:
      return state;
  }
};
