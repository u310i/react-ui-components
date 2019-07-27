import React from 'react';
import Base from './Base';
import style from './style';
/*


category: Sections
*/
export const SectionElement = ({ style, ...props }) => {
	return <Base elementType="section" style={style} {...props} />;
};

export const NavElement = ({ style, ...props }) => {
	return <Base elementType="nav" style={style} {...props} />;
};

export const ArticleElement = ({ style, ...props }) => {
	return <Base elementType="article" style={style} {...props} />;
};

export const AsideElement = ({ style, ...props }) => {
	return <Base elementType="aside" style={style} {...props} />;
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
	return <Base elementType="h1" style={style} {...props} />;
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
	return <Base elementType="h2" style={style} {...props} />;
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
	return <Base elementType="h3" style={style} {...props} />;
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
	return <Base elementType="h4" style={style} {...props} />;
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
	return <Base elementType="h5" style={style} {...props} />;
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
	return <Base elementType="h6" style={style} {...props} />;
};

export const HeaderElement = ({ style, ...props }) => {
	return <Base elementType="header" style={style} {...props} />;
};

export const FooterElement = ({ style, ...props }) => {
	return <Base elementType="footer" style={style} {...props} />;
};

export const AddressElement = ({ style, ...props }) => {
	return <Base elementType="address" style={style} {...props} />;
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
	return <Base elementType="p" style={style} {...props} />;
};

export const HrElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.hr_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="hr" style={style} {...props} />;
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
	return <Base elementType="pre" style={style} {...props} />;
};

export const BlockquoteElement = ({ style, ...props }) => {
	return <Base elementType="blockquote" style={style} {...props} />;
};

export const OlElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.ul_ol_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="ol" style={style} {...props} />;
};

export const UlElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.ul_ol_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="ul" style={style} {...props} />;
};

export const LiElement = ({ style, ...props }) => {
	return <Base elementType="li" style={style} {...props} />;
};

export const DlElement = ({ style, ...props }) => {
	return <Base elementType="dl" style={style} {...props} />;
};

export const DtElement = ({ style, ...props }) => {
	return <Base elementType="dt" style={style} {...props} />;
};

export const DdElement = ({ style, ...props }) => {
	return <Base elementType="dd" style={style} {...props} />;
};

export const FigureElement = ({ style, ...props }) => {
	return <Base elementType="figure" style={style} {...props} />;
};

export const FigcaptionElement = ({ style, ...props }) => {
	return <Base elementType="figcaption" style={style} {...props} />;
};

export const DivElement = ({ style, ...props }) => {
	return <Base elementType="div" style={style} {...props} />;
};

export const MainElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.main_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="main" style={style} {...props} />;
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
	return <Base elementType="a" style={style} {...props} />;
};

export const EmElement = ({ style, ...props }) => {
	return <Base elementType="em" style={style} {...props} />;
};

export const StrongElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.b_strong_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="strong" style={style} {...props} />;
};

export const SmallElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.small_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="small" style={style} {...props} />;
};

export const SElement = ({ style, ...props }) => {
	return <Base elementType="s" style={style} {...props} />;
};

export const CiteElement = ({ style, ...props }) => {
	return <Base elementType="cite" style={style} {...props} />;
};

export const QElement = ({ style, ...props }) => {
	return <Base elementType="q" style={style} {...props} />;
};

export const DfnElement = ({ style, ...props }) => {
	return <Base elementType="dfn" style={style} {...props} />;
};

export const AbbrElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.abbr_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="abbr" style={style} {...props} />;
};

export const TimeElement = ({ style, ...props }) => {
	return <Base elementType="time" style={style} {...props} />;
};

export const CodeElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.pre_code_kbd_samp_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="code" style={style} {...props} />;
};

export const VarElement = ({ style, ...props }) => {
	return <Base elementType="var" style={style} {...props} />;
};

export const SampElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.pre_code_kbd_samp_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="samp" style={style} {...props} />;
};

export const KbdElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.pre_code_kbd_samp_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="kbd" style={style} {...props} />;
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
	return <Base elementType="sub" style={style} {...props} />;
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
	return <Base elementType="sup" style={style} {...props} />;
};

export const IElement = ({ style, ...props }) => {
	return <Base elementType="i" style={style} {...props} />;
};

export const BElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.b_strong_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="b" style={style} {...props} />;
};

export const MarkElement = ({ style, ...props }) => {
	return <Base elementType="mark" style={style} {...props} />;
};

export const RubyElement = ({ style, ...props }) => {
	return <Base elementType="ruby" style={style} {...props} />;
};

export const RtElement = ({ style, ...props }) => {
	return <Base elementType="rt" style={style} {...props} />;
};

export const RpElement = ({ style, ...props }) => {
	return <Base elementType="rp" style={style} {...props} />;
};

