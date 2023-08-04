import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { Paper } from "@material-ui/core";

const Forever = ({ comp_id }) => {

  
  return (
    <Paper elevation={3}>
    <div className="rounded text-center py-1" style={{background:'#D8513F'}}>
      <div className="grid grid-cols-3 my-2">
        <div className="text-white">Forever </div>
        <span className="w-[10px] h-[10px] text-red-700">
          <AllInclusiveIcon />
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



export default connect(mapStateToProps)(Forever);
