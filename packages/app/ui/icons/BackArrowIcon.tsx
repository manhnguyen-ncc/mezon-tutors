import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const BackArrowIcon = ({ size, width, height, color, ...props }: IconProps) => {
  return (
    <Svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z"
        fill={color ?? '#94A3B8'}
      />
    </Svg>
  );
};
