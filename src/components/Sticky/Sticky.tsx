import * as React from 'react';
import $ from './_constants';
import { isNumber } from 'scripts';
import { BaseElement, EventListener } from '..';

const $names = $.names;
const $style = $.style;

const resetStyle = (node: HTMLElement) => {
  node.style.position = null;
  node.style.top = null;
  node.style.bottom = null;
  node.style.left = null;
};

const addSpaceToOuter = (outerNode: HTMLElement, innerNode: HTMLElement) => {
  const computedStyle = window.getComputedStyle(innerNode);
  outerNode.style.height = computedStyle.getPropertyValue('height');
  outerNode.style.width = computedStyle.getPropertyValue('width');
};

const removeSpaceFromOuter = (outerNode: HTMLElement) => {
  outerNode.style.height = '';
  outerNode.style.width = '';
};

type Props = $Type.ReactUtils.CreateProps<{
  innerProps?: $Type.ReactUtils.PropComponentProps<typeof BaseElement>;
  outerProps?: $Type.ReactUtils.PropComponentProps<typeof BaseElement>;
  absoluteWrapperProps?: $Type.ReactUtils.PropComponentProps<typeof BaseElement>;
  offsetTop?: number;
  offsetBottom?: number;
  enableAbsolute?: boolean;
}>;

const Sticky: React.FC<Props> = ({
  children,
  innerProps = {},
  outerProps = {},
  absoluteWrapperProps = {},
  offsetTop = 0,
  offsetBottom,
  enableAbsolute = false,
}) => {
  const [isTopState, setIsTop] = React.useState(false);
  const [isBottomState, setIsBottom] = React.useState(false);

  const outerRef = React.useRef<null | HTMLElement>(null);
  const innerRef = React.useRef<null | HTMLElement>(null);

  const [canStickingTop, canStickingBottom] = React.useMemo(() => {
    return [
      typeof offsetTop !== 'undefined' && isNumber(offsetTop),
      typeof offsetBottom !== 'undefined' && isNumber(offsetBottom),
    ];
  }, [offsetTop, offsetBottom]);

  const managerRef = React.useRef<{
    isTop: null | boolean;
    prevIsTop: null | boolean;
    isBottom: null | boolean;
    prevIsBottom: null | boolean;
  }>({
    isTop: null,
    prevIsTop: null,
    isBottom: null,
    prevIsBottom: null,
  });

  const stickingListener = React.useCallback(() => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const manager = managerRef.current;
    if (canStickingTop) {
      manager.prevIsTop = manager.isTop;
      manager.isTop = rect.top < offsetTop;
      if (manager.isTop !== manager.prevIsTop) {
        setIsTop(manager.isTop);
      }
    }
    if (canStickingBottom) {
      manager.prevIsBottom = manager.isBottom;
      manager.isBottom =
        rect.bottom + (offsetBottom as number) > window.innerHeight;
      if (manager.isBottom !== manager.prevIsBottom) {
        setIsBottom(manager.isBottom);
      }
    }
  }, [offsetTop, offsetBottom]);

  React.useLayoutEffect(() => {
    if (!outerRef.current) return;
    const manager = managerRef.current;
    manager.isTop = null;
    manager.prevIsTop = null;
    manager.isBottom = null;
    manager.prevIsBottom = null;
    const rect = outerRef.current.getBoundingClientRect();
    if (canStickingTop) {
      if (rect.top < offsetTop) {
        manager.isTop = true;
        manager.prevIsTop = true;
        setIsTop(true);
      }
    }
    if (canStickingBottom) {
      if (rect.bottom + (offsetBottom as number) > window.innerHeight) {
        manager.isBottom = true;
        manager.prevIsBottom = true;
        setIsBottom(true);
      }
    }
  }, [offsetTop, offsetBottom]);

  React.useLayoutEffect(() => {
    if (!innerRef.current || !outerRef.current) return;
    if (isTopState) {
      innerRef.current.style.position = 'fixed';
      innerRef.current.style.top = `${offsetTop}px`;
      innerRef.current.style.left = '0px';
      addSpaceToOuter(outerRef.current, innerRef.current);
    } else if (isBottomState) {
      innerRef.current.style.position = 'fixed';
      innerRef.current.style.bottom = `${offsetBottom}px`;
      innerRef.current.style.left = '0px';
      addSpaceToOuter(outerRef.current, innerRef.current);
    } else {
      resetStyle(innerRef.current);
      removeSpaceFromOuter(outerRef.current);
    }
  }, [isTopState, isBottomState]);

  const styles = React.useMemo(() => {
    return {
      inner: {
        zIndex: $style.zIndex,
      },
      outer: {
        position: enableAbsolute ? 'absolute' : undefined,
      },
      absoluteWrapper: {
        position: 'relative',
      },
    } as const;
  }, [enableAbsolute]);

  const innerComponent = (
    <BaseElement
      elementName="div"
      _refer_={outerRef}
      _style_={styles.outer}
      _className_={$names.stickyOuter}
      {...outerProps}
    >
      <BaseElement
        elementName="div"
        _refer_={innerRef}
        _style_={styles.inner}
        _className_={$names.stickyInner}
        {...innerProps}
      >
        {typeof children === 'function'
          ? children(isTopState, isBottomState)
          : children}
      </BaseElement>
    </BaseElement>
  );

  return (
    <EventListener
      target={window}
      type="scroll"
      listener={stickingListener}
      optimized={true}
    >
      {enableAbsolute ? (
        <BaseElement
          elementName="div"
          _style_={styles.absoluteWrapper}
          _className_={$names.stickyAbsoluteWrapper}
          {...absoluteWrapperProps}
        >
          {innerComponent}
        </BaseElement>
      ) : (
        innerComponent
      )}
    </EventListener>
  );
};

export default Sticky;
