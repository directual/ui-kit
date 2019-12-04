/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import {
  Button, IconButton, ButtonGroup, Icon,
} from '../export';

const story = storiesOf('Button', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Regular button', () => (
  <div>
    <Button onClick={action('clicked')}>I'm an default button</Button>
    <br />
    <Button icon={<Icon className="className" type="close" />} onClick={action('clicked')}>I'm an default button</Button>
    <br />
    <Button disabled onClick={action('clicked')}>I'm an default button</Button>
    <br />
    <Button disabled icon={<Icon className="className" type="close" />} onClick={action('clicked')}>I'm an default button</Button>

  </div>
));
story.add('Accent button', () => (
  <div>
    <Button
      type="accent"
      onClick={action('clicked')}
    >
      I'm an accent button
    </Button>
    <br />
    <Button
      icon={<Icon className="className" type="close" />}
      type="accent"
      onClick={action('clicked')}
    >
      I'm an accent button
    </Button>
    <br />
    <Button
      disabled
      type="accent"
      onClick={action('clicked')}
    >
      I'm an default button
    </Button>
    <br />
    <Button
      disabled
      type="accent"
      icon={<Icon className="className" type="close" />}
      onClick={action('clicked')}
    >
      I'm an default button
    </Button>
  </div>
));
story.add('Link button', () => (
  <div>
    <Button
      type="link"
      onClick={action('clicked')}
    >
      I'm a link button
    </Button>
    <br />
    <Button
      disabled
      type="link"
      onClick={action('clicked')}
    >
      I'm a link button
    </Button>
  </div>
));

story.add('Icon button', () => (
  <div>
    <IconButton
      onClick={action('clicked')}
      icon="database"
      disabled
    />
    <IconButton
      onClick={action('clicked')}
      icon="dashboard"
    />
    <IconButton
      onClick={action('clicked')}
      icon="folder"
    />
  </div>
));

story.add('Button group', () => (
  <ButtonGroup>
    <IconButton
      onClick={action('clicked')}
      icon="database"
      disabled
    />
    <IconButton
      onClick={action('clicked')}
      icon="dashboard"
    />
    <IconButton
      onClick={action('clicked')}
      icon="folder"
    />
  </ButtonGroup>
));
