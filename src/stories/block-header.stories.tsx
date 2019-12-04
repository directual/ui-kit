import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import { Header, BlockHeader, IconButton } from '../export';


const story = storiesOf('Block header', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Block header', () => (
  <>
    <div style={{ width: 400, margin: 20 }}>
      <Header>Simple header</Header>
    </div>
    <br />
    <div style={{ width: 400, margin: 20 }}>
      <BlockHeader
        accentText="Block header"
        secondaryText="1."
        icon={(
          <IconButton
            onClick={action('clicked')}
            icon="done"
          />
        )}
      />
    </div>
  </>
));
