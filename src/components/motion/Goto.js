import React, { useState } from "react";
import { connect } from "react-redux";
const t1  = {
  background: `url("data:image/svg+xml,%3Csvg width='197' height='72' viewBox='0 0 197 72' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.2993 1H4.27196C2.4649 1 1 2.4649 1 4.27195V56.8711C1 58.6782 2.46491 60.1431 4.27196 60.1431H18.2021C19.1185 60.1431 19.993 60.5274 20.6127 61.2026L28.6324 69.9405C29.2521 70.6157 30.1265 71 31.0429 71H48.23C49.1549 71 50.0367 70.6085 50.657 69.9224L58.5243 61.2207C59.1446 60.5346 60.0264 60.1431 60.9513 60.1431H192.806C194.613 60.1431 196.078 58.6782 196.078 56.8711V4.27195C196.078 2.4649 194.613 1 192.806 1H60.8539C59.9861 1 59.1539 1.34472 58.5402 1.95833L50.6411 9.85753C50.0274 10.4711 49.1952 10.8159 48.3274 10.8159H30.9457C30.0865 10.8159 29.2617 10.4779 28.6496 9.87486L20.5955 1.941C19.9834 1.338 19.1586 1 18.2993 1Z' fill='%235F95F8' stroke='%234687FE' stroke-width='1.09065'/%3E%3C/svg%3E") no-repeat center center/cover`,
  width: "206px",
  height: "76px",
}
const GotoXY = ({ character, comp_id }) => {
  const [state, setState] = useState({
    goto_x: 100,
    goto_y: 100,
  });

  // go to posiiton X and Y
  const gotoXY = () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    el.style.left = state.goto_x + "px";
    el.style.top = state.goto_y + "px";
  };
  return (
    <div 
    style={t1} className="flex justify-center items-center">
      <div className="text-center flex flex-col">
        <div className="flex flex-row w-40 text-sm justify-between">
        <div className="flex flex-row gap-[5px]">
          <div className="text-white"> X</div>
          <input
            className="w-16 mx-2 text-center rounded-lg"
            type="number"
            value={state.goto_x}
            onChange={(e) => {
              setState({ ...state, goto_x: parseInt(e.target.value) });
            }}
          />
        </div>
        <div className="flex flex-row">
          <div className="text-white">Y</div>
          <input
            className="w-16 ml-2 text-center rounded-lg"
            type="number"
            value={state.goto_y}
            onChange={(e) => {
              setState({ ...state, goto_y: parseInt(e.target.value) });
            }}
          />
        </div>
        </div>
        <div
          id={comp_id}
          className="w-40 mt-1 flex justify-between text-white text-sm cursor-pointer"
          onClick={() => gotoXY()}
        >
          Go to  
          <span>X : {state.goto_x}</span> 
          <span>Y : {state.goto_y}</span>
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

export default connect(mapStateToProps)(GotoXY);
