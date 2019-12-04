import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Radio, RadioGroup } from '../export';
import RadioExample from '../modules/radio/RadioExample';

const story = storiesOf('Radio', module);


story
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });


story.add('Radio', () => (
  <Radio
    value="1"
  >
    I am default radio
  </Radio>
));

story.add('RadioGroup', () => (
  <RadioGroup
    onChange={action('clicked')}
    value={2}
  >
    <Radio value={1}>Frontend</Radio>
    <Radio value={2}>Backend</Radio>
    <Radio value={3}>Dev Ops</Radio>
    <Radio disabled value={4}>???</Radio>
  </RadioGroup>
));

story.add('Radio Example', () => (
  <RadioExample />
));
