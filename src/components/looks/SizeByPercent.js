import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

const SizeByPercent = ({ character, comp_id }) => {
  const [state, setState] = useState({
    scale: 1,
  });
  // To change Size of Sprint
  const changeSize = () => {
    const el = document.getElementById(character.active);
    el.style.transition = "transform 0s";
    el.style.transform = `scale(${state.scale})`;
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-purple-500 p-2 my-3">
        <div className="grid grid-cols-3 my-2">
          <div className="text-white">Size:</div>
          <input
            className="mx-2 p-1 py-0 text-center rounded-lg"
            type="number"
            value={state.scale}
            min="0"
            max="1000"
            step="1"
            onChange={(e) =>
              setState({ ...state, scale: parseFloat(e.target.value) })
            }
          />
          <div className="text-white">%</div>
        </div>
        <div
          id={comp_id}
          className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => changeSize()}
        >
          Size {Math.ceil(state.scale * 100)} %
        </div>
      </div>
    </Paper>
  );
};

// mapping state to component
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(SizeByPercent);
