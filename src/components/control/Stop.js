import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import BlockIcon from "@material-ui/icons//Block";

const Stop = ({comp_id }) => {
  return (
    // Block Component
    <Paper elevation={3}>
      <div className="rounded text-center py-1" style={{background:'#D8513F'}}>
        <div className="grid grid-cols-3 my-2">
          <div className="text-white">Stop </div>
          <span className="w-[10px] h-[10px] text-red-700">
            <BlockIcon />
          </span>{" "}
          <div className="text-white">All</div>
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



export default connect(mapStateToProps)(Stop);
