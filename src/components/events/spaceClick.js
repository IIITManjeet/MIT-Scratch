import React from "react";
import { connect } from "react-redux";
import { setSpace } from "../../redux/events/eventActions";
import Paper from "@material-ui/core/Paper";
import SpaceBarIcon from "@material-ui/icons/SpaceBar";

const spaceClick = ({ events, comp_id }) => {
  return (
    // Space Component
    <Paper elevation={3}>
      <div className="rounded text-center bg-yellow-400 p-2 my-3">
        <div className="grid grid-cols my-2">
          <div className="text-white">
            When{" "}
            <span className="w-[10px] h-[10px] text-green-500">
              <SpaceBarIcon />
            </span>{" "}
            Space click
          </div>
        </div>
        <div
          id={comp_id}
          className="rounded flex flex-row flex-wrap bg-yellow-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          Space {events.space === 0 ? "False" : "True"}
        </div>
      </div>
    </Paper>
  );
};

// map state to component
const mapStateToProps = (state) => {
  return {
    events: state.event,
  };
};

// map function to component
const mapDispatchToProps = (dispatch) => {
  return {
    set_space: (value) => dispatch(setSpace(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(spaceClick);
