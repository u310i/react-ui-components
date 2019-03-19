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
export const SectionElement = ({ style, ...props }) => {
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

export const NavElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="nav" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const ArticleElement = ({ style, ...props }) => {
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

export const AsideElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="aside" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H1Element = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h1_style
  };
  return (
    <Base elementType="h1" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H2Element = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h2_style
  };
  return (
    <Base elementType="h2" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H3Element = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h3_style
  };
  return (
    <Base elementType="h3" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H4Element = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h4_style
  };
  return (
    <Base elementType="h4" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H5Element = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h5_style
  };
  return (
    <Base elementType="h5" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const H6Element = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...h1_h2_h3_h4_h5_h6_style,
    ...h6_style
  };
  return (
    <Base elementType="h6" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const HeaderElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="header" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const FooterElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="footer" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const AddressElement = ({ style, ...props }) => {
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
export const PElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...p_style
  };
  return (
    <Base elementType="p" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const HrElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...hr_style
  };
  return (
    <Base elementType="hr" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const PreElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style,
    ...pre_style
  };
  return (
    <Base elementType="pre" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const BlockquoteElement = ({ style, ...props }) => {
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

export const OlElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...ul_ol_style
  };
  return (
    <Base elementType="ol" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const UlElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...ul_ol_style
  };
  return (
    <Base elementType="ul" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const LiElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="li" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const DlElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dl" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const DtElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dt" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const DdElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dd" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const FigureElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="figure" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const FigcaptionElement = ({ style, ...props }) => {
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

export const DivElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="div" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const MainElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...main_style
  };
  return (
    <Base elementType="main" style={{ ...solidStyle, ...style }} {...props} />
  );
};
/*








category: Text-level semantics
*/
export const AElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...a_style
  };
  return (
    <Base elementType="a" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const EmElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="em" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const StrongElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...b_strong_style
  };
  return (
    <Base elementType="strong" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const SmallElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...small_style
  };
  return (
    <Base elementType="small" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const SElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="s" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const CiteElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="cite" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const QElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="q" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const DfnElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="dfn" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const AbbrElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...abbr_style
  };
  return (
    <Base elementType="abbr" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const TimeElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="time" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const CodeElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style
  };
  return (
    <Base elementType="code" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const VarElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="var" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const SampElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style
  };
  return (
    <Base elementType="samp" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const KbdElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...pre_code_kbd_samp_style
  };
  return (
    <Base elementType="kbd" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const SubElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...sub_sup_style,
    ...sub_style
  };
  return (
    <Base elementType="sub" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const SupElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...sub_sup_style,
    ...sup_style
  };
  return (
    <Base elementType="sup" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const IElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="i" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const BElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...b_strong_style
  };
  return (
    <Base elementType="b" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const MarkElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="mark" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const RubyElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="ruby" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const RtElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="rt" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const RpElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="rp" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const BdoElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="bdo" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const SpanElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="span" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const WbrElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="wbr" style={{ ...solidStyle, ...style }} {...props} />
  );
};
/*








category: Edits
*/
export const InsElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="ins" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const DelElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="del" style={{ ...solidStyle, ...style }} {...props} />
  );
};
/*








category: Embedded content
*/
export const ImgElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...img_style
  };
  return (
    <Base elementType="img" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const IframeElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="iframe" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const EmbedElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="embed" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const ObjectElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="object" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const ParamElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="param" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const VideoElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="video" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const AudioElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="audio" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const SourceElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="source" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const CanvasElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="canvas" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const MapElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="map" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const AreaElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="area" style={{ ...solidStyle, ...style }} {...props} />
  );
};
/*








category: Tabular data
*/
export const TableElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="table" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const CaptionElement = ({ style, ...props }) => {
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

export const ColgroupElement = ({ style, ...props }) => {
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

export const ColElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="col" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const TbodyElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="tbody" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const TheadElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="thead" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const TfootElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="tfoot" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const TrElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="tr" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const TdElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="td" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const ThElement = ({ style, ...props }) => {
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
export const FormElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="form" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const FieldsetElement = ({ style, ...props }) => {
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

export const LegendElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    legend_style
  };
  return (
    <Base elementType="legend" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const LabelElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="label" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...button_input_style
  };
  return (
    <Base elementType="input" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const ButtonElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...button_input_style,
    ...button_select_style,
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <Base elementType="button" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const SelectElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle,
    ...button_input_optgroup_select_textarea_style,
    ...button_select_style
  };
  return (
    <Base elementType="select" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const DatalistElement = ({ style, ...props }) => {
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

export const OptgroupElement = ({ style, ...props }) => {
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

export const OptionElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="option" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const TextareaElement = ({ style, ...props }) => {
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

export const KeygenElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="keygen" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const OutputElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="output" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const ProgressElement = ({ style, ...props }) => {
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

export const MeterElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="meter" style={{ ...solidStyle, ...style }} {...props} />
  );
};
/*








category: Interactive elements
*/
export const DetailsElement = ({ style, ...props }) => {
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

export const SummaryElement = ({ style, ...props }) => {
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

export const CommandElement = ({ style, ...props }) => {
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

export const MenuElement = ({ style, ...props }) => {
  const solidStyle = {
    ...allElementsCommonStyle
  };
  return (
    <Base elementType="menu" style={{ ...solidStyle, ...style }} {...props} />
  );
};
