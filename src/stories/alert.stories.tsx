import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Alert } from '../export';

const stories = storiesOf('Alert', module);

stories.add(
  'Alert',
  withInfo({ inline: true })(() => (
    <div>
      <Alert
        header="Заголовок"
        message="All the forest fauna Frozen feeling fear Flinching at the moment Face to face with face of bear All the forest creatures
        Vanish from sight Their betters come with hungers That cannot be denied"
        closeable
        type="warning"
        className="sience"
      />
      <Alert
        header="Заголовок"
        message="All the forest fauna Frozen feeling fear Flinching at the moment Face to face with face of bear All the forest creatures
        Vanish from sight Their betters come with hungers That cannot be denied"
        closeable
        type="info"
      />
      <Alert
        header="Заголовок"
        message="All the forest fauna Frozen feeling fear Flinching at the moment Face to face with face of bear All the forest creatures
        Vanish from sight Their betters come with hungers That cannot be denied"
        closeable
        type="default"
      />
      <Alert
        header="Заголовок"
        message="All the forest fauna Frozen feeling fear Flinching at the moment Face to face with face of bear All the forest creatures
        Vanish from sight Their betters come with hungers That cannot be denied"
        closeable
        type="error"
      />
      <Alert
        header="Заголовок"
        message="All the forest fauna Frozen feeling fear Flinching at the moment Face to face with face of bear All the forest creatures
        Vanish from sight Their betters come with hungers That cannot be denied"
        closeable
        iconType="lock"
      />
      <Alert
        header="Заголовок"
        message="All the forest fauna Frozen feeling fear Flinching at the moment Face to face with face of bear All the forest creatures
        Vanish from sight Their betters come with hungers That cannot be denied"
        closeable
        type="error"
        iconType="babai"
      />
    </div>
  )),
);
