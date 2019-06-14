import React from 'react';
import { InputElement } from './Elements';
import style from './style';

export const InputHiddenElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="hidden" style={propStyle} {...props} />;
};

export const InputButtonElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="button" style={propStyle} {...props} />;
};

export const InputSubmitElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<InputElement
			type="submit"
			style={{ ...style.button_inputButton_inputReset_inputSubmit_style, ...propStyle }}
			{...props}
		/>
	);
};

export const InputResetElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<InputElement
			type="reset"
			style={{ ...style.button_inputButton_inputReset_inputSubmit_style, ...propStyle }}
			{...props}
		/>
	);
};

export const InputCheckboxElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<InputElement type="checkbox" style={{ ...style.inputCheckbox_inputRadio_style, ...propStyle }} {...props} />
	);
};

export const InputRadioElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="radio" style={{ ...style.inputCheckbox_inputRadio_style, ...propStyle }} {...props} />;
};

export const InputColorElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="color" style={propStyle} {...props} />;
};

export const InputFileElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="file" style={{ ...style.inputFile_style, ...propStyle }} {...props} />;
};

export const InputImageElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="image" style={propStyle} {...props} />;
};

export const InputNumberElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="number" style={{ ...style.inputNumber_style, ...propStyle }} {...props} />;
};

export const InputRangeElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="range" style={propStyle} {...props} />;
};

export const InputTextElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="text" style={propStyle} {...props} />;
};

export const InputEmailElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="email" style={propStyle} {...props} />;
};

export const InputPasswordElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="password" style={propStyle} {...props} />;
};

export const InputTelElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="tel" style={propStyle} {...props} />;
};

export const InputSearchElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="search" style={{ ...style.inputSearch_style, ...propStyle }} {...props} />;
};

export const InputUrlElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="url" style={propStyle} {...props} />;
};

export const InputTimeElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="time" style={propStyle} {...props} />;
};

export const InputDateElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<InputElement
			type="date"
			style={{ ...style.inputTime_inputDate_inputDatetimeLocal_inputMonth, ...propStyle }}
			{...props}
		/>
	);
};

export const InputDatetimeLocalElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<InputElement
			type="datetime-local"
			style={{ ...style.inputTime_inputDate_inputDatetimeLocal_inputMonth, ...propStyle }}
			{...props}
		/>
	);
};

export const InputWeekElement = ({ style: propStyle = {}, ...props }) => {
	return <InputElement type="week" style={propStyle} {...props} />;
};

export const InputMonthElement = ({ style: propStyle = {}, ...props }) => {
	return (
		<InputElement
			type="month"
			style={{ ...style.inputTime_inputDate_inputDatetimeLocal_inputMonth, ...propStyle }}
			{...props}
		/>
	);
};
