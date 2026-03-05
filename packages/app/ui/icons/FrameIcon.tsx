import Svg, { Path, Rect } from 'react-native-svg';
import { IconProps } from './types';

export const FrameIcon = ({ size, width, height, color, ...props }: IconProps) => (
  <Svg
    width={width ?? size}
    height={height ?? size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="2"
      stroke={color ?? 'currentColor'}
      strokeWidth="2"
      fill="none"
    />
    <Rect
      x="6"
      y="6"
      width="12"
      height="12"
      rx="1"
      stroke={color ?? 'currentColor'}
      strokeWidth="1.5"
      fill="none"
    />
    <Path d="M2 8H6M18 8H22M2 16H6M18 16H22M8 2V6M16 2V6M8 18V22M16 18V22" stroke={color ?? 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);
