import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import Paper from "@material-ui/core/Paper";

const PointToMousePointer = ({character, characterAngle, comp_id}) => {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const el = document.getElementById(`${character.active}-div`);
        
        // gets the position of element with respect to the screen
        var elBoundingRect= el.getBoundingClientRect();

        let elCenter={
            x: elBoundingRect.left + elBoundingRect.width/2, 
            y: elBoundingRect.top + elBoundingRect.height/2
        }

        // calculates angle between mouse pointer and middle of character
        function handleMouseMove(e) {
            let ang = Math.atan2(e.pageX - elCenter.x, - (e.pageY - elCenter.y) )*(180 / Math.PI);
            setAngle(ang);
        }
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [angle])
    const pointToMousePointer = () => {
        const el = document.getElementById(character.active);
        
        const character_angle = character.characters.find(
            (x) => x.id === character.active
        );
        console.log(character_angle);
        el.style.transition = "transform 0.00001s";
        el.style.transform = `rotate(${angle}deg)`;
        characterAngle(angle);
    }
  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className={`text-center rounded bg-blue-500 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
        onClick={() => pointToMousePointer()}
      >
        Point to
        <select
          name="gotoOptions"
        
          className="text-black text-center py-2 w-32 rounded-lg mx-2"
        >
          <option selected className="text-center" >
            Mouse Pointer
          </option>
          
        </select>
        <div
          id={comp_id}
          className="text-center bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          Point To : {Math.floor(angle)} degrees
        </div>
      </div>
    </Paper>
  )
}

// mapping state to component
const mapStateToProps = (state) => {
    return {
      character: state.character,
    };
  };

  // mapping function to component
const mapDispatchToProps = (dispatch) => {
    return {
      characterAngle: (angle) => dispatch(setCharacterAngle(angle)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(PointToMousePointer)