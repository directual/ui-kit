/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import HandlebarExample from '../modules/handlebar/HandlebarExample';
import { HandleBar } from '../export';

const story = storiesOf('Handlebar', module);

story
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });


story.add('Handlebar', () => (
  <div style={{ display: 'flex', width: '300px', height: '200px' }}>
    <HandleBar
      isVisible
      onMouseOver={action('mouse over')}
      onMouseOut={action('mouse out')}
    />
    <HandleBar
      isVisible
      isPressed
      onMouseOver={action('mouse over')}
      onMouseOut={action('mouse out')}
    />
  </div>
));

story.add('Handlebar on panel', () => (
  <HandlebarExample />
));
