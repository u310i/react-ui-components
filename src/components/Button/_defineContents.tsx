import * as React from 'react';
import {
  getComponentConstants
} from 'scripts';
import { BaseElement } from '..';
import LoadingIcon from './LoadingIcon'

const $ = getComponentConstants('button');
const $names = $.contents.names;
const $styles = $.contents.styles;


const defineContents = (children, between = true, loading) => {
  const spanStyle = $styles.span;

  let contents;

  let betweenValue;
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
      if (React.isValidElement(child) && typeof child === 'function' && child.type.name === 'Icon') {
        if (index === 0 && loading) return <LoadingIcon />
        item = (
          <BaseElement tagName="i"
            key={index}
            style={{ marginLeft: marginLeft }}
            className={$names.ucButtonIcon}
            children={child}
          />
        );
      } else {
        item = (
          <BaseElement tagName="span"
            key={index}
            style={{ marginLeft: marginLeft, ...spanStyle }}
            className={$names.ucButtonInner}
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
    if ( React.isValidElement(child) && typeof child === 'function' && child.type.name === 'Icon') {
      contents = loading ? (
        <LoadingIcon />
      ) : (
        <BaseElement tagName="i" className={$names.ucButtonIcon} children={child} />
      );
    } else {
      contents = (
        <BaseElement tagName="span"
          style={spanStyle}
          className={$names.ucButtonInner}
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
