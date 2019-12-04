export interface Calendar {
  today: string,
  current: string,
  chooseMonth: string,
  chooseYear: string,
}

export interface Dictionary {
  date: string,
  dateTime: string,
  dateTimeMilliseconds: string,
  periodPart: string,
  shortDay: string,
  shortMonth: string,
  dateDelimeted: string,
  calendar: Calendar,
}

const dictionary: { [key: string]: Dictionary } = {
  en: {
    date: 'MMMM D, YYYY', // July 12, 2018
    dateDelimeted: 'MM.DD.YYYY', // 05.25.1995
    dateTime: 'MMMM D, YYYY, kk:mm', // July 12, 2018, 16:54
    dateTimeMilliseconds: 'MMMM D, YYYY, kk:mm:ss.SSS', // July 12, 2018, 16:54:34.334
    periodPart: 'MMM D, YYYY', // Apr 1, 2017 — May 4, 2017,
    shortDay: 'ddd',
    shortMonth: 'MMM',
    calendar: {
      today: 'Today',
      current: 'Current',
      chooseMonth: 'Choose month',
      chooseYear: 'Choose year',
    },
  },
  ru: {
    date: 'D MMMM, YYYY', // 12 июля, 2018
    dateDelimeted: 'DD.MM.YYYY', // 05.25.1995
    dateTime: 'D MMMM, YYYY, kk:mm', // 12 июля, 2018, 16:54
    dateTimeMilliseconds: 'D MMMM, YYYY, kk:mm:ss,SSS', // 12 июля, 2018, 16:54:34,334
    periodPart: 'D MMM, YYYY', // 1 апр, 2017 — 4 мая, 2017
    shortDay: 'dd',
    shortMonth: 'MMM',
    calendar: {
      today: 'Сегодня',
      current: 'Текущий',
      chooseMonth: 'Выберите месяц',
      chooseYear: 'Выберите год',
    },
  },
};

export default dictionary;
