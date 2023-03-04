export type rgbaValue = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

export const rgba = (red, green, blue, alpha): rgbaValue => {
  return {
    red: red,
    green: green,
    blue: blue,
    alpha: alpha,
  };
};
