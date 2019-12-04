export interface Dictionary {
  digits: Array<number>,
  fractions: Array<number>,
  shorts: Array<string>,
  intSeparator: string,
  fractionSeparator: string,
}

const dictionary: { [key: string]: Dictionary } = {
  en: {
    digits: [1, 1e3, 1e6, 1e9],
    fractions: [10, 1, 2, 3],
    shorts: ['', 'K', 'M', 'B'],
    intSeparator: ',',
    fractionSeparator: '.',
  },
  ru: {
    digits: [1, 1e3, 1e6, 1e9],
    fractions: [10, 1, 2, 3],
    shorts: ['', 'тыс.', 'млн.', 'млрд.'],
    intSeparator: '\u2009',
    fractionSeparator: ',',
  },
};

export default dictionary;
