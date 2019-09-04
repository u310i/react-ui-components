import * as React from 'react';
import { getComponentConstants } from 'scripts';
import { BaseElement } from '..';
import LoadingIcon from './LoadingIcon';

const $ = getComponentConstants('button');
const $names = $.contents.names;
const $styles = $.contents.styles;

const defineContents = (
  children: React.ReactNode,
  between: $Type.Components.ButtonBetween = true,
  loading = false
) => {
  const spanStyle = $styles.span;

  let contents;

  let betweenValue: string;
  if (between) {
    typeof between === 'string'
      ? (betweenValue = between)
      : (betweenValue = $styles.between);
  } else {
    betweenValue = $styles.noneBetween;
  }

  if (Array.isArray(children) && React.Children.count(children) > 1) {
    contents = React.Children.map(children, (child, index) => {
      let item;
      const marginLeft = index === 0 ? $styles.noneBetween : betweenValue;
      if (
        React.isValidElement(child) &&
        typeof child.type === 'function' &&
        child.type.name === 'Icon'
      ) {
        if (index === 0 && loading) return <LoadingIcon />;
        item = (
          <BaseElement
            elementName="i"
            key={index}
            style={{ marginLeft: marginLeft }}
            className={$names.buttonIcon}
            children={child}
          />
        );
      } else {
        item = (
          <BaseElement
            elementName="span"
            key={index}
            style={{ marginLeft: marginLeft, ...spanStyle }}
            className={$names.buttonInner}
            children={child}
          />
        );
        if (loading && index === 0) {
          item = (
            <React.Fragment key={index}>
              <LoadingIcon style={{ marginRight: betweenValue }} />
              {item}
            </React.Fragment>
          );
        }
      }
      return item;
    });
  } else {
    const child = Array.isArray(children) ? children[0] : children;
    if (
      React.isValidElement(child) &&
      typeof child.type === 'function' &&
      child.type.name === 'Icon'
    ) {
      contents = loading ? (
        <LoadingIcon />
      ) : (
        <BaseElement
          elementName="i"
          className={$names.buttonIcon}
          children={child}
        />
      );
    } else {
      contents = (
        <BaseElement
          elementName="span"
          style={spanStyle}
          className={$names.buttonInner}
          children={child}
        />
      );
      if (loading) {
        contents = (
          <>
            <LoadingIcon style={{ marginRight: betweenValue }} />
            {contents}
          </>
        );
      }
    }
  }
  return contents;
};

export default defineContents;
