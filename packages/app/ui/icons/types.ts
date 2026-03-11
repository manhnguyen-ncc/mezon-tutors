import { SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  primary?: string;
}
