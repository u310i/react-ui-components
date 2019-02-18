import React from 'react';
import { Input } from './Elements';
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

export const InputHidden = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="hidden" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputButton = ({ style, ...props }) => {
  const solidStyle = {
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <Input type="button" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputSubmit = ({ style, ...props }) => {
  const solidStyle = {
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <Input type="submit" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputReset = ({ style, ...props }) => {
  const solidStyle = {
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <Input type="reset" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputCheckbox = ({ style, ...props }) => {
  const solidStyle = {
    inputCheckbox_inputRadio_style
  };
  return (
    <Input type="checkbox" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputRadio = ({ style, ...props }) => {
  const solidStyle = {
    ...inputCheckbox_inputRadio_style
  };
  return (
    <Input type="radio" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputColor = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="color" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputFile = ({ style, ...props }) => {
  const solidStyle = {
    ...inputFile_style
  };
  return (
    <Input type="file" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputImage = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="image" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputNumber = ({ style, ...props }) => {
  const solidStyle = {
    ...inputNumber_style
  };
  return (
    <Input type="number" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputRange = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="range" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputText = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="text" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputEmail = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="email" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputPassword = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="password" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputTel = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="tel" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputSearch = ({ style, ...props }) => {
  const solidStyle = {
    ...inputSearch_style
  };
  return (
    <Input type="search" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputUrl = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="url" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputTime = ({ style, ...props }) => {
  const solidStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <Input type="time" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputDate = ({ style, ...props }) => {
  const solidStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <Input type="date" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputDatetimeLocal = ({ style, ...props }) => {
  const solidStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <Input
      type="datetime-local"
      style={{ ...solidStyle, ...style }}
      {...props}
    />
  );
};

export const InputWeek = ({ style, ...props }) => {
  const solidStyle = {};
  return (
    <Input type="week" style={{ ...solidStyle, ...style }} {...props} />
  );
};

export const InputMonth = ({ style, ...props }) => {
  const solidStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <Input type="month" style={{ ...solidStyle, ...style }} {...props} />
  );
};