export const BdoElement = ({ style, ...props }) => {
	return <Base elementType="bdo" style={style} {...props} />;
};

export const SpanElement = ({ style, ...props }) => {
	return <Base elementType="span" style={style} {...props} />;
};

export const WbrElement = ({ style, ...props }) => {
	return <Base elementType="wbr" style={style} {...props} />;
};
/*


category: Edits
*/
export const InsElement = ({ style, ...props }) => {
	return <Base elementType="ins" style={style} {...props} />;
};

export const DelElement = ({ style, ...props }) => {
	return <Base elementType="del" style={style} {...props} />;
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
	return <Base elementType="img" style={style} {...props} />;
};

export const IframeElement = ({ style, ...props }) => {
	return <Base elementType="iframe" style={style} {...props} />;
};

export const EmbedElement = ({ style, ...props }) => {
	return <Base elementType="embed" style={style} {...props} />;
};

export const ObjectElement = ({ style, ...props }) => {
	return <Base elementType="object" style={style} {...props} />;
};

export const ParamElement = ({ style, ...props }) => {
	return <Base elementType="param" style={style} {...props} />;
};

export const VideoElement = ({ style, ...props }) => {
	return <Base elementType="video" style={style} {...props} />;
};

export const AudioElement = ({ style, ...props }) => {
	return <Base elementType="audio" style={style} {...props} />;
};

export const SourceElement = ({ style, ...props }) => {
	return <Base elementType="source" style={style} {...props} />;
};

export const CanvasElement = ({ style, ...props }) => {
	return <Base elementType="canvas" style={style} {...props} />;
};

export const MapElement = ({ style, ...props }) => {
	return <Base elementType="map" style={style} {...props} />;
};

export const AreaElement = ({ style, ...props }) => {
	return <Base elementType="area" style={style} {...props} />;
};
/*


category: Tabular data
*/
export const TableElement = ({ style, ...props }) => {
	return <Base elementType="table" style={style} {...props} />;
};

export const CaptionElement = ({ style, ...props }) => {
	return <Base elementType="caption" style={style} {...props} />;
};

export const ColgroupElement = ({ style, ...props }) => {
	return <Base elementType="colgroup" style={style} {...props} />;
};

export const ColElement = ({ style, ...props }) => {
	return <Base elementType="col" style={style} {...props} />;
};

export const TbodyElement = ({ style, ...props }) => {
	return <Base elementType="tbody" style={style} {...props} />;
};

export const TheadElement = ({ style, ...props }) => {
	return <Base elementType="thead" style={style} {...props} />;
};

export const TfootElement = ({ style, ...props }) => {
	return <Base elementType="tfoot" style={style} {...props} />;
};

export const TrElement = ({ style, ...props }) => {
	return <Base elementType="tr" style={style} {...props} />;
};

export const TdElement = ({ style, ...props }) => {
	return <Base elementType="td" style={style} {...props} />;
};

export const ThElement = ({ style, ...props }) => {
	return <Base elementType="th" style={style} {...props} />;
};
/*


category: Forms
*/
export const FormElement = ({ style, ...props }) => {
	return <Base elementType="form" style={style} {...props} />;
};

export const FieldsetElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.fieldset_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="fieldset" style={style} {...props} />;
};

export const LegendElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...legend_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="legend" style={style} {...props} />;
};

export const LabelElement = ({ style, ...props }) => {
	return <Base elementType="label" style={style} {...props} />;
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
	return <Base elementType="input" style={style} {...props} />;
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
	return <Base elementType="button" style={style} {...props} />;
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
	return <Base elementType="select" style={style} {...props} />;
};

export const DatalistElement = ({ style, ...props }) => {
	return <Base elementType="datalist" style={style} {...props} />;
};

export const OptgroupElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.button_input_optgroup_select_textarea_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="optgroup" style={style} {...props} />;
};

export const OptionElement = ({ style, ...props }) => {
	return <Base elementType="option" style={style} {...props} />;
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
	return <Base elementType="textarea" style={style} {...props} />;
};

export const KeygenElement = ({ style, ...props }) => {
	return <Base elementType="keygen" style={style} {...props} />;
};

export const OutputElement = ({ style, ...props }) => {
	return <Base elementType="output" style={style} {...props} />;
};

export const ProgressElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.progress_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="progress" style={style} {...props} />;
};

export const MeterElement = ({ style, ...props }) => {
	return <Base elementType="meter" style={style} {...props} />;
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
	return <Base elementType="details" style={style} {...props} />;
};

export const SummaryElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.summary_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <Base elementType="summary" style={style} {...props} />;
};

export const CommandElement = ({ style, ...props }) => {
	return <Base elementType="command" style={style} {...props} />;
};

export const MenuElement = ({ style, ...props }) => {
	return <Base elementType="menu" style={style} {...props} />;
};
