import React, { forwardRef } from "react";
import { Svg, Path, G, Circle, Polyline } from "react-native-svg";

const ClockSixthIcon = ({ ...props }) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 12v3.5" />
      <Path d="M12 7v5" />
    </Svg>
  );
};

export default ClockSixthIcon;
