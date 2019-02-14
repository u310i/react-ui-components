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

import {
  ButtonElement,
  IElement,
  SpanElement,
  DivElement
} from 'components/_Elements';
import Icon from 'components/Icon';
import Manager from './Manager';

const LoadingIcon = ({ between = true }) => {
  return (
    <IElement key="loading" className="uc-button-loading">
      <Icon
        style={{ marginRight: between ? '0.5em' : '0em' }}
        icon="sys-loading"
        spin
      />
    </IElement>
  );
};

const hoverSelector = '&:hover';
const focusSelector = '&:focus';
const activeSelector = '&:active';

const Button = ({
  children,
  style: propStyle,
  nestedStyle: propNestedStyle = {},
  color = '#1890ff',
  between = true,
  disable,
  ghost,
  shape,
  size,
  fullWidth,
  fullHeight,
  loading,
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

  const fontColor = '#fff';
  const mainColor = color;
  const ligntenColor = LightenDarkenHex(mainColor, 25);
  const darkenColor = LightenDarkenHex(mainColor, -35);

  const fadeAnimation = useMemo(() => {
    return keyframes({
      to: {
        opacity: 0
      }
    });
  }, []);

  const waveAnimation = useMemo(() => {
    return keyframes({
      to: {
        top: '-6px',
        left: '-6px',
        bottom: '-6px',
        right: '-6px',
        borderWidth: '6px'
      }
    });
  }, []);

  const clickAnimationStyle = useMemo(() => {
    return {
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      bottom: '-1px',
      right: '-1px',
      borderRadius: 'inherit',
      border: `0 solid ${mainColor}`,
      opacity: '.25',
      animation: `${fadeAnimation} 2s cubic-bezier(.08, .82, .17, 1), ${waveAnimation} .4s cubic-bezier(.08, .82, .17, 1)`,
      animationFillMode: 'forwards',
      display: 'block',
      pointerEvents: 'none'
    };
  }, [mainColor]);

  let nestedStyle = {};
  let mutableStyle = {};

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

  if (!disable && !ghost) {
    mutableStyle = {
      ...mutableStyle,
      color: fontColor,
      backgroundColor: mainColor,
      borderColor: mainColor
    };
    const hoverFocusStyle = {
      color: fontColor,
      backgroundColor: ligntenColor,
      borderColor: ligntenColor
    };
    nestedStyle = {
      [hoverSelector]: hoverFocusStyle,
      [focusSelector]: hoverFocusStyle,
      [activeSelector]: {
        backgroundColor: darkenColor,
        borderColor: darkenColor
      }
    };
  }

  if (fullWidth) mutableStyle.width = '100%';
  if (fullHeight) mutableStyle.height = '100%';

  if (loading) {
    mutableStyle = {
      ...mutableStyle,
      pointerEvents: 'none',
      backgroundColor: ligntenColor,
      borderColor: ligntenColor
    };
  }

  if (ghost && !disable) {
    mutableStyle = {
      ...mutableStyle,
      color: mainColor,
      backgroundColor: 'transparent',
      borderColor: mainColor
    };
    const hoverFocusStyle = {
      color: ligntenColor,
      borderColor: ligntenColor
    };
    nestedStyle = {
      [hoverSelector]: hoverFocusStyle,
      [focusSelector]: hoverFocusStyle,
      [activeSelector]: {
        color: darkenColor,
        borderColor: darkenColor
      }
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
      [hoverSelector]: hoverFocusStyle,
      [focusSelector]: hoverFocusStyle
    };
    if (ghost) {
      mutableStyle = {
        ...mutableStyle,
        backgroundColor: 'transparent'
      };
      const hoverFocusStyle = {
        backgroundColor: 'transparent'
      };
      nestedStyle = {
        [hoverSelector]: hoverFocusStyle,
        [focusSelector]: hoverFocusStyle
      };
    }
  }

  const style = {
    ...immutableStyle,
    ...mutableStyle,
    ...deepMergeOverrideArray(nestedStyle, propNestedStyle),
    ...propStyle
  };

  const iconStyle = {};
  const spanStyle = {
    lineHeight: '1.499',
    marginTop: '-.125em'
  };

  let newChildren;

  if (isArray(children)) {
    newChildren = React.Children.map(children, (child, index) => {
      let newItem;
      if (isReactComponent(child) && child.type.name === 'Icon') {
        if (between) {
          const spaceValue = '0.5em';
          if (index === 0) {
            iconStyle.marginRight = spaceValue;
          } else if (index === children.length - 1) {
            iconStyle.marginLeft = spaceValue;
          } else {
            iconStyle.marginRight = spaceValue;
            iconStyle.marginLeft = spaceValue;
          }
        }

        newItem =
          loading && index === 0 ? (
            <LoadingIcon />
          ) : (
            <IElement
              key="icon"
              style={iconStyle}
              className="uc-button-icon"
              children={child}
            />
          );
      } else {
        newItem = (
          <SpanElement
            key="inner"
            style={spanStyle}
            className="uc-button-inner"
            children={child}
          />
        );
        if (loading && index === 0) {
          newItem = (
            <>
              <LoadingIcon />
              {newItem}
            </>
          );
        }
      }
      return newItem;
    });
  } else {
    const child = children;
    if (isReactComponent(child) && child.type.name === 'Icon') {
      newChildren = loading ? (
        <LoadingIcon between={false} />
      ) : (
        <IElement
          key="icon"
          style={iconStyle}
          className="uc-button-icon"
          children={child}
        />
      );
    } else {
      newChildren = (
        <SpanElement
          key="inner"
          style={spanStyle}
          className="uc-button-inner"
          children={child}
        />
      );
      if (loading) {
        newChildren = (
          <>
            <LoadingIcon />
            {newChildren}
          </>
        );
      }
    }
  }

  const clickEffectComponent = toggleState !== undefined && hasClickEffect && (
    <DivElement key={toggleState} noRole style={clickAnimationStyle} />
  );

  return (
    <ButtonElement style={style} onClick={onClick} {...props}>
      {newChildren}
      {clickEffectComponent}
    </ButtonElement>
  );
};

Button.Manager = Manager;

export default Button;
