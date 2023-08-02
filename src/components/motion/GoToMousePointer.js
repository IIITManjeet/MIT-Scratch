import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

const GotoMousePointer = ({ character, comp_id }) => {
  const [state, setState] = useState({
    goto_x: 0,
    goto_y: 0,
    option: 0,
  });
  //go to mousePointer Position
  useEffect(() => {
    if(state.option === 0) {

    
    function handleMouseMove(e) {
      setState({
        ...state,
        goto_x: parseInt(e.clientX),
        goto_y: parseInt(e.clientY),
      });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }
  }, [state]);
  const gotoMousePointer = () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.transition = "transform 0s";
    var viewportOffset= el.getBoundingClientRect();
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    console.log("left: "+left);
    console.log("top: "+top);
    const area = document.getElementById(`preview_area`);
    console.log("height of preview area: "+ area.offsetHeight);
    console.log("width of whole screen: "+window.innerWidth);
    let dif = window.innerWidth - area.parentElement.offsetWidth - 60;
    // let dif = 500;
    let difHeight = window.innerHeight - area.offsetHeight;
    console.log("difference: "+dif);
    el.style.position = "relative";
    console.log(state.goto_x+" "+state.goto_y);

    console.log(state);


    



    if (
      state.goto_x >= dif && state.goto_x <= left 
    ) {
      el.style.left = el.offsetLeft - Math.abs(left - state.goto_x) + "px";
        if(state.goto_y >= difHeight) {
          if(state.goto_y <= top) {
            console.log("yess");
          
          
          el.style.top = el.offsetTop - Math.abs(top - state.goto_y)+"px";
          } else {
            
          
          el.style.top = el.offsetTop + Math.abs(top - state.goto_y)+"px";
          }
        } else {
          el.style.top = el.offsetTop + "px";
        } 
          
      
    } else if(state.goto_x >=dif && state.goto_x > left) {
      el.style.left = el.offsetLeft + Math.abs(left - state.goto_x) + "px";
      if(state.goto_y >= difHeight) {
        if(state.goto_y <= top) {
          console.log("yess");
        
        
        el.style.top = el.offsetTop - Math.abs(top - state.goto_y)+"px";
        } else {
          
        
        el.style.top = el.offsetTop + Math.abs(top - state.goto_y)+"px";
        }
      } else {
        el.style.top = el.offsetTop + "px";
      } 
    } 
    else {
      console.log("else");
      el.style.left = el.offsetLeft - Math.abs(left - dif)+ "px" ;
      
      if(state.goto_y >= difHeight) {
        if(state.goto_y <= top) {
          console.log("yess");
        
        
        el.style.top = el.offsetTop - Math.abs(top - state.goto_y)+"px";
        } else {
          
        
        el.style.top = el.offsetTop + Math.abs(top - state.goto_y)+"px";
        }
      } else {
        el.style.top = el.offsetTop+"px";
      } 
    }



  };
const handleChange=(e)=>{
  if(e.target.value==='Mouse Pointer'){
    setState({...state,option:0})
  }
  else{
    setState({...state,option:1})
  }
}
  const gotoRandomPosition = () => {
    const el = document.getElementById(`${character.active}-div`);
    const area = document.getElementById(`preview_area`);
    el.style.position = "relative";
    el.style.transition = "transform 0s";
    console.log("helloe from random")
    var viewportOffset= el.getBoundingClientRect();
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    let difWidth =  window.innerWidth - area.parentElement.offsetWidth - 60;
    let difHeight = window.innerHeight - area.offsetHeight;
    console.log(difHeight+" "+difWidth);
    var randomLeft = Math.floor((Math.random() * (window.innerWidth - difWidth + 1) ) + difWidth);
    
    // console.log(state);
    var randomTop = Math.floor((Math.random() * (window.innerHeight - difHeight + 1)) + difHeight);
    if(randomTop > window.innerHeight) {
      randomTop = randomTop - difHeight;
    }



    setState({
      ...state,
      goto_x: randomLeft,
      goto_y: randomTop,
    });
    

    if(state.goto_x <= left) {
      el.style.left = el.offsetLeft - Math.abs(left - state.goto_x) + "px";

      if(state.goto_y <= top) {
        console.log("yess");
      
      
      el.style.top = el.offsetTop - Math.abs(top - state.goto_y)+"px";
      } else {
        
      
      el.style.top = el.offsetTop + Math.abs(top - state.goto_y)+"px";
      }
    } else {
      el.style.left = el.offsetLeft + Math.abs(left - state.goto_x) + "px";
      if(state.goto_y <= top) {
        console.log("yess");
      
      
      el.style.top = el.offsetTop - Math.abs(top - state.goto_y)+"px";
      } else {
        
      
      el.style.top = el.offsetTop + Math.abs(top - state.goto_y)+"px";
      }
    }

    
  }
  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className={`text-center rounded bg-blue-500 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
        onClick={() => state.option === 0?gotoMousePointer() : gotoRandomPosition()}
      >
        Go to
        <select
          name="gotoOptions"
          onChange={(e)=>handleChange(e)}
          className="text-black text-center py-2 w-32 rounded-lg mx-2"
        >
          <option selected = {state.option === 0} className="text-center" >
            Mouse Pointer
          </option>
          <option selected = {state.option === 1} className="text-center">
            
            Random Position
          </option>
        </select>
        <div
          id={comp_id}
          className="text-center bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          Go to X : {state.goto_x} Y : {state.goto_y}
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

export default connect(mapStateToProps)(GotoMousePointer);
