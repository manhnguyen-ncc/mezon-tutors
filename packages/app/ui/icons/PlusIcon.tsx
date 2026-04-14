import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const PlusIcon = ({ size, width, height, color, ...props }: IconProps) => {
  return (
    <Svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12 5V19M5 12H19"
        stroke={color ?? 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
