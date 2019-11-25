export const section = [
  "property",
  "propType",
  "required",
  "default",
  "description"
];

type Collections = { [key: string]: Array<Array<string | undefined>> };
export const collections: Collections = {
  Button: [
    ["disabled", "boolean", , "false"],
    ["ariaDisabled", "boolean", ,],
    ["disabledStyle", "React.CSSProperties", , ,],
    ["ariaDisabledStyle", "React.CSSProperties", , ,],
    ["...other", "BaseElementProps", , ,]
  ],
  Button2: [
    ["open", "boolean", , "true"],
    ["disablePointerEvents", "boolean", , "false"],
    [
      "duration",
      "{ enter: number; exit?: number; appear?: number; } | number",
      ,
      "{ enter: 300, exit: 300, apper: 300 }"
    ],
    ["TransitionComponent", "Transition Component", , "Fade Component"],
    ["innerProps", "BaseElement Props", , ,],
    ["...other", "Transition Props", , ,]
  ],
  Backdrop: [
    ["open", "boolean", , "true"],
    ["disablePointerEvents", "boolean", , "false"],
    [
      "duration",
      "{ enter: number; exit?: number; appear?: number; } | number",
      ,
      "{ enter: 300, exit: 300, apper: 300 }"
    ],
    ["TransitionComponent", "Transition Component", , "Fade Component"],
    ["innerProps", "BaseElement Props", , ,],
    ["...other", "Transition Props", , ,]
  ]
};
