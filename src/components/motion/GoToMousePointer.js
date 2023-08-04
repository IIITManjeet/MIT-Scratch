import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
const t1  = {
  background: `url("data:image/svg+xml,%3Csvg width='197' height='72' viewBox='0 0 197 72' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.2993 1H4.27196C2.4649 1 1 2.4649 1 4.27195V56.8711C1 58.6782 2.46491 60.1431 4.27196 60.1431H18.2021C19.1185 60.1431 19.993 60.5274 20.6127 61.2026L28.6324 69.9405C29.2521 70.6157 30.1265 71 31.0429 71H48.23C49.1549 71 50.0367 70.6085 50.657 69.9224L58.5243 61.2207C59.1446 60.5346 60.0264 60.1431 60.9513 60.1431H192.806C194.613 60.1431 196.078 58.6782 196.078 56.8711V4.27195C196.078 2.4649 194.613 1 192.806 1H60.8539C59.9861 1 59.1539 1.34472 58.5402 1.95833L50.6411 9.85753C50.0274 10.4711 49.1952 10.8159 48.3274 10.8159H30.9457C30.0865 10.8159 29.2617 10.4779 28.6496 9.87486L20.5955 1.941C19.9834 1.338 19.1586 1 18.2993 1Z' fill='%235F95F8' stroke='%234687FE' stroke-width='1.09065'/%3E%3C/svg%3E") no-repeat center center/cover`,
  width: "206px",
  height: "76px",
}
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
    <div 
    style={t1} className="flex justify-center items-center">
      <div
        id={comp_id}
        className={`text-center rounded text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
        onClick={() => state.option === 0?gotoMousePointer() : gotoRandomPosition()}
      >
        Go to
        <select
          name="gotoOptions"
          onChange={(e)=>handleChange(e)}
          className="text-black text-center w-32 rounded-lg mx-2"
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
          className="w-40 mt-1 flex justify-between text-white text-sm cursor-pointer"
          
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

export default connect(mapStateToProps)(GotoMousePointer);
