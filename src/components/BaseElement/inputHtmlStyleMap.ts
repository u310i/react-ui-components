import style from './style';
import * as CSS from 'csstype';

export default {
  hidden: null,
  button: style.button_inputButton_inputReset_inputSubmit,
  submit: null,
  reset: style.button_inputButton_inputReset_inputSubmit,
  checkbox: style.inputCheckbox_inputRadio,
  radio: style.inputCheckbox_inputRadio,
  color: null,
  file: style.inputFile,
  image: null,
  number: style.inputNumber,
  range: null,
  text: null,
  email: null,
  password: null,
  tel: null,
  search: style.inputSearch,
  url: null,
  time: null,
  date: style.inputTime_inputDate_inputDatetimeLocal_inputMonth,
  'datetime-local': style.inputTime_inputDate_inputDatetimeLocal_inputMonth,
  week: null,
  month: style.inputTime_inputDate_inputDatetimeLocal_inputMonth,
} as const;