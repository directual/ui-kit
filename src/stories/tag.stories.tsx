
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Tag } from '../export';


const story = storiesOf('Tag', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Regular Tag', () => (
  <Tag onClick={action('clicked')}>Simple Tag</Tag>
));

story.add('Icon Tag', () => (
  <Tag onClick={action('clicked')} onClose={action('close')} closeable>Icon Tag</Tag>
));

story.add('Disabled Tag', () => (
  <Tag onClick={action('clicked')} disabled>Disabled Tag</Tag>
));

story.add('Tag filled with color', () => (
  <div>
    <Tag onClick={action('clicked')} colorGroup="3-4">Tag filled with color</Tag>
    <br />
    <Tag onClick={action('clicked')} colorGroup="3-4" closeable>
      Closable tag filled with color
    </Tag>
    <br />
    <Tag onClick={action('clicked')} colorGroup="2-3" disabled>Disabled tag filled with color</Tag>
  </div>
));
