import React from 'react';
import { storiesOf } from '@storybook/react';
import ColorPalette from '../modules/color-palette';


const story = storiesOf('ColorPalette', module);

story.add('Color theme', () => (
  <ColorPalette />
));
