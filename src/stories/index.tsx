import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../export';

const pjson = require('../../package.json');

const story = storiesOf('Info', module);

const changeTheme = (theme: string) => () => {
  const body = document.getElementsByTagName('body')[0];
  body.setAttribute('data-theme', theme);
};

story.add('Info', () => (
  <div>
    <p>Directual UI kit</p>
    <span>
Version:
      {pjson.version}
    </span>
    <br />
    <Button onClick={changeTheme('')}>Default theme</Button>
    <br />
    <Button onClick={changeTheme('ocid')}>Acid theme</Button>
    <br />
    <Button onClick={changeTheme('dork')}>Dark theme</Button>
  </div>
));
