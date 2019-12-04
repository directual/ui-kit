import moment, { Moment } from 'moment';
// @ts-ignore
import ruMoment from 'moment/locale/ru';
import dictionary, { Dictionary, Calendar } from './dictionary';

import { locale } from '../types/types';
// нужно что бы локаль пробросилась на момент сборки, иначе не заработает переход с языка на язык
// @ts-ignore


moment.locale('ru', {
  ...ruMoment,
  monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  weekdaysShort: 'пн_вт_ср_чт_пт_сб_вс'.split('_'),
  week: {
    dow: 1,
    doy: 1,
  },
});

moment.locale('en', {
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
});

type TDateActionFunc = (date: string | number | Moment) => string | boolean;

export interface IDates {
  locale: locale,
  validate: (date: string | number) => boolean,
  getDate: TDateActionFunc,
  getDateDelimeted: TDateActionFunc,
  getDateTime: TDateActionFunc,
  getDateTimeMilliseconds: TDateActionFunc,
  getPeriodPart: TDateActionFunc,
  getPeriod: (start: string | number, end: string | number) => string | boolean,
  getFromNow: TDateActionFunc,
  getShortDay: TDateActionFunc,
  getShortMonth: TDateActionFunc,
  getWeekdaysShort: () => string[],
  getCalendarWords: () => Calendar,
  parseDateDelimeted: (val: string | Moment) => Moment,
  getDateDelimetedFormat: () => string,
}

class Dates implements IDates {
  private _locale: locale = 'en';

  private _dictionary: Dictionary = dictionary[this._locale];

  public set locale(val: locale) {
    this._locale = val;
    this._dictionary = dictionary[val];
    moment.locale(val);
  }

  public get locale(): locale {
    return this._locale;
  }

  // eslint-disable-next-line class-methods-use-this
  public validate(date: string | number | Moment): boolean {
    return moment(date).isValid();
  }

  public getDate(val: string | number): string | boolean {
    if (!this.validate(val)) return false;
    return moment(val).format(this._dictionary.date);
  }

  public getDateDelimeted(val: string | number): string | boolean {
    const valLocaled = moment(val).locale(this._locale);

    return this.validate(valLocaled) && moment(valLocaled).format(this._dictionary.dateDelimeted);
  }

  public getDateTime(val: string | number): string | boolean {
    const valLocaled = moment(val).locale(this._locale);

    return this.validate(valLocaled) && moment(valLocaled).format(this._dictionary.dateTime);
  }

  public getDateTimeMilliseconds(val: string | number): string | boolean {
    const valLocaled = moment(val).locale(this._locale);

    return this.validate(valLocaled) && moment(valLocaled).format(this._dictionary.dateTimeMilliseconds);
  }

  public getPeriodPart(val: string | number): string | boolean {
    if (!this.validate(val)) return false;

    const valLocaled = moment(val).locale(this._locale);

    return this.validate(val) && moment(valLocaled).format(this._dictionary.periodPart);
  }

  public getPeriod(start: string | number, end: string | number): string | boolean {
    if (this.validate(start) && this.validate(end)) {
      return `${this.getPeriodPart(start)} — ${this.getPeriodPart(end)}`;
    }
    return false;
  }

  public getFromNow(val: string | number): string | boolean {
    if (!this.validate(val)) {
      return false;
    }
    return moment(val).fromNow();
  }

  public getShortDay(val: string | number): string | boolean {
    let day = '';
    if (this.validate(val)) {
      day = moment(val).format(this._dictionary.shortDay);
    }
    return day.charAt(0).toUpperCase() + day.slice(1);
  }

  public getShortMonth(val: string | number): string | boolean {
    return this.validate(val) && moment(val).format(this._dictionary.shortMonth);
  }

  // eslint-disable-next-line class-methods-use-this
  public getWeekdaysShort(): string[] {
    return moment.weekdaysShort();
  }

  public getCalendarWords(): Calendar {
    return this._dictionary.calendar;
  }

  public parseDateDelimeted(val: string | moment.Moment): moment.Moment {
    return moment(val, this._dictionary.dateDelimeted);
  }

  public getDateDelimetedFormat(): string {
    return this._dictionary.dateDelimeted;
  }
}

export default new Dates();
