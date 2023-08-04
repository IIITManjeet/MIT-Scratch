import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import CatSprite from "../CatSprite";
const Reset = ({ character, comp_id }) => {
  // To handle hide component
  const handleDisplay = () => {
    const el = document.getElementById(`${character.active}-div`);
    const el1 = document.getElementById(character.active);
    el.style.transition = "transform 0s opacity 0.3 ease";
    el.style.opacity = `1`;
    el.style.filter = `brightness(1)`;
    el1.style.transform = `scale(1)`;
    el.style.transform = `scale(1)`;
    const tail = document.getElementById("tail");
    const rest = document.getElementById("costume1.1");
    const bodyLeg = document.getElementById("body-and-leg");
    const head = document.getElementById("head");
    rest.children[1].setAttribute("fill", "#FFAB19");
    rest.children[2].setAttribute("fill", "#FFAB19");
    rest.children[4].setAttribute("fill", "#FFAB19");
    tail.children[0].setAttribute("fill", "#FFAB19");
    bodyLeg.children[0].setAttribute("fill", "#FFAB19");
    head.children[0].setAttribute("fill", "#FFAB19");
    console.log(tail, bodyLeg, head);
  };
  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        style={{background:'#A121AA'}}
        className="text-center rounded text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
        onClick={() => handleDisplay()}
      >
        Clear Graphic Effects
      </div>
    </Paper>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(Reset);
