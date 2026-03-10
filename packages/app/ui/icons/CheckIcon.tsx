import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const CheckIcon = ({ size, width, height, color, ...props }: IconProps) => {
  return (
    <Svg
      width={width ?? size}
      height={height ?? (Number(size) * 10) / 13}
      viewBox="0 0 13 10"
      fill="none"
      {...props}
    >
      <Path
        d="M4.275 9.01875L0 4.74375L1.06875 3.675L4.275 6.88125L11.1562 0L12.225 1.06875L4.275 9.01875Z"
        fill={color}
      />
    </Svg>
  );
};
