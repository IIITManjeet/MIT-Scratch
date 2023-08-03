import { ADD_LIST, DELETE_LIST, SET_LIST } from "./types";

const initialState = {
  midAreaLists: [
    {
      id: "midAreaList-0",
      comps: [
        "FLAG",
        "MOVE",
        "REPEAT",
        "MOVE_Y",
        "TURN_CLOCKWISE",
        "TURN_ANTI_CLOCKWISE",
        "SAY_MESSAGE",
        "HIDE_MESSAGE",
        "POINT_IN_DIRECTION",
        "SET_X",
        "SET_Y",
        "POINT_MOUSE_POINTER",
        "SIZE_BY_PERCENT",
        "COLOR",
        "SAY_MESSAGE_WITH_TIMER",
        "SIZE",
        "HIDE",
        "SHOW",
        "BROADCAST",
        "WAIT",
        "GOTO_MOUSE_POINTER",
        "THINK",
        "THINK_TIMER",
        "GOTO_XY",
        "RESET",
      ],
    },
    {
      id: "midAreaList-1",
      comps: ["MOVE"],
    },
  ],
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      let index = state.midAreaLists.findIndex((x) => x.id === action.id);
      let all_lists = state.midAreaLists;
      let [item] = all_lists.splice(index, 1);
      item.comps = action.list;
      all_lists.splice(index, 0, item);

      return {
        midAreaLists: all_lists,
      };

    case ADD_LIST:
      let old_list = state.midAreaLists;
      let new_list_add = {
        id: `midAreaList-${state.midAreaLists.length}`,
        comps: ["MOVE"],
      };
      old_list.push(new_list_add);
      return {
        midAreaLists: old_list,
      };

    case DELETE_LIST:
      let old_lists = state.midAreaLists;
      old_lists.pop();
      return {
        midAreaLists: old_lists,
      };

    default:
      return state;
  }
};
