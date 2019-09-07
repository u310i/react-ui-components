import React from 'react';
import $ from './_constants';
import {
  genTransitionProperty,
  genDurations,
  genEasings,
  setTransition,
} from 'scripts';
import { CSSTransition, BaseElement } from '..';

const $names = $.names;
const $styles = $.styles;

type Props = $Type.CreateProps<
  $Type.Transition.CommonProps & {
    collapsedHeight?: string;
    innerProps?: $Type.PropComponentProps<typeof BaseElement>;
  },
  typeof BaseElement,
  Omit<$Type.Components.CSSTransitionProps, 'timeout'>
>;

const Collapse: React.FC<Props> = ({
  in: inProp,
  children,
  duration = $styles.duration,
  easing = $styles.easing,
  collapsedHeight = $styles.collapsedHeight,
  innerProps,
  disableHideVisibility,
  appear = true,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...other
}) => {
  const _outerRef_ = React.useRef<null | HTMLElement>(null);
  const _innerRef_ = React.useRef<null | HTMLElement>(null);

  const [durations, easings] = React.useMemo(() => {
    return [genDurations(duration), genEasings(easing)];
  }, [duration, easing]);

  React.useLayoutEffect(() => {
    const node = _outerRef_.current;
    if (!node) return;
    if (!appear && inProp) {
      node.style.height = $styles.enteredHeight;
      node.style.overflow = 'visible';
    } else {
      node.style.height = collapsedHeight;
      node.style.overflow = 'hidden';
      if (!disableHideVisibility) node.style.visibility = 'hidden';
    }
  }, []);

  const handleEntering = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      const [duration, easing] = appearing
        ? [durations.appear, easings.appear]
        : [durations.enter, easings.enter];
      setTransition(
        node,
        genTransitionProperty([
          {
            property: 'height',
            duration,
            easing,
          },
        ])
      );
      if (!_innerRef_.current) return;
      node.style.height = `${_innerRef_.current.clientHeight}px`;
      node.style.overflow = 'hidden';
      if (!disableHideVisibility) node.style.visibility = null;
      if (onEntering) onEntering(node, appearing);
    },
    [onEntering]
  );

  const handleEntered = React.useCallback(
    (node: HTMLElement, appearing: boolean) => {
      node.style.overflow = 'visible';
      node.style.height = $styles.enteredHeight;
      if (onEntered) onEntered(node, appearing);
    },
    [onEntered]
  );

  const handleExit = React.useCallback(
    (node: HTMLElement) => {
      setTransition(
        node,
        genTransitionProperty([
          {
            property: 'height',
            duration: durations.exit,
            easing: easings.exit,
          },
        ])
      );
      node.style.height = `${node.clientHeight}px`;
      node.style.overflow = 'hidden';
      if (onExit) onExit(node);
    },
    [onExit]
  );

  const handleExiting = React.useCallback(
    (node: HTMLElement) => {
      node.style.height = collapsedHeight;
      if (onExiting) onExiting(node);
    },
    [onExiting]
  );

  const handleExited = React.useCallback(
    (node: HTMLElement) => {
      if (!disableHideVisibility) node.style.visibility = 'hidden';
      if (onExited) onExited(node);
    },
    [onExited]
  );

  return (
    <CSSTransition
      disableClassing={true}
      lazyAppear={true}
      appear={appear}
      in={inProp}
      timeout={durations}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
      {...other}
    >
      {(
        state: $Type.Components.CSSTransitionChildStatus,
        childProps: $Type.Components.BaseElementProps
      ) => {
        return (
          <BaseElement
            elementName="div"
            _style_={$styles.outer.style}
            _className_={$names.collapse}
            _refer_={_outerRef_}
            {...childProps}
          >
            <BaseElement
              elementName="div"
              _style_={$styles.inner.style}
              _className_={$names.collapseInner}
              _refer_={_innerRef_}
              {...innerProps}
            >
              {children}
            </BaseElement>
          </BaseElement>
        );
      }}
    </CSSTransition>
  );
};

export default Collapse;
