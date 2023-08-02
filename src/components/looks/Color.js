import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { amber } from "tailwindcss/colors";

const Color = ({ character, comp_id }) => {
  const [state, setState] = useState({
    color: 0,
    option: 0,
  });

  const changeBrightness = (amount) => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.transition = "transform 0s";
    console.log(el.style.filter);
    el.style.filter = `brightness(${1 + amount})`;
  };

  const changeOpacity = (amount) => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.transition = "transform 0s opacity 0.3 ease";
    el.style.opacity = `${amount}`;
  };

  const changeColorHandler = (amount) => {
    const tail = document.getElementById("tail");
    const rest = document.getElementById("costume1.1");
    const bodyLeg = document.getElementById("body-and-leg");
    const head = document.getElementById("head");
    const color = rest.children[1].getAttribute("fill");
    const currentColor = hexToRgb(color);
    const newColor = rgbToHex(
      currentColor.r + amount,
      currentColor.g + amount,
      currentColor.b + amount
    );
    rest.children[1].setAttribute("fill", `${newColor}`);
    rest.children[2].setAttribute("fill", `${newColor}`);
    rest.children[4].setAttribute("fill", `${newColor}`);
    tail.children[0].setAttribute("fill", `${newColor}`);
    bodyLeg.children[0].setAttribute("fill", `${newColor}`);
    head.children[0].setAttribute("fill", `${newColor}`);
    console.log(tail, bodyLeg, head);
  };
  const handleChange = (e) => {
    if (e.target.value === "Color Effect") setState({ ...state, option: 0 });
    if (e.target.value === "Brightness Effect")
      setState({ ...state, option: 1 });
    if (e.target.value === "Opacity Effect") setState({ ...state, option: 2 });
  };
  // Utility method to convert RGB to hexadecimal color representation
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Utility method to convert hexadecimal color to RGB representation
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-purple-500 p-2 my-3">
        <div className="grid grid-rows-2 gap-2 my-2">
          <select
            name="effectOption"
            onChange={(e) => handleChange(e)}
            className="text-black text-center rounded-lg mx-2"
          >
            <option selected={state.option === 0}>Color Effect</option>
            <option selected={state.option === 1}>Brightness Effect</option>
            <option selected={state.option === 2}>Opacity Effect</option>
          </select>
          <input
            className="mx-2 p-1 py-0 text-center rounded-lg"
            type="number"
            value={state.color}
            min="0"
            max={state.option === 0 ? "255" : "5"}
            step={state.option === 0 ? "1" : "0.01"}
            onChange={(e) =>
              setState({ ...state, color: parseFloat(e.target.value) })
            }
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() =>
            state.option === 0
              ? changeColorHandler(state.color)
              : state.option === 1
              ? changeBrightness(state.color)
              : changeOpacity(state.color)
          }
        >
          Effect : {state.color}
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

export default connect(mapStateToProps)(Color);
