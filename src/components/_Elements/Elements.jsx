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
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="section"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Nav = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="nav"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Article = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="article"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Aside = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="aside"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const H1 = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h1_style
  };
  return (
    <Base elementType="h1" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const H2 = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h2_style
  };
  return (
    <Base elementType="h2" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const H3 = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h3_style
  };
  return (
    <Base elementType="h3" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const H4 = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h4_style
  };
  return (
    <Base elementType="h4" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const H5 = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h5_style
  };
  return (
    <Base elementType="h5" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const H6 = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h6_style
  };
  return (
    <Base elementType="h6" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Header = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="header"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Footer = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="footer"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Address = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="address"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Grouping content
*/
export const P = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...p_style
  };
  return (
    <Base elementType="p" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Hr = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...hr_style
  };
  return (
    <Base elementType="hr" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Pre = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style,
    ...pre_style
  };
  return (
    <Base
      elementType="pre"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Blockquote = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="blockquote"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Ol = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...ul_ol_style
  };
  return (
    <Base elementType="ol" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Ul = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...ul_ol_style
  };
  return (
    <Base elementType="ul" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Li = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="li" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Dl = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dl" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Dt = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dt" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Dd = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dd" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Figure = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="figure"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Figcaption = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="figcaption"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Div = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="div"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Main = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...main_style
  };
  return (
    <Base
      elementType="main"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Text-level semantics
*/
export const A = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...a_style
  };
  return (
    <Base elementType="a" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Em = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="em" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Strong = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...b_strong_style
  };
  return (
    <Base
      elementType="strong"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Small = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...small_style
  };
  return (
    <Base
      elementType="small"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const S = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="s" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Cite = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="cite"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Q = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="q" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Dfn = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="dfn"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Abbr = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...abbr_style
  };
  return (
    <Base
      elementType="abbr"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Time = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="time"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Code = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style
  };
  return (
    <Base
      elementType="code"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Var = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="var"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Samp = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style
  };
  return (
    <Base
      elementType="samp"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Kbd = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style
  };
  return (
    <Base
      elementType="kbd"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Sub = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...sub_sup_style,
    ...sub_style
  };
  return (
    <Base
      elementType="sub"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Sup = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...sub_sup_style,
    ...sup_style
  };
  return (
    <Base
      elementType="sup"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const I = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="i" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const B = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...b_strong_style
  };
  return (
    <Base elementType="b" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Mark = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="mark"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Ruby = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="ruby"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Rt = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="rt" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Rp = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="rp" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Bdo = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="bdo"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Span = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="span"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Wbr = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="wbr"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Edits
*/
export const Ins = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="ins"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Del = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="del"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Embedded content
*/
export const Img = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...img_style
  };
  return (
    <Base
      elementType="img"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Iframe = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="iframe"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Embed = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="embed"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Object = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="object"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Param = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="param"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Video = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="video"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Audio = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="audio"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Source = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="source"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Canvas = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="canvas"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Map = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="map"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Area = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="area"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Tabular data
*/
export const Table = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="table"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Caption = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="caption"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Colgroup = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="colgroup"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Col = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="col"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Tbody = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="tbody"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Thead = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="thead"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Tfoot = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="tfoot"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Tr = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="tr" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Td = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="td" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const Th = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="th" style={{ ...immutableStyle, ...style }} {...props} />
  );
};
/*








category: Forms
*/
export const Form = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="form"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Fieldset = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...fieldset_style
  };
  return (
    <Base
      elementType="fieldset"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Legend = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    legend_style
  };
  return (
    <Base
      elementType="legend"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Label = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="label"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Input = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...button_input_style
  };
  return (
    <Base
      elementType="input"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Button = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...button_input_style,
    ...button_select_style,
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <Base
      elementType="button"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Select = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...button_select_style
  };
  return (
    <Base
      elementType="select"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Datalist = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="datalist"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Optgroup = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style
  };
  return (
    <Base
      elementType="optgroup"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Option = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="option"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Textarea = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...textarea_style
  };
  return (
    <Base
      elementType="textarea"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Keygen = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="keygen"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Output = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="output"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Progress = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...progress_style
  };
  return (
    <Base
      elementType="progress"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Meter = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="meter"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};
/*








category: Interactive elements
*/
export const Details = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...details_style
  };
  return (
    <Base
      elementType="details"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Summary = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle,
    ...summary_style
  };
  return (
    <Base
      elementType="summary"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Command = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="command"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const Menu = ({ style, ...props }) => {
  const immutableStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base
      elementType="menu"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};
