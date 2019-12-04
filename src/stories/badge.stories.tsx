import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import {
  Badge,
  Header,
  Button,
  AccentButton,
  Icon,
} from '../export';


const story = storiesOf('Badge', module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: true } });

story.add('Badge', () => (
  <div>
    <Badge count={1000}>
      <AccentButton
        onClick={action('clicked')}
      >
        Сделать
      </AccentButton>
    </Badge>
    <br />
    <br />
    <Badge count={1}>
      <Button
        icon={<Icon className="className" type="refresh" />}
        onClick={action('clicked')}
      >
        Сделать
      </Button>
    </Badge>
    <br />
    <br />
    <Header count={56}>В заголовках</Header>
  </div>
));
