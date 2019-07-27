import React from 'react';
import { InputElement } from './Elements';
import style from './style';

export const InputHiddenElement = ({ style, ...props }) => {
	return <InputElement type="hidden" style={style} {...props} />;
};

export const InputButtonElement = ({ style, ...props }) => {
	return <InputElement type="button" style={style} {...props} />;
};

export const InputSubmitElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.button_inputButton_inputReset_inputSubmit_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="submit" style={style} {...props} />;
};

export const InputResetElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.button_inputButton_inputReset_inputSubmit_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="reset" style={style} {...props} />;
};

export const InputCheckboxElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.inputCheckbox_inputRadio_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="checkbox" style={style} {...props} />;
};

export const InputRadioElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.inputCheckbox_inputRadio_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="radio" style={style} {...props} />;
};

export const InputColorElement = ({ style, ...props }) => {
	return <InputElement type="color" style={style} {...props} />;
};

export const InputFileElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.inputFile_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="file" style={style} {...props} />;
};

export const InputImageElement = ({ style, ...props }) => {
	return <InputElement type="image" style={style} {...props} />;
};

export const InputNumberElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.inputNumber_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="number" style={style} {...props} />;
};

export const InputRangeElement = ({ style, ...props }) => {
	return <InputElement type="range" style={style} {...props} />;
};

export const InputTextElement = ({ style, ...props }) => {
	return <InputElement type="text" style={style} {...props} />;
};

export const InputEmailElement = ({ style, ...props }) => {
	return <InputElement type="email" style={style} {...props} />;
};

export const InputPasswordElement = ({ style, ...props }) => {
	return <InputElement type="password" style={style} {...props} />;
};

export const InputTelElement = ({ style, ...props }) => {
	return <InputElement type="tel" style={style} {...props} />;
};

export const InputSearchElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.inputSearch_style, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="search" style={style} {...props} />;
};

export const InputUrlElement = ({ style, ...props }) => {
	return <InputElement type="url" style={style} {...props} />;
};

export const InputTimeElement = ({ style, ...props }) => {
	return <InputElement type="time" style={style} {...props} />;
};

export const InputDateElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.inputTime_inputDate_inputDatetimeLocal_inputMonth, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="date" style={style} {...props} />;
};

export const InputDatetimeLocalElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.inputTime_inputDate_inputDatetimeLocal_inputMonth, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="datetime-local" style={style} {...props} />;
};

export const InputWeekElement = ({ style, ...props }) => {
	return <InputElement type="week" style={style} {...props} />;
};

export const InputMonthElement = ({ style: propStyle, ...props }) => {
	const style = React.useMemo(
		() => {
			return { ...style.inputTime_inputDate_inputDatetimeLocal_inputMonth, ...propStyle };
		},
		[ propStyle ]
	);
	return <InputElement type="month" style={style} {...props} />;
};
