import React from 'react';
import { isString, isArray, isReactComponent } from 'utilities';

import { IElement, SpanElement } from 'components/_Elements';
import Icon from 'components/Icon';

const LoadingIcon = ({ style: propStyle }) => {
  return (
    <IElement key="loading" style={propStyle} className="uc-button-loading">
      <Icon icon="sys-loading" spin />
    </IElement>
  );
};

const defineContents = (children, between, loading) => {
  const spanStyle = {
    lineHeight: '1.499',
    marginTop: '-.125em'
  };
  let contents;

  let betweenValue;
  if (between) {
    isString(between) ? (betweenValue = between) : (betweenValue = '0.5em');
  } else {
    betweenValue = '0em';
  }

  if (isArray(children) && React.Children.count(children) > 1) {
    contents = React.Children.map(children, (child, index) => {
      let item;
      const marginLeft = index !== 0 ? betweenValue : '0px';
      if (isReactComponent(child) && child.type.name === 'Icon') {
        if (index === 0 && loading) return <LoadingIcon />;
        item = (
          <IElement
            key={index}
            style={{ marginLeft: marginLeft }}
            className="uc-button-icon"
            children={child}
          />
        );
      } else {
        item = (
          <SpanElement
            key={index}
            style={{ marginLeft: marginLeft, ...spanStyle }}
            className="uc-button-inner"
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
    const child = isArray(children) ? children[0] : children;
    if (isReactComponent(child) && child.type.name === 'Icon') {
      contents = loading ? (
        <LoadingIcon />
      ) : (
        <IElement className="uc-button-icon" children={child} />
      );
    } else {
      contents = (
        <SpanElement
          style={spanStyle}
          className="uc-button-inner"
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
