import React from 'react';
import { InputElement } from './Elements';
import { button_inputButton_inputReset_inputSubmit_style } from './style';

const inputTime_inputDate_inputDatetimeLocal_inputMonth = {
  '-webkit-appearance': 'listbox'
};

const inputCheckbox_inputRadio_style = {
  padding: '0'
};

const inputNumber_style = {
  '&::-webkit-inner-spin-button': {
    height: 'auto'
  },
  '&::-webkit-outer-spin-button': {
    height: 'auto'
  }
};

const inputSearch_style = {
  '-webkit-appearance': 'textfield',
  outlineOffset: '-2px',
  '&::-webkit-search-decoration': {
    '-webkit-appearance': 'none'
  }
};

const inputFile_style = {
  '&::-webkit-file-upload-button': {
    '-webkit-appearance': 'button',
    font: 'inherit'
  }
};

export const InputHiddenElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement
      type="hidden"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const InputButtonElement = ({ style, ...props }) => {
  const solidStyle = {
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <InputElement
      type="button"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const InputSubmitElement = ({ style, ...props }) => {
  const solidStyle = {
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <InputElement
      type="submit"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const InputResetElement = ({ style, ...props }) => {
  const solidStyle = {
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <InputElement type="reset" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputCheckboxElement = ({ style, ...props }) => {
  const solidStyle = {
    inputCheckbox_inputRadio_style
  };
  return (
    <InputElement
      type="checkbox"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const InputRadioElement = ({ style, ...props }) => {
  const solidStyle = {
    ...inputCheckbox_inputRadio_style
  };
  return (
    <InputElement type="radio" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputColorElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement type="color" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputFileElement = ({ style, ...props }) => {
  const solidStyle = {
    ...inputFile_style
  };
  return (
    <InputElement type="file" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputImageElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement type="image" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputNumberElement = ({ style, ...props }) => {
  const solidStyle = {
    ...inputNumber_style
  };
  return (
    <InputElement
      type="number"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const InputRangeElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement type="range" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputTextElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement type="text" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputEmailElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement type="email" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputPasswordElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement
      type="password"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const InputTelElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement type="tel" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputSearchElement = ({ style, ...props }) => {
  const solidStyle = {
    ...inputSearch_style
  };
  return (
    <InputElement
      type="search"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const InputUrlElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement type="url" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputTimeElement = ({ style, ...props }) => {
  const solidStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <InputElement type="time" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputDateElement = ({ style, ...props }) => {
  const solidStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <InputElement type="date" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputDatetimeLocalElement = ({ style, ...props }) => {
  const solidStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <InputElement
      type="datetime-local"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const InputWeekElement = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <InputElement type="week" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputMonthElement = ({ style, ...props }) => {
  const solidStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <InputElement type="month" style={{ ...solidStyle, ...style }} {...props} />
  );
};
