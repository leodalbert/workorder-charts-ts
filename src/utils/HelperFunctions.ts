// function to check if in Dev
export const inDev = (): boolean => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return true;
  } else return false;
};

// function to generate color from array by index
export const colorSelector = (i: number): string => {
  return [
    '#174656',
    '#779966',
    '#930900',
    '#ffa47a',
    '#00897a',
    '#aa9977',
    '#e5ee99',
    '#bbbb77',
    '#fff993',
    '#ffaa66',
    '#557755',
    '#bbffee',
    '#58a184',
    '#f0caa2',
    '#115500',
    '#198100',
    '#4dc32c',
    '#bef43d',
    '#387e73',
    '#33c199',
    '#87ff9d',
    '#2469ba',
    '#75cffa',
    '#bd5dfd',
    '#891bb0',
    '#f16391',
    '#feadc0',
    '#c6281c',
    '#f95a00',
    '#ff9e32',
    '#ffe07a',
    '#55aaee',
    '#aabb66',
    '#ff6f0f',
    '#ffe521',
    '#b2afaa',
    '#2299ee',
    '#ff004c',
    '#54ee66',
    '#f7c50c',
    '#115588',
    '#990f16',
    '#44aa00',
    '#98860f',
  ][i];
};
