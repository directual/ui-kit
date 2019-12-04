import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import { Dates, Radio, RadioGroup } from '../export';


const story = storiesOf('Dates', module);

class DatesExample extends React.Component<{}, {
  newDate: string | number, tomorrow: number | string, locale: 'ru' | 'en'
}> {
  constructor() {
    super({});
    this.state = {
      newDate: Date.now(),
      tomorrow: new Date().setDate(new Date().getDate() + 120),
      locale: 'ru',
    };
    Dates.locale = 'ru';
  }

  onChangeLocale = (evt: React.ChangeEvent<any>) => {
    const locale = evt.target.value;
    Dates.locale = locale;
    this.setState({ locale });
  };

  render() {
    const newDate = new Date();
    const { locale, newDate: newDateState, tomorrow } = this.state;
    return (
      <div>
        <p>
          {'import { Dates } from \'storybook-directual\''}
;
          <br />
          or use StorybookProvider to access Dates and Numbers
        </p>
        <span>
          <RadioGroup
            onChange={this.onChangeLocale}
            value={locale}
          >
            <Radio value="ru">ru</Radio>
            <Radio value="en">en</Radio>
          </RadioGroup>
        </span>
        <div style={{ padding: '5px' }}>
          getDate:&nbsp;
          {Dates.getDate(newDate.toString())}
        </div>
        <div style={{ padding: '5px' }}>
          getDateTime:&nbsp;
          {Dates.getDateTime(newDateState)}
        </div>
        <div style={{ padding: '5px' }}>
          getDateTimeMilliseconds:&nbsp;
          {Dates.getDateTimeMilliseconds(newDateState)}
        </div>
        <div style={{ padding: '5px' }}>
          getPeriodPart:&nbsp;
          {Dates.getPeriodPart(newDateState)}
        </div>
        <div style={{ padding: '5px' }}>
          getPeriod:&nbsp;
          {Dates.getPeriod(newDateState, tomorrow)}
        </div>
        <br />
        <div style={{ padding: '5px' }}>
          Месяцы:&nbsp;
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(1, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(2, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(3, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(4, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(5, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(6, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(7, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(8, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(9, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(10, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(11, 'months').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortMonth(moment().subtract(12, 'months').format())}
        </div>
        <br />
        <div style={{ padding: '5px' }}>
          Дни недели:
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortDay(moment().subtract(1, 'days').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortDay(moment().subtract(2, 'days').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortDay(moment().subtract(3, 'days').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortDay(moment().subtract(4, 'days').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortDay(moment().subtract(5, 'days').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortDay(moment().subtract(6, 'days').format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getShortDay(moment().subtract(7, 'days').format())}
        </div>
        <br />
        <div style={{ padding: '5px' }}>
          Относительные:
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().seconds(newDate.getSeconds() - 5).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().minutes(newDate.getMinutes() - 1).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().minutes(newDate.getMinutes() - 5).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().minutes(newDate.getMinutes() - 60).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().hours(0).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().date(newDate.getDate() - 1).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().date(newDate.getDate() - 5).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().date(newDate.getDate() - 31).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().date(newDate.getDate() - 61).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().year(newDate.getFullYear() - 1).format())}
        </div>
        <div style={{ padding: '5px' }}>
          {Dates.getFromNow(moment().year(newDate.getFullYear() - 2).format())}
        </div>
      </div>
    );
  }
}

story.add('Dates example', () => (
  <DatesExample />
));
