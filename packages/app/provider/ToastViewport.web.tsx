'use client';

import { ToastViewport as ToastViewportOg } from '@tamagui/toast';

export const ToastViewport = () => {
  return (
    <ToastViewportOg
      left={0}
      right={0}
      top={10}
    />
  );
};
