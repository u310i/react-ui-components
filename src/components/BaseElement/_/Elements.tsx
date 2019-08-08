import * as React from 'react';
import Base from './Base';
import style from './style';
/*


category: Sections
*/
export const SectionElement = ({ style, ...props }) => {
	return <Base elementName="section" style={style} {...props} />;
};

export const NavElement = ({ style, ...props }) => {
	return <Base elementName="nav" style={style} {...props} />;
};

export const ArticleElement = ({ style, ...props }) => {
	return <Base elementName="article" style={style} {...props} />;
};

export const AsideElement = ({ style, ...props }) => {
	return <Base elementName="aside" style={style} {...props} />;
};

export const H1Element = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h1_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="h1" style={style} {...props} />;
};

export const H2Element = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h2_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="h2" style={style} {...props} />;
};

export const H3Element = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h3_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="h3" style={style} {...props} />;
};

export const H4Element = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h4_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="h4" style={style} {...props} />;
};

export const H5Element = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h5_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="h5" style={style} {...props} />;
};

export const H6Element = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h6_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="h6" style={style} {...props} />;
};

export const HeaderElement = ({ style, ...props }) => {
	return <Base elementName="header" style={style} {...props} />;
};

export const FooterElement = ({ style, ...props }) => {
	return <Base elementName="footer" style={style} {...props} />;
};

export const AddressElement = ({ style, ...props }) => {
	return <Base elementName="address" style={style} {...props} />;
};
/*


category: Grouping content
*/
export const PElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.p_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="p" style={style} {...props} />;
};

export const HrElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.hr_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="hr" style={style} {...props} />;
};

export const PreElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.pre_code_kbd_samp_style,
				...style.pre_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="pre" style={style} {...props} />;
};

export const BlockquoteElement = ({ style, ...props }) => {
	return <Base elementName="blockquote" style={style} {...props} />;
};

export const OlElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.ul_ol_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="ol" style={style} {...props} />;
};

export const UlElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.ul_ol_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="ul" style={style} {...props} />;
};

export const LiElement = ({ style, ...props }) => {
	return <Base elementName="li" style={style} {...props} />;
};

export const DlElement = ({ style, ...props }) => {
	return <Base elementName="dl" style={style} {...props} />;
};

export const DtElement = ({ style, ...props }) => {
	return <Base elementName="dt" style={style} {...props} />;
};

export const DdElement = ({ style, ...props }) => {
	return <Base elementName="dd" style={style} {...props} />;
};

export const FigureElement = ({ style, ...props }) => {
	return <Base elementName="figure" style={style} {...props} />;
};

export const FigcaptionElement = ({ style, ...props }) => {
	return <Base elementName="figcaption" style={style} {...props} />;
};

export const DivElement = ({ style, ...props }) => {
	return <Base elementName="div" style={style} {...props} />;
};

export const MainElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.main_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="main" style={style} {...props} />;
};
/*


category: Text-level semantics
*/
export const AElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.a_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="a" style={style} {...props} />;
};

export const EmElement = ({ style, ...props }) => {
	return <Base elementName="em" style={style} {...props} />;
};

export const StrongElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.strong_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="strong" style={style} {...props} />;
};

export const SmallElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.small_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="small" style={style} {...props} />;
};

export const SElement = ({ style, ...props }) => {
	return <Base elementName="s" style={style} {...props} />;
};

export const CiteElement = ({ style, ...props }) => {
	return <Base elementName="cite" style={style} {...props} />;
};

export const QElement = ({ style, ...props }) => {
	return <Base elementName="q" style={style} {...props} />;
};

export const DfnElement = ({ style, ...props }) => {
	return <Base elementName="dfn" style={style} {...props} />;
};

export const AbbrElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.abbr_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="abbr" style={style} {...props} />;
};

export const TimeElement = ({ style, ...props }) => {
	return <Base elementName="time" style={style} {...props} />;
};

export const CodeElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.pre_code_kbd_samp_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="code" style={style} {...props} />;
};

export const VarElement = ({ style, ...props }) => {
	return <Base elementName="var" style={style} {...props} />;
};

export const SampElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.pre_code_kbd_samp_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="samp" style={style} {...props} />;
};

export const KbdElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.pre_code_kbd_samp_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="kbd" style={style} {...props} />;
};

export const SubElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.sub_sup_style,
				...style.sub_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="sub" style={style} {...props} />;
};

export const SupElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.sub_sup_style,
				...style.sup_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="sup" style={style} {...props} />;
};

export const IElement = ({ style, ...props }) => {
	return <Base elementName="i" style={style} {...props} />;
};

export const BElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.b_strong_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="b" style={style} {...props} />;
};

export const MarkElement = ({ style, ...props }) => {
	return <Base elementName="mark" style={style} {...props} />;
};

export const RubyElement = ({ style, ...props }) => {
	return <Base elementName="ruby" style={style} {...props} />;
};

export const RtElement = ({ style, ...props }) => {
	return <Base elementName="rt" style={style} {...props} />;
};

export const RpElement = ({ style, ...props }) => {
	return <Base elementName="rp" style={style} {...props} />;
};

export const BdoElement = ({ style, ...props }) => {
	return <Base elementName="bdo" style={style} {...props} />;
};

