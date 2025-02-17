import React, { forwardRef } from "react";
import { Svg, Path, G, Circle, Polyline } from "react-native-svg";



const ClockEightIcon = ({ ...props }) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Circle cx="12" cy="12" r="10" />
      <Polyline points="12 6 12 12 7.5 12" />
    </Svg>
  );
};

export default ClockEightIcon;
