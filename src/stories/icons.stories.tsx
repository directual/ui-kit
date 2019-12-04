import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import Icons from '../modules/icon/icons';
import { Icon } from '../export';


const story = storiesOf('Icons', module);

story
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });


story.add('Icons', () => (
  <Icons />
));

story.add('Icon', () => (
  <div style={{
    height: '32px',
    width: '32px',
  }}
  >
    <Icon
      style={{ color: '#000000' }}
      className="className"
      type="close"
      onClick={action('clicked')}
    />
  </div>
));
