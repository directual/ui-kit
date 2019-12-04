interface ColorObj {
  name: string,
  hex: string,
}

interface ColorsObj {
  [key: string]: ColorObj;
}

type ColorsList = (ColorObj & { key: string })[];
type ExtendedColorObj = ColorObj & { key: string };

export const colors: ColorsObj = {
  lightGold: {
    name: 'light gold',
    hex: '#fcde5e',
  },
  bloodOrange: {
    name: 'blood orange',
    hex: '#e4531c',
  },
  butterscotch: {
    name: 'butterscotch',
    hex: '#f5b54b',
  },
  fadedOrange: {
    name: 'faded orange',
    hex: '#f19d40',
  },
  dullOrange: {
    name: 'dull orange',
    hex: '#ea752c',
  },
  maize: {
    name: 'maize',
    hex: '#f9cd56',
  },
  brownishOrange: {
    name: 'brownish orange',
    hex: '#d44f1e',
  },
  dustyOrange: {
    name: 'dusty orange',
    hex: '#ed8634',
  },
  sienna: {
    name: 'sienna',
    hex: '#bd4b21',
  },
  brownishRed: {
    name: 'brownish red',
    hex: '#9b4425',
  },
  milkChocolate: {
    name: 'milk chocolate',
    hex: '#773c2a',
  },
  cocoa: {
    name: 'cocoa',
    hex: '#51352f',
  },
  lightGreen: {
    name: 'light green',
    hex: '#dbedc8',
  },
  paleTeal: {
    name: 'pale teal',
    hex: '#8bcfcf',
  },
  lightTeal: {
    name: 'light teal',
    hex: '#a0d7cd',
  },
  seafoamBlue: {
    name: 'seafoam blue',
    hex: '#74c6d0',
  },
  greyblue: {
    name: 'greyblue',
    hex: '#61bfd2',
  },
  darkSkyBlue: {
    name: 'dark sky blue',
    hex: '#49b6d4',
  },
  siler: {
    name: 'silver',
    hex: '#b9e0cb',
  },
  cobalt: {
    name: 'cobalt',
    hex: '#1b2680',
  },
  windowsBlue: {
    name: 'windows blue',
    hex: '#3583b8',
  },
  duskBlue: {
    name: 'dusk blue',
    hex: '#254895',
  },
  coolBlue: {
    name: 'cool blue',
    hex: '#3c9fc9',
  },
  palePeach: {
    name: 'pale peach',
    hex: '#fee3b0',
  },
  midBlue: {
    name: 'mid blue',
    hex: '#2d69a8',
  },
  peachyPink: {
    name: 'peachy pink',
    hex: '#f39b9a',
  },
  chumSalmon: {
    name: 'chum salmon',
    hex: '#f6afa1',
  },
  rosePink: {
    name: 'rose pink',
    hex: '#f08795',
  },
  paleSalmon: {
    name: 'pale salmon',
    hex: '#f9c6a8',
  },
  warmPink: {
    name: 'warm pink',
    hex: '#e95987',
  },
  rosyPink: {
    name: 'rosy pink',
    hex: '#ed718f',
  },
  uglyPurple: {
    name: 'ugly purple',
    hex: '#bc3f8c',
  },
  purple: {
    name: 'purple',
    hex: '#8c2a94',
  },
  darkishPink: {
    name: 'darkish pink',
    hex: '#d74b88',
  },
  warmPurple: {
    name: 'warm purple',
    hex: '#a23490',
  },
  darkPurple: {
    name: 'dark purple',
    hex: '#6b1b9a',
  },
};

// возвращает случайный цвет
export const getRandomColor = ():ExtendedColorObj => {
  const colorsKeys = Object.keys(colors);
  const colorIndx = Math.floor(Math.random() * colorsKeys.length);
  const randomColor = colors[colorsKeys[colorIndx]];
  return { ...randomColor, key: colorsKeys[colorIndx] };
};

// возвращает массив цветов [ { name: string, hex: string, key: string }, ...]
export const getColorsList = (): ColorsList => {
  const colorsList: ColorsList = [];
  const colorsKeys = Object.keys(colors);

  colorsKeys.forEach((key) => colorsList.push({ ...colors[key], key }));

  return colorsList;
};
