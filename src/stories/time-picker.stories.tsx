/* eslint-disable max-classes-per-file */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Moment } from 'moment';
import { TimePicker, DatePicker, withStorybook } from '../export';

import Radio from '../modules/radio/Radio';
import RadioGroup from '../modules/radio/RadioGroup';


const story = storiesOf('Date and Time', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

class TimePickerExample extends React.Component<any, {value: Moment | undefined}> {
  state = {
    value: undefined,
  };

  onChange = (time: Moment) => {
    console.log('selected time::::', time);
    this.setState({ value: time });
  };

  render() {
    const { value } = this.state;
    return (
      <div style={{ margin: '10px', width: 400, height: 100 }}>
        <label htmlFor="time-picker">
          <h1>Time</h1>
        </label>
        <TimePicker
          id="time-picker"
          value={value}
          onChange={this.onChange}
          status="default"
          placeholder="Set time"
          submitText="Set Time"
        />
      </div>
    );
  }
}

story.add('TimePicker', () => (<TimePickerExample />));

class DatePickerExample extends React.Component<any, { value: any, locale: string }> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: undefined,
      locale: 'ru',
    };
  }

  componentDidMount() {
    const { Dates } = this.props;
    const { locale } = this.state;
    Dates.locale = locale;
  }

  onChangeLocale = (evt: any) => {
    const locale = evt.target.value;
    const { Dates } = this.props;
    Dates.locale = locale;
    this.setState({ locale });
    this.forceUpdate();
  };

  onChange = (date: Moment) => {
    console.log('selected date:::', date);
    this.setState({ value: date });
  };

  render() {
    const { locale, value } = this.state;
    return (
      <div style={{ margin: '10px', width: 400, height: 200 }}>
        <span>
          <RadioGroup
            onChange={this.onChangeLocale}
            value={locale}
          >
            <Radio value="ru">ru</Radio>
            <Radio value="en">en</Radio>
          </RadioGroup>
        </span>
        <label htmlFor="date-picker">
          <h1>Date</h1>
        </label>
        <DatePicker
          id="date-picker"
          value={value}
          onChange={this.onChange}
          status="default"
          placeholder={locale === 'en' ? 'Select date' : 'Выберите дату'}
        />
      </div>
    );
  }
}

const ExampleWithStorybook = withStorybook(DatePickerExample);

story.add('DatePicker', () => (<ExampleWithStorybook />));
