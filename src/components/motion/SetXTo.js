import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

// Move Component for Sidebar
const SetXTo = ({ character, comp_id }) => {
  const [steps, setSteps] = useState(0);

  // Function used for moiving Sprint
  const handleClick = () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    el.style.transition = "trasform 0.0001s";
    el.style.left = steps + "px";
  };

  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className={`text-center rounded bg-blue-700 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
        onClick={() => handleClick()}
      >
        Set X{" "}
        <input
          type="number"
          className="text-black text-center w-16 mx-2 rounded-lg"
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value))}
        />{" "}
        steps
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

export default connect(mapStateToProps)(SetXTo);
