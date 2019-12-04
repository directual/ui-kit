import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Spinner, SimpleLoader, ProgressLoader } from '../export';


const story = storiesOf('Loader', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Spinner', () => (
  <Spinner size="big" />
));

story.add('Simple Loader', () => (
  <SimpleLoader />
));

story.add('Progress Loader', () => (
  <ProgressLoader progress={75} />
));
