import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import SidebarExample from '../modules/sidebar/SidebarExample';
import { IconButton, Sidebar } from '../export';


const story = storiesOf('Sidebar', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Sidebar', () => (
  <div>
    <Sidebar
      navList={[
        <IconButton
          onClick={() => {}}
          icon="clip"
          key="0"
        />,
        <IconButton
          onClick={() => {}}
          icon="clocks"
          key="0"
        />,
        <IconButton
          onClick={() => {}}
          icon="configure"
          key="0"
        />,
        <IconButton
          onClick={() => {}}
          icon="user"
          key="0"
        />,
        <IconButton
          onClick={() => {}}
          icon="version"
          key="0"
        />,
        <IconButton
          onClick={() => {}}
          icon="shield"
          key="0"
        />,
      ]}
    />
  </div>
));

story.add('SidebarExample', () => (
  <SidebarExample />
));
