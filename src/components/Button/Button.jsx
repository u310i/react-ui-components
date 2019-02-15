import React, { useCallback, useMemo } from 'react';
import {
  getFontSize,
  LightenDarkenHex,
  deepMergeOverrideArray,
  keyframes,
  useTimerWithToggle
} from 'utilities';

import { ButtonElement, DivElement } from 'components/_Elements';
import Coordinator from './Coordinator';
import Group from './Group';
import defineContents from './defineContents';

const _hoverSelector = '&:hover';
const _focusSelector = '&:focus';
const _activeSelector = '&:active';

const _white = '#fff';
const _transparent = 'transparent';

const Button = ({
  children,
  style: propStyle,
  nestedStyle: propNestedStyle = {},
  color: propColor = '#1890ff',
  type = 'normal',
  toFill,
  loading,
  disable,
  effectColor,
  between = true,
  shape,
  size,
  fullWidth,
  fullHeight,
  borderStyle,
  borderWidth,
  clickEffect = true,
  onClick: propOnClick,
  ...props
}) => {
  const [toggleState, setToggleState] = useTimerWithToggle(2000);

  const hasClickEffect = !disable && !loading;

  const onClick = useCallback(() => {
    propOnClick && propOnClick();
    hasClickEffect && setToggleState();
  }, [propOnClick, hasClickEffect]);

  const immutableStyle = useMemo(() => {
    return {
      display: 'inline-flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
      height: '2em',
      padding: '0 1em',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '4px',
      touchAction: 'manipulation',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      transition: 'all .3s cubic-bezier(0.645, 0.045, 0.355, 1)'
    };
  }, []);

  const mainColor = propColor;

  const [ligntenColor, darkenColor] = useMemo(() => {
    return [LightenDarkenHex(mainColor, 25), LightenDarkenHex(mainColor, -35)];
  }, [propColor]);

  const [waveAnimation, fadeAnimation] = useMemo(() => {
    const waveAnimation = keyframes({
      to: {
        top: '-6px',
        left: '-6px',
        bottom: '-6px',
        right: '-6px',
        borderWidth: '6px'
      }
    });
    const fadeAnimation = keyframes({
      to: {
        opacity: 0
      }
    });
    return [waveAnimation, fadeAnimation];
  }, []);

  const clickAnimationStyle = useMemo(() => {
    return {
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      bottom: '-1px',
      right: '-1px',
      borderRadius: 'inherit',
      border: `0 solid ${effectColor || mainColor}`,
      opacity: '.25',
      animation: `${fadeAnimation} 2s cubic-bezier(.08, .82, .17, 1), ${waveAnimation} .4s cubic-bezier(.08, .82, .17, 1)`,
      animationFillMode: 'forwards',
      display: 'block',
      pointerEvents: 'none'
    };
  }, [propColor]);

  const [mutableStyle, nestedStyle] = useMemo(() => {
    let mutableStyle = {};
    let nestedStyle = {};

    if (shape) {
      if (shape === 'round') {
        mutableStyle = {
          padding: '0 1.25em',
          borderRadius: '1em'
        };
      }
      if (shape === 'circle') {
        mutableStyle = {
          width: '2em',
          padding: '0',
          borderRadius: '50%'
        };
      }
      if (shape === 'corner') {
        mutableStyle = {
          padding: '0 1.25em',
          borderRadius: '0'
        };
      }
    }
    if (size) mutableStyle.fontSize = getFontSize(size);

    if (borderStyle) {
      if (borderStyle === 'dashed') mutableStyle.borderStyle = 'dashed';
      if (borderStyle === 'dotted') mutableStyle.borderStyle = 'dotted';
    }

    if (borderWidth) {
      mutableStyle.borderWidth = borderWidth;
    }

    if (fullWidth) mutableStyle.width = '100%';
    if (fullHeight) mutableStyle.height = '100%';

    if (!disable) {
      const hoverFocusStyle = {};
      const activeStyle = {};

      if (loading) mutableStyle.pointerEvents = 'none';
      switch (type) {
        case 'normal':
        case 'normal-outline':
          mutableStyle.color = 'rgba(0,0,0,0.65)';
          mutableStyle.backgroundColor = _white;
          mutableStyle.borderColor = '#d9d9d9';
          hoverFocusStyle.color = mainColor;
          hoverFocusStyle.borderColor = mainColor;
          activeStyle.color = darkenColor;
          activeStyle.borderColor = darkenColor;
          if (type === 'normal-outline') {
            mutableStyle.color = _white;
            mutableStyle.backgroundColor = _transparent;
            mutableStyle.borderColor = _white;
            hoverFocusStyle.color = mainColor;
            hoverFocusStyle.backgroundColor = _transparent;
            hoverFocusStyle.borderColor = mainColor;
            activeStyle.color = darkenColor;
            activeStyle.backgroundColor = _transparent;
            activeStyle.borderColor = darkenColor;
          }
          break;
        case 'normal-outline':
          mutableStyle.color = _white;
          mutableStyle.backgroundColor = _transparent;
          mutableStyle.borderColor = _white;
          hoverFocusStyle.color = mainColor;
          hoverFocusStyle.backgroundColor = _transparent;
          hoverFocusStyle.borderColor = mainColor;
          activeStyle.color = darkenColor;
          activeStyle.borderColor = darkenColor;
          break;
        case 'dark':
        case 'dark-outline':
          const darken = '#4e4e4e';
          mutableStyle.color = _white;
          mutableStyle.backgroundColor = darken;
          mutableStyle.borderColor = darken;
          hoverFocusStyle.backgroundColor = mainColor;
          hoverFocusStyle.borderColor = mainColor;
          activeStyle.backgroundColor = darkenColor;
          activeStyle.borderColor = darkenColor;
          if (type === 'dark-outline') {
            mutableStyle.color = darken;
            mutableStyle.backgroundColor = _transparent;
            hoverFocusStyle.color = mainColor;
            hoverFocusStyle.backgroundColor = _transparent;
            activeStyle.color = darkenColor;
            activeStyle.backgroundColor = _transparent;
          }
          break;
        case 'outline':
          mutableStyle.color = mainColor;
          mutableStyle.backgroundColor = _transparent;
          mutableStyle.borderColor = mainColor;
          hoverFocusStyle.color = ligntenColor;
          hoverFocusStyle.backgroundColor = _transparent;
          hoverFocusStyle.borderColor = ligntenColor;
          activeStyle.color = darkenColor;
          activeStyle.backgroundColor = _transparent;
          activeStyle.borderColor = darkenColor;
          break;
        case 'fill':
          mutableStyle.color = _white;
          mutableStyle.backgroundColor = mainColor;
          mutableStyle.borderColor = mainColor;
          hoverFocusStyle.backgroundColor = ligntenColor;
          hoverFocusStyle.borderColor = ligntenColor;
          activeStyle.backgroundColor = darkenColor;
          activeStyle.borderColor = darkenColor;
        default:
      }
      if (toFill) {
        hoverFocusStyle.color = _white;
        hoverFocusStyle.backgroundColor = ligntenColor;
        hoverFocusStyle.borderColor = ligntenColor;
        activeStyle.color = _white;
        activeStyle.backgroundColor = darkenColor;
        activeStyle.borderColor = darkenColor;
      }

      nestedStyle = {
        [_hoverSelector]: hoverFocusStyle,
        [_focusSelector]: hoverFocusStyle,
        [_activeSelector]: activeStyle
      };
    }

    if (disable) {
      mutableStyle = {
        ...mutableStyle,
        color: 'rgba(0, 0, 0, 0.25)',
        backgroundColor: '#f5f5f5',
        borderColor: '#d9d9d9',
        boxShadow: 'none',
        cursor: 'not-allowed'
      };
      const hoverFocusStyle = {
        color: 'rgba(0, 0, 0, 0.25)',
        backgroundColor: '#f5f5f5',
        borderColor: '#d9d9d9'
      };
      nestedStyle = {
        [_hoverSelector]: hoverFocusStyle,
        [_focusSelector]: hoverFocusStyle
      };
      if (
        type === 'outline' ||
        type === 'normal-outline' ||
        type === 'dark-outline'
      ) {
        mutableStyle = {
          ...mutableStyle,
          backgroundColor: 'transparent',
          borderColor: 'rgba(0, 0, 0, 0.25)'
        };
        const hoverFocusStyle = {
          backgroundColor: 'transparent'
        };
        nestedStyle = {
          [_hoverSelector]: hoverFocusStyle,
          [_focusSelector]: hoverFocusStyle
        };
      }
    }
    return [mutableStyle, nestedStyle];
  }, [
    propColor,
    shape,
    size,
    borderStyle,
    borderWidth,
    fullWidth,
    fullHeight,
    type,
    toFill,
    loading,
    disable,
    effectColor,
    between,
    disable
  ]);

  const style = {
    ...immutableStyle,
    ...mutableStyle,
    ...deepMergeOverrideArray(nestedStyle, propNestedStyle),
    ...propStyle
  };

  let contents = useMemo(() => {
    return defineContents(children, between, loading);
  }, [children, between, loading]);

  const clickEffectComponent = clickEffect &&
    toggleState !== undefined &&
    hasClickEffect && (
      <DivElement key={toggleState} noRole style={clickAnimationStyle} />
    );

  return (
    <ButtonElement style={style} onClick={onClick} {...props}>
      {contents}
      {clickEffectComponent}
    </ButtonElement>
  );
};

Button.Group = Group;
Button.Coordinator = Coordinator;

export default Button;
