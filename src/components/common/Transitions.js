import React from "react";
import Slide from "@material-ui/core/Slide";

//some components has transition component property
//those transitions gives the component the needed transition coponent for the animation

// the time of the animation
const transitionTimeOut = { enter: 500, exit: 500 };

export function TransitionUp(props) {
  return <Slide direction="up" timeout={transitionTimeOut} {...props} />;
}

export function TransitionDown(props) {
  return <Slide direction="down" timeout={transitionTimeOut} {...props} />;
}

export function TransitionRight(props) {
  return <Slide direction="right" timeout={transitionTimeOut} {...props} />;
}

export function TransitionLeft(props) {
  return <Slide direction="left" timeout={transitionTimeOut} {...props} />;
}
