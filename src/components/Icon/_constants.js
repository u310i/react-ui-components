import $ from 'components/_constants';
import { createComponentConstants, getComponentConstants } from 'scripts';

const name = 'icon';

const constants = {
  names: {
    ariaLabelPrefix: 'icon: '
  },
  styles: {
    main: {
      display: 'inline-block',
      overflow: 'visible',
      height: '1em',
      fontSize: 'inherit',
      verticalAlign: '-.125em'
    },
    marginLeft: '0.5em',
    marginRight: '0.5em',
    currentColor: 'currentColor',
    height: 1,
    heightOnBorder: 1.5,
    widthRatioOnFixed: 1.25,
    precision: 3,
    border: {
      border: 'main 0.08em #eee',
      borderRadius: '0.1em',
      padding: '0.2em 0.25em 0.15em'
    },
    pullLeft: {
      marginRight: '0.3em',
      float: 'left'
    },
    pullRight: {
      marginLeft: '0.3em',
      float: 'right'
    },
    flipHorizontal: 'scale(-1, 1)',
    flipVertical: 'scale(1, -1)',
    flipBoth: 'scale(-1, -1)',
    roll: {
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      },
      spin: '1s infinite linear',
      pulse: '1s infinite steps(8)'
    }
  }
};

createComponentConstants(constants, name);

export default getComponentConstants(name);
