import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import CheckboxExample from '../modules/checkbox/CheckboxExample';
import { Checkbox } from '../export';


const story = storiesOf('Checkbox', module);


story
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });


story.add('Checkbox Default', () => (
  <Checkbox
    onChange={action('clicked')}
  >
    I am default checkbox
  </Checkbox>
));

story.add('Checkbox Indeterminate', () => (
  <Checkbox
    onChange={action('clicked')}
    indeterminate
  >
    I am default checkbox
  </Checkbox>
));

story.add('Checkbox Example', () => (
  <CheckboxExample />
));
