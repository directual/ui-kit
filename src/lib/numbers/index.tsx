import { separate, cut } from './helpers';
import dictionary, { Dictionary } from './dictionary';

import { locale } from '../types/types';

export interface INumbers {
  locale: locale;
  separate: (value: number) => string,
  cut: (value: number) => string,
}

class Numbers implements INumbers {
  static _locale: locale = 'en';

  static _dictionary: Dictionary = dictionary[Numbers._locale];

  public set locale(val: locale) {
    Numbers._locale = val;
    Numbers._dictionary = dictionary[Numbers._locale];
  }

  public get locale(): locale {
    return Numbers._locale;
  }

  public separate(val: number): string {
    return separate(val, Numbers._dictionary);
  }

  public cut(val: number): string {
    return cut(val, Numbers._dictionary);
  }
}

export default new Numbers();
