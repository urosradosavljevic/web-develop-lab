// Helper Func
export const getAverageRGB = frame => {
  const length = frame.data.length / 4;

  let r = 0;
  let g = 0;
  let b = 0;

  for (let i = 0; i < length; i++) {
    r += frame.data[i * 4 + 0];
    g += frame.data[i * 4 + 1];
    b += frame.data[i * 4 + 2];
  }

  return {
    r: r / length,
    g: g / length,
    b: b / length
  };
};
