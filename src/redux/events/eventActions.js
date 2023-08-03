import { SET_REPEAT, SET_WAIT, SET_FLAG, SET_SPACE, STOP } from "./eventTypes";

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

export const setSpace = (space_val) => {
  return {
    type: SET_SPACE,
    value: space_val,
  };
};