export const SpanElement = ({ style, ...props }) => {
	return <Base elementName="span" style={style} {...props} />;
};

export const WbrElement = ({ style, ...props }) => {
	return <Base elementName="wbr" style={style} {...props} />;
};
/*


category: Edits
*/
export const InsElement = ({ style, ...props }) => {
	return <Base elementName="ins" style={style} {...props} />;
};

export const DelElement = ({ style, ...props }) => {
	return <Base elementName="del" style={style} {...props} />;
};
/*


category: Embedded content
*/
export const ImgElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.img_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="img" style={style} {...props} />;
};

export const IframeElement = ({ style, ...props }) => {
	return <Base elementName="iframe" style={style} {...props} />;
};

export const EmbedElement = ({ style, ...props }) => {
	return <Base elementName="embed" style={style} {...props} />;
};

export const ObjectElement = ({ style, ...props }) => {
	return <Base elementName="object" style={style} {...props} />;
};

export const ParamElement = ({ style, ...props }) => {
	return <Base elementName="param" style={style} {...props} />;
};

export const VideoElement = ({ style, ...props }) => {
	return <Base elementName="video" style={style} {...props} />;
};

export const AudioElement = ({ style, ...props }) => {
	return <Base elementName="audio" style={style} {...props} />;
};

export const SourceElement = ({ style, ...props }) => {
	return <Base elementName="source" style={style} {...props} />;
};

export const CanvasElement = ({ style, ...props }) => {
	return <Base elementName="canvas" style={style} {...props} />;
};

export const MapElement = ({ style, ...props }) => {
	return <Base elementName="map" style={style} {...props} />;
};

export const AreaElement = ({ style, ...props }) => {
	return <Base elementName="area" style={style} {...props} />;
};
/*


category: Tabular data
*/
export const TableElement = ({ style, ...props }) => {
	return <Base elementName="table" style={style} {...props} />;
};

export const CaptionElement = ({ style, ...props }) => {
	return <Base elementName="caption" style={style} {...props} />;
};

export const ColgroupElement = ({ style, ...props }) => {
	return <Base elementName="colgroup" style={style} {...props} />;
};

export const ColElement = ({ style, ...props }) => {
	return <Base elementName="col" style={style} {...props} />;
};

export const TbodyElement = ({ style, ...props }) => {
	return <Base elementName="tbody" style={style} {...props} />;
};

export const TheadElement = ({ style, ...props }) => {
	return <Base elementName="thead" style={style} {...props} />;
};

export const TfootElement = ({ style, ...props }) => {
	return <Base elementName="tfoot" style={style} {...props} />;
};

export const TrElement = ({ style, ...props }) => {
	return <Base elementName="tr" style={style} {...props} />;
};

export const TdElement = ({ style, ...props }) => {
	return <Base elementName="td" style={style} {...props} />;
};

export const ThElement = ({ style, ...props }) => {
	return <Base elementName="th" style={style} {...props} />;
};
/*


category: Forms
*/
export const FormElement = ({ style, ...props }) => {
	return <Base elementName="form" style={style} {...props} />;
};

export const FieldsetElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.fieldset_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="fieldset" style={style} {...props} />;
};

export const LegendElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...legend_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="legend" style={style} {...props} />;
};

export const LabelElement = ({ style, ...props }) => {
	return <Base elementName="label" style={style} {...props} />;
};

export const InputElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.button_input_optgroup_select_textarea_style,
				...style.button_input_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="input" style={style} {...props} />;
};

export const ButtonElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.button_input_optgroup_select_textarea_style,
				...style.button_input_style,
				...style.button_select_style,
				...style.button_inputButton_inputReset_inputSubmit_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="button" style={style} {...props} />;
};

export const SelectElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.button_input_optgroup_select_textarea_style,
				...style.button_select_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="select" style={style} {...props} />;
};

export const DatalistElement = ({ style, ...props }) => {
	return <Base elementName="datalist" style={style} {...props} />;
};

export const OptgroupElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.button_input_optgroup_select_textarea_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="optgroup" style={style} {...props} />;
};

export const OptionElement = ({ style, ...props }) => {
	return <Base elementName="option" style={style} {...props} />;
};

export const TextareaElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return {
				...style.button_input_optgroup_select_textarea_style,
				...style.textarea_style,
				...propStyle
			};
		},
		[ propStyle ]
	);
	return <Base elementName="textarea" style={style} {...props} />;
};

export const KeygenElement = ({ style, ...props }) => {
	return <Base elementName="keygen" style={style} {...props} />;
};

export const OutputElement = ({ style, ...props }) => {
	return <Base elementName="output" style={style} {...props} />;
};

export const ProgressElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.progress_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="progress" style={style} {...props} />;
};

export const MeterElement = ({ style, ...props }) => {
	return <Base elementName="meter" style={style} {...props} />;
};
/*


category: Interactive elements
*/
export const DetailsElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.details_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="details" style={style} {...props} />;
};

export const SummaryElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.summary_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementName="summary" style={style} {...props} />;
};

export const CommandElement = ({ style, ...props }) => {
	return <Base elementName="command" style={style} {...props} />;
};

export const MenuElement = ({ style, ...props }) => {
	return <Base elementName="menu" style={style} {...props} />;
};
