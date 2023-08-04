import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { amber } from "tailwindcss/colors";
const t1 ={
  background: `url("data:image/svg+xml,%3Csvg width='197' height='72' viewBox='0 0 197 72' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.2993 1H4.27196C2.4649 1 1 2.4649 1 4.27195V56.8711C1 58.6782 2.46491 60.1431 4.27196 60.1431H18.2021C19.1185 60.1431 19.993 60.5274 20.6127 61.2026L28.6324 69.9405C29.2521 70.6157 30.1265 71 31.0429 71H48.23C49.1549 71 50.0367 70.6085 50.657 69.9224L58.5243 61.2207C59.1446 60.5346 60.0264 60.1431 60.9513 60.1431H192.806C194.613 60.1431 196.078 58.6782 196.078 56.8711V4.27195C196.078 2.4649 194.613 1 192.806 1H60.8539C59.9861 1 59.1539 1.34472 58.5402 1.95833L50.6411 9.85753C50.0274 10.4711 49.1952 10.8159 48.3274 10.8159H30.9457C30.0865 10.8159 29.2617 10.4779 28.6496 9.87486L20.5955 1.941C19.9834 1.338 19.1586 1 18.2993 1Z' fill='%23B003B0' stroke='%23800080' stroke-width='1.09065'/%3E%3C/svg%3E") no-repeat center center/cover`,
  width: "206px",
  height: "76px",
}
const Color = ({ character, comp_id }) => {
  const [state, setState] = useState({
    color: 25,
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
    <div 
    style={t1} className="flex justify-center items-center">
      <div className="text-center rounded">
        <div className="flex flex-row text-sm mx-2">
          <select
            name="effectOption"
            onChange={(e) => handleChange(e)}
            className="text-black text-center rounded-lg"
          >
            <option selected={state.option === 0}>Color Effect</option>
            <option selected={state.option === 1}>Brightness Effect</option>
            <option selected={state.option === 2}>Opacity Effect</option>
          </select>
          <input
            className="ml-2 text-center rounded-lg"
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
          className="text-center text-white text-sm cursor-pointer"
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
    </div>
  );
};

// mapping state to component
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(Color);
