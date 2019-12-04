import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Input, Numbers, Radio, RadioGroup,
} from '../export';

const story = storiesOf('Numbers', module);

class NumbersExample extends React.Component<{}, { strVal: string, numVal: number, locale: 'ru' | 'en' }> {
  constructor() {
    super({});
    this.state = {
      strVal: '0',
      numVal: 0,
      locale: 'ru',
    };
    Numbers.locale = 'ru';
  }

  onChangeNumber = (event: React.ChangeEvent<any>) => {
    this.setState({ strVal: event.target.value, numVal: Number(event.target.value) });
  };

  onChangeLocale = (evt: React.ChangeEvent<any>) => {
    const locale = evt.target.value;
    Numbers.locale = locale;
    this.setState({ locale });
  };

  render() {
    const { locale, strVal, numVal } = this.state;
    return (
      <div>
        <span>
          <RadioGroup
            onChange={this.onChangeLocale}
            value={locale}
          >
            <Radio value="ru">ru</Radio>
            <Radio value="en">en</Radio>
          </RadioGroup>
          <Input
            value={strVal}
            onChange={this.onChangeNumber}
          />
        </span>
        <div style={{ padding: '5px' }}>
          {Numbers.separate(numVal)}
        </div>
        <div style={{ padding: '5px' }}>
          {Numbers.cut(numVal)}
        </div>
      </div>
    );
  }
}

story.add('Numbers Example', () => (
  <NumbersExample />
));
