import React from 'react';
import { isArray, isReactComponent } from 'utilities';

import { IElement, SpanElement } from 'components/_Elements';
import Icon from 'components/Icon';

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

const defineContents = (children, between, loading) => {
  const iconStyle = {};
  const spanStyle = {
    lineHeight: '1.499',
    marginTop: '-.125em'
  };
  let contents;

  if (isArray(children) && React.Children.count(children) > 1) {
    contents = React.Children.map(children, (child, index) => {
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
    const child = isArray(children) ? children[0] : children;
    if (isReactComponent(child) && child.type.name === 'Icon') {
      contents = loading ? (
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
      contents = (
        <SpanElement
          key="inner"
          style={spanStyle}
          className="uc-button-inner"
          children={child}
        />
      );
      if (loading) {
        contents = (
          <>
            <LoadingIcon />
            {contents}
          </>
        );
      }
    }
  }
  return contents;
};

export default defineContents;
