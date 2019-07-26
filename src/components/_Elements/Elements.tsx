import React from 'react';
import Base from './Base';
import style from './style';
/*


category: Sections
*/
export const SectionElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="section" style={propStyle} {...props} />;
};

export const NavElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="nav" style={propStyle} {...props} />;
};

export const ArticleElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="article" style={propStyle} {...props} />;
};

export const AsideElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="aside" style={propStyle} {...props} />;
};

export const H1Element = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="h1"
			style={{
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h1_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const H2Element = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="h2"
			style={{
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h2_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const H3Element = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="h3"
			style={{
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h3_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const H4Element = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="h4"
			style={{
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h4_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const H5Element = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="h5"
			style={{
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h5_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const H6Element = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="h6"
			style={{
				...style.h1_h2_h3_h4_h5_h6_style,
				...style.h6_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const HeaderElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="header" style={propStyle} {...props} />;
};

export const FooterElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="footer" style={propStyle} {...props} />;
};

export const AddressElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="address" style={propStyle} {...props} />;
};
/*


category: Grouping content
*/
export const PElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="p" style={{ ...style.p_style, ...propStyle }} {...props} />;
};

export const HrElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="hr" style={{ ...style.hr_style, ...propStyle }} {...props} />;
};

export const PreElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="pre"
			style={{
				...style.pre_code_kbd_samp_style,
				...style.pre_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const BlockquoteElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="blockquote" style={propStyle} {...props} />;
};

export const OlElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="ol" style={{ ...style.ul_ol_style, ...propStyle }} {...props} />;
};

export const UlElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="ul" style={{ ...style.ul_ol_style, ...propStyle }} {...props} />;
};

export const LiElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="li" style={propStyle} {...props} />;
};

export const DlElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="dl" style={propStyle} {...props} />;
};

export const DtElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="dt" style={propStyle} {...props} />;
};

export const DdElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="dd" style={propStyle} {...props} />;
};

export const FigureElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="figure" style={propStyle} {...props} />;
};

export const FigcaptionElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="figcaption" style={propStyle} {...props} />;
};

export const DivElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="div" style={propStyle} {...props} />;
};

export const MainElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="main" style={{ ...style.main_style, ...propStyle }} {...props} />;
};
/*


category: Text-level semantics
*/
export const AElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="a" style={{ ...style.a_style, ...propStyle }} {...props} />;
};

export const EmElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="em" style={propStyle} {...props} />;
};

export const StrongElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="strong" style={{ ...style.b_strong_style, ...propStyle }} {...props} />;
};

export const SmallElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="small" style={{ ...style.small_style, ...propStyle }} {...props} />;
};

export const SElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="s" style={propStyle} {...props} />;
};

export const CiteElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="cite" style={propStyle} {...props} />;
};

export const QElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="q" style={propStyle} {...props} />;
};

export const DfnElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="dfn" style={propStyle} {...props} />;
};

export const AbbrElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="abbr" style={{ ...style.abbr_style, ...propStyle }} {...props} />;
};

export const TimeElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="time" style={propStyle} {...props} />;
};

export const CodeElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="code" style={{ ...style.pre_code_kbd_samp_style, ...propStyle }} {...props} />;
};

export const VarElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="var" style={propStyle} {...props} />;
};

export const SampElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="samp" style={{ ...style.pre_code_kbd_samp_style, ...propStyle }} {...props} />;
};

export const KbdElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="kbd" style={{ ...style.pre_code_kbd_samp_style, ...propStyle }} {...props} />;
};

export const SubElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="sub"
			style={{
				...style.sub_sup_style,
				...style.sub_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const SupElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="sup"
			style={{
				...style.sub_sup_style,
				...style.sup_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const IElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="i" style={propStyle} {...props} />;
};

export const BElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="b" style={{ ...style.b_strong_style, ...propStyle }} {...props} />;
};

export const MarkElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="mark" style={propStyle} {...props} />;
};

export const RubyElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="ruby" style={propStyle} {...props} />;
};

export const RtElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="rt" style={propStyle} {...props} />;
};

