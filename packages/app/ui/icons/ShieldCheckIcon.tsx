import Svg, { Rect, Path } from 'react-native-svg';
import { IconProps } from './types';

export const ShieldCheckIcon = ({ size, width, height, color, primary, ...props }: IconProps) => (
  <Svg
    viewBox="0 0 44 49"
    width={width ?? size}
    height={height ?? size}
    fill="none"
    {...props}
  >
    <Rect
      width="44"
      height="49"
      rx="22"
      fill={primary || 'rgba(17,82,212,0.2)'}
    />
    <Path
      d="M20.6875 28.9375L27.75 21.875L25.9688 20.0938L20.6875 25.375L18.0625 22.75L16.2812 24.5312L20.6875 28.9375ZM22 37C19.1042 36.2708 16.7135 34.6094 14.8281 32.0156C12.9427 29.4219 12 26.5417 12 23.375V15.75L22 12L32 15.75V23.375C32 26.5417 31.0573 29.4219 29.1719 32.0156C27.2865 34.6094 24.8958 36.2708 22 37ZM22 34.375C24.1667 33.6875 25.9583 32.3125 27.375 30.25C28.7917 28.1875 29.5 25.8958 29.5 23.375V17.4688L22 14.6562L14.5 17.4688V23.375C14.5 25.8958 15.2083 28.1875 16.625 30.25C18.0417 32.3125 19.8333 33.6875 22 34.375Z"
      fill={color || 'rgba(17,82,212,1)'}
    />
  </Svg>
);
