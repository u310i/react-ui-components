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
  const immutableStyle = {};
  return (
    <Input type="hidden" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputButton = ({ style, ...props }) => {
  const immutableStyle = {
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <Input type="button" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputSubmit = ({ style, ...props }) => {
  const immutableStyle = {
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <Input type="submit" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputReset = ({ style, ...props }) => {
  const immutableStyle = {
    ...button_inputButton_inputReset_inputSubmit_style
  };
  return (
    <Input type="reset" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputCheckbox = ({ style, ...props }) => {
  const immutableStyle = {
    inputCheckbox_inputRadio_style
  };
  return (
    <Input type="checkbox" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputRadio = ({ style, ...props }) => {
  const immutableStyle = {
    ...inputCheckbox_inputRadio_style
  };
  return (
    <Input type="radio" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputColor = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Input type="color" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputFile = ({ style, ...props }) => {
  const immutableStyle = {
    ...inputFile_style
  };
  return (
    <Input type="file" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputImage = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Input type="image" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputNumber = ({ style, ...props }) => {
  const immutableStyle = {
    ...inputNumber_style
  };
  return (
    <Input type="number" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputRange = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Input type="range" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputText = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Input type="text" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputEmail = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Input type="email" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputPassword = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Input type="password" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputTel = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Input type="tel" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputSearch = ({ style, ...props }) => {
  const immutableStyle = {
    ...inputSearch_style
  };
  return (
    <Input type="search" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputUrl = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Input type="url" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputTime = ({ style, ...props }) => {
  const immutableStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <Input type="time" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputDate = ({ style, ...props }) => {
  const immutableStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <Input type="date" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputDatetimeLocal = ({ style, ...props }) => {
  const immutableStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <Input
      type="datetime-local"
      style={{ ...immutableStyle, ...style }}
      {...props}
    />
  );
};

export const InputWeek = ({ style, ...props }) => {
  const immutableStyle = {};
  return (
    <Input type="week" style={{ ...immutableStyle, ...style }} {...props} />
  );
};

export const InputMonth = ({ style, ...props }) => {
  const immutableStyle = {
    ...inputTime_inputDate_inputDatetimeLocal_inputMonth
  };
  return (
    <Input type="month" style={{ ...immutableStyle, ...style }} {...props} />
  );
};
