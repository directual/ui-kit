/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { MenuIcon, MenuContent } from '../export';


const story = storiesOf('Menu', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

const options = [
  {
    id: 1, value: 'option 1', groupId: 111, iconType: 'database',
  },
  {
    id: 2, value: 'option 2', groupId: 111, iconType: 'dashboard',
  },
  {
    id: 3, value: 'option 3', groupId: 111, iconType: 'folder',
  },
  {
    id: 4, value: 'option 4', groupId: 222, iconType: 'calendar',
  },
  {
    id: 5, value: 'option 5', groupId: 222, iconType: 'chart',
  },
  {
    id: 6, value: 'option 6', groupId: 222, iconType: 'clip',
  },
  {
    id: 7, value: 'option 7', groupId: 333, iconType: 'user',
  },
  {
    id: 8, value: 'option 8', groupId: 333, iconType: 'tune',
  },
  {
    id: 9, value: 'option 9', groupId: 333, iconType: 'shield',
  },
];

// const groups = [
//   { id: 111, value: 'Group 1' },
//   { id: 222, value: 'Group 2' },
//   { id: 333, value: 'Group 3' },
// ];


story.add('Menu Icon', () => (
  <div>
    <div style={{ width: '280px' }}>
      <MenuIcon
        actions={options}
        onClick={(id) => { console.log(id); }}
      />
    </div>
    <div style={{ width: '280px' }}>
      <MenuIcon
        actions={[{
          id: 9, value: 'option 9', groupId: 333, iconType: 'shield',
        }]}
        onClick={(id) => { console.log(id); }}
        // TODO: replace with normal Select
        // dropdown={(
        //   <SelectGrouped
        //     onChange={(id) => {console.log(id)}}
        //     selected={new Set}
        //     state="default"
        //     iconType="clocks"
        //     options={options}
        //     groups={groups}
        //     sourceType={{ type: 'icon', icon: 'details' }}
        //   />
        // )}
      />
    </div>
    <div style={{ width: '280px' }}>
      <MenuIcon
        actions={options}
        onClick={(id) => { console.log(id); }}
        expandContent={(
          <div style={{
            width: '100%', height: '200px', backgroundColor: 'gray', borderRadius: 'inherit',
          }}
          >
            <p>рецепт</p>
            <p>котлет</p>
            <p>Котлет!</p>
          </div>
)}
      />
    </div>
  </div>
));


story.add('Menu Content', () => (
  <div>
    <div style={{ width: '280px' }}>
      <MenuContent
        content={
          [
            (<a style={{ fontSize: '14px', color: 'blue', marginRight: '12px' }}>изменить</a>),
            (<a style={{ fontSize: '14px', color: 'blue', marginRight: '12px' }}>удалить</a>),
            (<a style={{ fontSize: '14px', color: 'blue', marginRight: '12px' }}>положить</a>),
          ]
}
      />
    </div>
    <div style={{ width: '380px' }}>
      <MenuContent
        content={
          [
            (<a style={{ fontSize: '14px', color: 'blue', marginRight: '12px' }}>изменить</a>),
            (<a style={{ fontSize: '14px', color: 'blue', marginRight: '12px' }}>удалить</a>),
            (<a style={{ fontSize: '14px', color: 'blue', marginRight: '12px' }}>положить</a>),
          ]
}
        expandContent={(
          <div style={{
            width: '100%', height: '200px', backgroundColor: 'gray', borderRadius: 'inherit',
          }}
          >
            <p>рецепт</p>
            <p>котлет</p>
            <p>Котлет!</p>
          </div>
)}
      />
    </div>
  </div>
));
