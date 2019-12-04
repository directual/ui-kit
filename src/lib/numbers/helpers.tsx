import { Dictionary } from './dictionary';

function separate(val: number, dictionary: Dictionary): string {
  let strVal = '';
  const parsedVal: Array<string> | null = val.toString().match(/(?!\.)\d+/g);

  if (parsedVal) {
    const [int, fraction] = parsedVal;

    if (val < 0) strVal += '-';

    if (int) strVal += int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${dictionary.intSeparator}`);

    if (fraction) strVal += `${dictionary.fractionSeparator}${fraction}`;
  }

  return strVal;
}

function round(val: number, fraction: number, digit: number): number {
  // eslint-disable-next-line no-mixed-operators
  return Math.round(val * (10 ** fraction) / digit) / (10 ** fraction);
}

function cut(val: number, dictionary: Dictionary): string {
  let i = 0;
  let cutVal = Math.abs(round(val, dictionary.fractions[i], dictionary.digits[i]));

  while (cutVal >= 1e3 && i < dictionary.digits.length - 1) {
    i += 1;
    const nextCutVal = Math.abs(round(val, dictionary.fractions[i], dictionary.digits[i]));
    cutVal = nextCutVal;
  }

  let strVal = separate(cutVal, dictionary);

  if (val < 0) strVal = `-${strVal}`;

  strVal += ` ${dictionary.shorts[i]}`;

  return strVal.trim();
}

export { separate, cut };
