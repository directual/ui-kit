import React from 'react';
import { storiesOf } from '@storybook/react';
import FontsExample from '../modules/fonts-example/fonts-example';

const story = storiesOf('Fonts', module);

story.add('Fonts examples', () => (
  <FontsExample />
));