export const RpElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="rp" style={propStyle} {...props} />;
};

export const BdoElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="bdo" style={propStyle} {...props} />;
};

export const SpanElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="span" style={propStyle} {...props} />;
};

export const WbrElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="wbr" style={propStyle} {...props} />;
};
/*


category: Edits
*/
export const InsElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="ins" style={propStyle} {...props} />;
};

export const DelElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="del" style={propStyle} {...props} />;
};
/*


category: Embedded content
*/
export const ImgElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="img" style={{ ...style.img_style, ...propStyle }} {...props} />;
};

export const IframeElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="iframe" style={propStyle} {...props} />;
};

export const EmbedElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="embed" style={propStyle} {...props} />;
};

export const ObjectElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="object" style={propStyle} {...props} />;
};

export const ParamElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="param" style={propStyle} {...props} />;
};

export const VideoElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="video" style={propStyle} {...props} />;
};

export const AudioElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="audio" style={propStyle} {...props} />;
};

export const SourceElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="source" style={propStyle} {...props} />;
};

export const CanvasElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="canvas" style={propStyle} {...props} />;
};

export const MapElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="map" style={propStyle} {...props} />;
};

export const AreaElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="area" style={propStyle} {...props} />;
};
/*


category: Tabular data
*/
export const TableElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="table" style={propStyle} {...props} />;
};

export const CaptionElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="caption" style={propStyle} {...props} />;
};

export const ColgroupElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="colgroup" style={propStyle} {...props} />;
};

export const ColElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="col" style={propStyle} {...props} />;
};

export const TbodyElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="tbody" style={propStyle} {...props} />;
};

export const TheadElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="thead" style={propStyle} {...props} />;
};

export const TfootElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="tfoot" style={propStyle} {...props} />;
};

export const TrElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="tr" style={propStyle} {...props} />;
};

export const TdElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="td" style={propStyle} {...props} />;
};

export const ThElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="th" style={propStyle} {...props} />;
};
/*


category: Forms
*/
export const FormElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="form" style={propStyle} {...props} />;
};

export const FieldsetElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="fieldset" style={{ ...style.fieldset_style, ...propStyle }} {...props} />;
};

export const LegendElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="legend" style={{ ...legend_style, ...propStyle }} {...props} />;
};

export const LabelElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="label" style={propStyle} {...props} />;
};

export const InputElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="input"
			style={{
				...style.button_input_optgroup_select_textarea_style,
				...style.button_input_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const ButtonElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="button"
			style={{
				...style.button_input_optgroup_select_textarea_style,
				...style.button_input_style,
				...style.button_select_style,
				...style.button_inputButton_inputReset_inputSubmit_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const SelectElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="select"
			style={{
				...style.button_input_optgroup_select_textarea_style,
				...style.button_select_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const DatalistElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="datalist" style={propStyle} {...props} />;
};

export const OptgroupElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="optgroup"
			style={{ ...style.button_input_optgroup_select_textarea_style, ...propStyle }}
			{...props}
		/>
	);
};

export const OptionElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="option" style={propStyle} {...props} />;
};

export const TextareaElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<Base
			elementType="textarea"
			style={{
				...style.button_input_optgroup_select_textarea_style,
				...style.textarea_style,
				...propStyle
			}}
			{...props}
		/>
	);
};

export const KeygenElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="keygen" style={propStyle} {...props} />;
};

export const OutputElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="output" style={propStyle} {...props} />;
};

export const ProgressElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="progress" style={{ ...style.progress_style, ...propStyle }} {...props} />;
};

export const MeterElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="meter" style={propStyle} {...props} />;
};
/*


category: Interactive elements
*/
export const DetailsElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="details" style={{ ...style.details_style, ...propStyle }} {...props} />;
};

export const SummaryElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="summary" style={{ ...style.summary_style, ...propStyle }} {...props} />;
};

export const CommandElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="command" style={propStyle} {...props} />;
};

export const MenuElement = ({ style: propStyle = {}, ...props }) => {
	return <Base elementType="menu" style={propStyle} {...props} />;
};
