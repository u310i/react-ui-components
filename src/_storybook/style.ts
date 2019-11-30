export const childrenHorizontalSpacing: {
  [P in string]?: React.CSSProperties;
} = {
  ["& > :not(:first-child)"]: {
    marginLeft: "15px"
  }
};

export const childrenVerticalSpacing: {
  [P in string]?: React.CSSProperties;
} = {
  ["& > :not(:first-child)"]: {
    marginTop: "15px"
  }
};
