import { SET_REPEAT, SET_WAIT, SET_FLAG } from "./eventTypes";

export const setRepeat = (repeat_val) => {
  return {
    type: SET_REPEAT,
    value: repeat_val,
  };
};

export const setWait = (wait_val) => {
  return {
    type: SET_WAIT,
    value: wait_val,
  };
};

export const setFlag = (flag_val) => {
  return {
    type: SET_FLAG,
    value: flag_val,
  };
};
