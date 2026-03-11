import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const UploadIcon = ({ size, width, height, color, ...props }: IconProps) => {
  return (
    <Svg
      width={width ?? size ?? 16}
      height={height ?? size ?? 16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M7 12V3.85L4.4 6.45L3 5L8 0L13 5L11.6 6.45L9 3.85V12H7ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z"
        fill={color ?? 'white'}
      />
    </Svg>
  );
};
