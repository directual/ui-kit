import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { SidePanel } from '../export';
import HandlebarExample from '../modules/handlebar/HandlebarExample';


const story = storiesOf('Side Panel', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Side panel', () => (
  <SidePanel
    width={400}
    onClose={action('close')}
    show
  >
    <h2 style={{ marginTop: '5px', marginBottom: '5px' }}>My header</h2>
    <p>My text my text. My text my text</p>
    <p>My text my text. My text my text</p>
    <p>My text my text. My text my text</p>
    <p>My text my text. My text my text</p>
  </SidePanel>
));

story.add('Side panel resizable', () => (
  <HandlebarExample />
));
