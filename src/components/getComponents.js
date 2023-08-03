import React from "react";
import Move from "./motion/Move";
import TurnAntiClockwise from "./motion/TurnAntiClockwise";
import TurnClockwise from "./motion/TurnClockwise";
import GotoXY from "./motion/Goto";
import SayMessage from "./looks/SayMessage";
import SayMessageWithTimer from "./looks/SayMessageWithTimer";
import Size from "./looks/Size";
import Show from "./looks/Show";
import Hide from "./looks/Hide";
import Wait from "./control/Wait";
import Repeat from "./control/Repeat";
import Forever from "./control/Forever";
import HideMessage from "./looks/HideMessage";
import MoveY from "./motion/MoveY";
import BroadcastMessage from "./events/broadcast";
import Think from "./looks/Think";
import ThinkWithTimer from "./looks/ThinkWithTimer";
import GoToMousePointer from "./motion/GoToMousePointer";
import PointToMousePointer from "./motion/PointToMousePointer";
import PointInDirection from "./motion/PointInDirection";
import SetXTo from "./motion/SetXTo";
import SetYTo from "./motion/SetYTo";
import SizeByPercent from "./looks/SizeByPercent";
import Color from "./looks/Color";
import Reset from "./looks/Reset";
import { Flag } from "@material-ui/icons";
import FlagClick from "./events/flagClick";
import SpaceClick from "./events/spaceClick";
import Stop from "./control/Stop";

// fetch components based on different keys
export const getComponent = (key, id) => {
  switch (key) {
    case "MOVE_Y":
      return <MoveY comp_id={id} />;
    case "MOVE":
      return <Move comp_id={id} />;

    case "TURN_CLOCKWISE":
      return <TurnClockwise comp_id={id} />;

    case "TURN_ANTI_CLOCKWISE":
      return <TurnAntiClockwise comp_id={id} />;

    case "GOTO_XY":
      return <GotoXY comp_id={id} />;

    case "SAY_MESSAGE":
      return <SayMessage comp_id={id} />;

    case "POINT_IN_DIRECTION":
      return <PointInDirection comp_id={id} />;

    case "STOP":
      return <Stop comp_id={id} />;

    case "SET_X":
      return <SetXTo comp_id={id} />;

    case "SET_Y":
      return <SetYTo comp_id={id} />;

    case "POINT_MOUSE_POINTER":
      return <PointToMousePointer comp_id={id} />;

    case "SIZE_BY_PERCENT":
      return <SizeByPercent comp_id={id} />;

    case "COLOR":
      return <Color comp_id={id} />;

    case "SAY_MESSAGE_WITH_TIMER":
      return <SayMessageWithTimer comp_id={id} />;

    case "SIZE":
      return <Size comp_id={id} />;

    case "SHOW":
      return <Show comp_id={id} />;

    case "HIDE":
      return <Hide comp_id={id} />;

    case "BROADCAST":
      return <BroadcastMessage comp_id={id} />;

    case "WAIT":
      return <Wait comp_id={id} />;

    case "FLAG":
      return <FlagClick comp_id={id} />;

    case "REPEAT":
      return <Repeat comp_id={id} />;

    case "FOREVER":
      return <Forever comp_id={id} />;


    case "SPACE":
      return <SpaceClick comp_id={id} />;

    case "HIDE_MESSAGE":
      return <HideMessage comp_id={id} />;

    case "THINK":
      return <Think comp_id={id} />;

    case "THINK_TIMER":
      return <ThinkWithTimer comp_id={id} />;

    case "GOTO_MOUSE_POINTER":
      return <GoToMousePointer comp_id={id} />;

    case "RESET":
      return <Reset comp_id={id} />;

    default:
      return React.null;
  }
};
