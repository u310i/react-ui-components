import React from 'react';
import Link from 'atoms/Link';

export default ({ theme, containerProps: { list, common, general } }) => {
  let textNode, attributes, styles;
  const items = list.map((item, index) => {
    ({ textNode, attributes, styles } = item);
    return (
      <li key={index}>
        <Link
          containerProps={{
            textNode: textNode,
            attributes: { ...common.attributes, ...attributes },
            styles: {
              ...general.styles,
              ...common.styles,
              ...styles
            }
          }}
        />
      </li>
    );
  });

  const componentStyle = {
    display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    margin: '0',
    backgroundColor: '#fafad2',
    '& > li': {
      display: 'block',
      '& > a': {
        // color: '#f2f2f2',
        color: 'black',
        // textAlign: 'center',
        // paddingLeft: '1rem',
        // paddingRight: '1rem',
        padding: '0',
        margin: '0',
        fontSize: '1rem',
        display: 'block',
        '&:link': {},
        '&:visited': {},
        '&:hover': {
          backgroundColor: '#ddd',
          color: 'black'
        },
        [theme.breakpoints.keys.sm]: {
          display: 'none'
        }
      }
    }
  };

  return <ul css={componentStyle}>{items}</ul>;
};
