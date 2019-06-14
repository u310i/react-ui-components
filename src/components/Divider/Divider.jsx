import React, { useMemo } from 'react';
import { HrElement } from '../_Elements';

const Divider = props => {
  const mainStyle = useMemo(() => {
    return {
      flexShrink: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.12);'
    };
  }, []);
  return <HrElement style={mainStyle} {...props} />;
};

export default Divider;
