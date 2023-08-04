import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addList, deleteList } from "../redux/midarea/actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import { setFlag, setSpace, setStop } from "../redux/events/eventActions";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { purple } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

// Styling for MaterialUI Components
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      marginRight: 20,
      marginLeft: 20,
    },
  })
);

// Customized button for Running Lists
const RunButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    fontSize: "13px",
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

// Mid Area Component
function MidArea({
  area_list,
  add_list,
  delete_list,
  event_values,
  set_flag,
  set_space,
}) {
  const [flagCheck, setFlagCheck] = useState(0);
  const [spaceCheck, setSpaceCheck] = useState(0);
  const [stop, setStop] = useState(false);
  const classes = useStyles();
  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  useEffect(() => {
    event_values.flag === 0 ? setFlagCheck(0) : setFlagCheck(1);
    waitForFlag();
  }, [event_values.flag, flagCheck]);

  useEffect(() => {
    event_values.space === 0 ? setSpaceCheck(0) : setSpaceCheck(1);
    waitForSpace();
  }, [event_values.space, spaceCheck]);

  const waitForFlag = () => {
    const promise = new Promise((resolve) => {
      if (flagCheck === 1) {
        return Promise.resolve(1);
      }
    });
    return promise;
  };

  const waitForSpace = () => {
    const promise = new Promise((resolve) => {
      if (spaceCheck === 1) {
        return Promise.resolve(1);
      } else {
        window.onkeypress = function (event) {
          if (event.which == 32) {
            set_space(1);
          }
        };
      }
    });
    return promise;
  };

  // Handle Running the list
  const handleClick = async (arr, id) => {
    console.log(stop);
    if (arr.length === 0 || stop) return;
    
    let i = 0;
    let repeat = 1;

    let str1 = `comp${arr[i]}-${id}-${i}`;

    // Handle Wait at first index
    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    }

    if (arr[i] === "FLAG") {
      if (flagCheck === 0) {
        await waitForFlag().then((res) => {
          console.log(res, "res");
          i++;
        });
      }
    }
    if (arr[i] === "SPACE") {
      if (spaceCheck === 0) {
        await waitForSpace().then((res) => {
          console.log(res, "res");
          i++;
        });
      }
    }

    if (arr[i] === "STOP") {
      setStop(true);
      return;
    }
    // Handle Repeat at first index
    else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    /* Each function execution takes 2 seconds */
    var cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
      }

      if (arr[i] === "STOP") {
        setStop(true);
        return;
      }

      //Handle Forever
      if(arr[i] === "FOREVER") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        i++;
      }

      // if Forever is at previous index
      else if(arr[i - 1] === "FOREVER") {
        
          console.log("forever");
          let str2 = `comp${arr[i]}-${id}-${i}`;
          eventFire(document.getElementById(str2), "click");
        
        
      }

      

      // Handle Wait
      else if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      }
      // Handle Repeat Component at current index
      else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      }
      // If Repeat component is at previous index
      else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
    set_flag(0);
    set_space(0);
  };
  return (
    <div className="flex-1 h-full overflow-auto p-2">
      <div className="flex justify-between">
        <div className="font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto">
          Mid Area
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => add_list()}
          >
            Add List{" "}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<RemoveIcon />}
            onClick={() => delete_list()}
          >
            Delete List{" "}
          </Button>
        </div>
      </div>
      <div className="grid grid-flow-col">
        {area_list.midAreaLists.map((l) => {
          return (
            <div className="w-60" key={l.id}>
              <Paper elevation={3} className="flex items-center justify-center rounded-lg">
                <div className="w-52 p-2">
                  <Droppable droppableId={l.id} type="COMPONENTS">
                    {(provided) => {
                      return (
                        <ul
                          className={`${l.id} w-48 h-full`}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div className="text-center mx-auto my-2 mb-4">
                            <RunButton
                              variant="contained"
                              className={classes.button}
                              startIcon={<PlayArrowIcon />}
                              onClick={() => handleClick(l.comps, l.id)}
                            >
                              Run{" "}
                            </RunButton>
                          </div>

                          {l.comps &&
                            l.comps.map((x, i) => {
                              let str = `${x}`;
                              let component_id = `comp${str}-${l.id}-${i}`
                              return (
                                <Draggable
                                  key={`${str}-${l.id}-${i}`}
                                  draggableId={`${str}-${l.id}-${i}`}
                                  index={i}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {getComponent(str, component_id)}
                                      {provided.placeholder}
                                    </li>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </ul>
                      );
                    }}
                  </Droppable>
                </div>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    area_list: state.list,
    event_values: state.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_list: () => dispatch(addList()),
    delete_list: () => dispatch(deleteList()),
    set_flag: (value) => dispatch(setFlag(value)),
    set_space: (value) => dispatch(setSpace(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
