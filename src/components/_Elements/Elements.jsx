import React from 'react';
import Base from './Base';
import {
  allElementsCommonStyle,
  ul_ol_style,
  p_style,
  pre_style,
  main_style,
  h1_h2_h3_h4_h5_h6_style,
  h1_style,
  h2_style,
  h3_style,
  h4_style,
  h5_style,
  h6_style,
  hr_style,
  pre_code_kbd_samp_style,
  a_style,
  abbr_style,
  b_strong_style,
  small_style,
  sub_sup_style,
  sub_style,
  sup_style,
  img_style,
  button_input_optgroup_select_textarea_style,
  button_inputButton_inputReset_inputSubmit_style,
  button_input_style,
  button_select_style,
  fieldset_style,
  legend_style,
  progress_style,
  textarea_style,
  details_style,
  summary_style
} from './style';
/*








category: Sections
*/
export const Section = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="section"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Nav = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="nav"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Article = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="article"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Aside = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="aside"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const H1 = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h1_style
  };
  return (
    <Base elementType="h1" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H2 = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h2_style
  };
  return (
    <Base elementType="h2" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H3 = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h3_style
  };
  return (
    <Base elementType="h3" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H4 = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h4_style
  };
  return (
    <Base elementType="h4" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H5 = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h5_style
  };
  return (
    <Base elementType="h5" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H6 = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h6_style
  };
  return (
    <Base elementType="h6" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Header = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="header"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Footer = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="footer"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Address = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="address"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Grouping content
*/
export const P = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...p_style
  };
  return (
    <Base elementType="p" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Hr = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...hr_style
  };
  return (
    <Base elementType="hr" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Pre = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style,
    ...pre_style
  };
  return (
    <Base
      elementType="pre"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Blockquote = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="blockquote"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Ol = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...ul_ol_style
  };
  return (
    <Base elementType="ol" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Ul = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...ul_ol_style
  };
  return (
    <Base elementType="ul" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Li = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="li" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Dl = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dl" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Dt = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dt" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Dd = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dd" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Figure = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="figure"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Figcaption = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="figcaption"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Div = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="div"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Main = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...main_style
  };
  return (
    <Base
      elementType="main"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Text-level semantics
*/
export const A = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...a_style
  };
  return (
    <Base elementType="a" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Em = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="em" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Strong = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...b_strong_style
  };
  return (
    <Base
      elementType="strong"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Small = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...small_style
  };
  return (
    <Base
      elementType="small"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const S = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="s" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Cite = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="cite"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Q = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="q" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Dfn = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="dfn"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Abbr = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...abbr_style
  };
  return (
    <Base
      elementType="abbr"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Time = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="time"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Code = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style
  };
  return (
    <Base
      elementType="code"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Var = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="var"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Samp = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style
  };
  return (
    <Base
      elementType="samp"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Kbd = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style
  };
  return (
    <Base
      elementType="kbd"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Sub = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...sub_sup_style,
    ...sub_style
  };
  return (
    <Base
      elementType="sub"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Sup = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...sub_sup_style,
    ...sup_style
  };
  return (
    <Base
      elementType="sup"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const I = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="i" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const B = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...b_strong_style
  };
  return (
    <Base elementType="b" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Mark = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="mark"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Ruby = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="ruby"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Rt = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="rt" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Rp = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="rp" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Bdo = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="bdo"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Span = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="span"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Wbr = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="wbr"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Edits
*/
export const Ins = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="ins"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Del = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="del"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Embedded content
*/
export const Img = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...img_style
  };
  return (
    <Base
      elementType="img"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Iframe = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="iframe"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Embed = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="embed"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Object = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="object"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Param = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="param"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Video = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="video"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Audio = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="audio"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Source = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="source"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Canvas = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="canvas"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Map = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="map"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Area = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="area"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Tabular data
*/
export const Table = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="table"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Caption = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="caption"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Colgroup = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="colgroup"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Col = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="col"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Tbody = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="tbody"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Thead = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="thead"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Tfoot = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="tfoot"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Tr = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="tr" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Td = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="td" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const Th = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="th" style={{ ...solidStyle, ...style }} {...props} />
  );
};
/*








category: Forms
*/
export const Form = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="form"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Fieldset = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...fieldset_style
  };
  return (
    <Base
      elementType="fieldset"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Legend = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    legend_style
  };
  return (
    <Base
      elementType="legend"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Label = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="label"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Input = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...button_input_style
  };
  return (
    <Base
      elementType="input"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Button = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...button_input_style,
    ...button_select_style,
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <Base
      elementType="button"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Select = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...button_select_style
  };
  return (
    <Base
      elementType="select"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Datalist = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="datalist"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Optgroup = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style
  };
  return (
    <Base
      elementType="optgroup"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Option = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="option"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Textarea = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...textarea_style
  };
  return (
    <Base
      elementType="textarea"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Keygen = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="keygen"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Output = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="output"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Progress = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...progress_style
  };
  return (
    <Base
      elementType="progress"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Meter = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="meter"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Interactive elements
*/
export const Details = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...details_style
  };
  return (
    <Base
      elementType="details"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Summary = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...summary_style
  };
  return (
    <Base
      elementType="summary"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Command = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="command"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const Menu = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="menu"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};
