import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';


import { Notification } from '../export';


const story = storiesOf('Notifications', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Notifications', () => (
  <div>
    <Notification
      type="error"
      header="Header"
      message="Always wash hands before handling food. Illnesses are easily transferred from person to person through
        food. Washing hands before touching fruits, vegetables and other foods helps to kill any bacteria that may be
        transferred from the person’s hand to the food."
    />
    <br />
    <Notification
      type="info"
      header="Header"
      message="Always wash hands before handling food. Illnesses are easily transferred from person to person through
        food."
      onExit={action('EXIT')}
      withButtons
      submitText="Do something awesome"
      cancelText="Decline"
      onSubmit={action('SUBMIT')}
      onCancel={action('CANCEL')}
    />
    <br />
    <Notification
      type="success"
      header="Header"
      message="Always wash hands before handling food. Illnesses are easily transferred from person to person through
        food. Washing hands before touching fruits, vegetables and other foods helps to kill any bacteria that may be
        transferred from the person’s hand to the food."
      onExit={action('EXIT')}
    />
    <br />
    <Notification
      type="warning"
      header="Header"
      message="Always wash hands before handling food. Illnesses are easily transferred from person to person through
        food. Washing hands before touching fruits, vegetables and other foods helps to kill any bacteria that may be
        transferred from the person’s hand to the food."
      onExit={action('EXIT')}
      withButtons
      onSubmit={action('SUBMIT')}
      onCancel={action('CANCEL')}
    />
  </div>
));
