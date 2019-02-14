import React, { useCallback, useMemo } from 'react';
import {
  isArray,
  isReactComponent,
  getFontSize,
  LightenDarkenHex,
  deepMergeOverrideArray,
  keyframes,
  useTimerWithToggle
} from 'utilities';

import Icon from 'components/Icon';
import Button from './Button';

const Manager = ({ type, icon = {}, ...props }) => {
  if (icon.icon) {
  }
  const Children = '';
  return <Button {...props}>{Children}</Button>;
};

export default Manager;
