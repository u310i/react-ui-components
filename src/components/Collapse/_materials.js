import $ from 'components/_materials';
import { createComponentMaterials, getComponentMaterials } from 'scripts';

const name = 'collapse';

const $tSelectors = $.selectors.transition;

const materials = {
  names: {
    ucCollapse: 'uc-collapse',
    ucCollapseInner: 'uc-collapse-inner'
  },
  selectors: {
    enters: $tSelectors.enters,
    exit: $tSelectors.exit
  },
  styles: {
    height: 'auto',
    duration: $.props.transitionDuration,
    easing: $.props.transitionEasing,
    collapsedHeight: '0px',
    transitionProperty: 'height',
    overflow: 'hidden',
    inner: {
      display: 'flex'
    }
  }
};

createComponentMaterials(materials, name);

export default getComponentMaterials(name);
