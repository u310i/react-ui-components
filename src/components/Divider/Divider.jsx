import React, { useMemo } from 'react';
import { HrElement } from 'elements';

const Divider = props => {
  const solidStyle = useMemo(() => {
    return {
      flexShrink: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.12);'
    };
  }, []);
  return <HrElement style={solidStyle} {...props} />;
};

export default Divider;
