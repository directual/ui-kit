import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Button, IconButton, Tooltip } from '../export';


const story = storiesOf('Tooltip', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Tooltip', () => (
  <div
    style={{
      marginLeft: '512px',
      width: 'fit-content',
    }}
  >
    <Tooltip
      message="Эй, проснись!"
      placement="bottomRight"
    >
      <Button>Hello</Button>
    </Tooltip>
    <Tooltip
      message="Эй, проснись! Ну ты и соня. Тебя даже вчерашний шторм не разбудил. Говорят, мы уже приплыли в Морровинд. Нас выпустят, это точно!"
      placement="bottomLeft"
    >
      <IconButton
        onClick={() => {}}
        icon="info"
      />
    </Tooltip>
  </div>
));
