import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const CloseIcon = ({ size, width, height, color, ...props }: IconProps) => {
  return (
    <Svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 11 11"
      fill="none"
      {...props}
    >
      <Path
        d="M1.05 10.5L0 9.45L4.2 5.25L0 1.05L1.05 0L5.25 4.2L9.45 0L10.5 1.05L6.3 5.25L10.5 9.45L9.45 10.5L5.25 6.3L1.05 10.5Z"
        fill={color}
      />
    </Svg>
  );
};
