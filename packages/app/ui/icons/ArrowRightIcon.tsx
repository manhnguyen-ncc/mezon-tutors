import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const ArrowRightIcon = ({ size, width, height, color, ...props }: IconProps) => {
  return (
    <Svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
        fill={color ?? '#94A3B8'}
      />
    </Svg>
  );
};
