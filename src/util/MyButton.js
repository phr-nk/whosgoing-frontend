import React, { Component } from "react";
import ToolTip from "@material-ui/core/ToolTip";
import IconButton from "@material-ui/core/IconButton";
export default ({
  children,
  onClick,
  btnClassName,
  tipClassName,
  tip,
  disabled,
}) => (
  <ToolTip title={tip} className={tipClassName}>
    <IconButton onClick={onClick} className={btnClassName} disabled={disabled}>
      {children}
    </IconButton>
  </ToolTip>
);
