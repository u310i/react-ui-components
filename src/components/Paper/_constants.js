import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'Paper';

const constants = {
  names: {
    ucPaper: 'uc-paper'
  },
  shadow: $.shadow,
  shape: $.shape,
  color: $.colors.white
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
