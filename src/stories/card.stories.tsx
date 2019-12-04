/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import {
  CardDefault,
  CardImaged,
  Tag,
  MenuIcon,
  MenuContent,
} from '../export';
// TODO: replace with normal select
// import SelectGrouped from '../modules/select/selectGrouped';


const story = storiesOf('Card', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

const options = [
  {
    id: 1, value: 'option 1', groupId: 111, icon: 'database',
  },
  {
    id: 2, value: 'option 2', groupId: 111, icon: 'dashboard',
  },
  {
    id: 3, value: 'option 3', groupId: 111, icon: 'folder',
  },
  {
    id: 4, value: 'option 4', groupId: 222, icon: 'calendar',
  },
  {
    id: 5, value: 'option 5', groupId: 222, icon: 'chart',
  },
  {
    id: 6, value: 'option 6', groupId: 222, icon: 'clip',
  },
  {
    id: 7, value: 'option 7', groupId: 333, icon: 'user',
  },
  {
    id: 8, value: 'option 8', groupId: 333, icon: 'tune',
  },
  {
    id: 9, value: 'option 9', groupId: 333, icon: 'shield',
  },
];

// const groups = [
//   { id: 111, value: 'Group 1' },
//   { id: 222, value: 'Group 2' },
//   { id: 333, value: 'Group 3' },
// ];

story.add('Default Card', () => (
  <div>
    <div style={{ width: '624px' }}>
      <CardDefault
        image={{
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOndYdQBcw33MhFlFO3qBORL0RNcQh5x1jExaEVlNSk6bKGrc5A',
        }}
        header="Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik"
        count={701}
        headerComment="Belorussian potato"
        text="I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato "
        menu={(
          <MenuIcon
            actions={[{
              id: 9, value: 'option 9', groupId: 333, icon: 'shield',
            }]}
            onClick={(id) => { console.log(id); }}
            expandContent={(
              <div style={{ width: '100%', height: '200px', borderRadius: 'inherit' }}>
                <p>рецепт</p>
                <p>котлет</p>
                <p>Котлет!</p>
              </div>
)}
          />
        )}
      />
      <br />
      <CardDefault
        image={{
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOndYdQBcw33MhFlFO3qBORL0RNcQh5x1jExaEVlNSk6bKGrc5A',
        }}
        tags={[(<Tag onClick={() => { console.log('TAG'); }}>1 Tag</Tag>), (<Tag onClick={() => { console.log('TAG'); }}>2 Tag</Tag>), (<Tag onClick={() => { console.log('TAG'); }}>3 Tag</Tag>)]}
        header="Dr an ik Dr an ik"
        count={701}
        headerComment="Belorussian potato"
        text="I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato "
        menu={(
          <MenuIcon
            actions={options}
            onClick={(id) => { console.log(id); }}
            // dropdown={
            //   <SelectGrouped
            //     onChange={(id) => {console.log(id)}}
            //     selected={new Set}
            //     state="default"
            //     icon="clocks"
            //     options={options}
            //     groups={groups}
            //     sourceType={{ type: 'icon', icon: 'details' }}
            //   />}
          />
        )}
      />

    </div>
  </div>
));

story.add('Imaged Card', () => (
  <div>
    <div style={{ width: '312px' }}>
      <CardImaged
        tags={[(<Tag onClick={() => { console.log('TAG'); }}>1 Tag</Tag>), (<Tag onClick={() => { console.log('TAG'); }}>2 Tag</Tag>), (<Tag onClick={() => { console.log('TAG'); }}>3 Tag</Tag>)]}
        image={{
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOndYdQBcw33MhFlFO3qBORL0RNcQh5x1jExaEVlNSk6bKGrc5A',
        }}
        header="Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik"
        count={701}
        headerComment="Belorussian potato"
        text="I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato "
        menu={(
          <MenuIcon
            actions={options}
            onClick={(id) => { console.log(id); }}
          />
        )}
      />
      <br />
      <CardImaged
        image={{ color: 'uglyPurple', icon: 'babai' }}
        header="Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik Dr an ik"
        count={701}
        headerComment="Belorussian potato"
        text="I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato "
        menu={(
          <MenuContent
            content={
              [
                (<a className="Link_14-24" key="11" style={{ cursor: 'pointer', marginRight: '12px' }}>изменить</a>),
                (<a className="Link_14-24" key="22" style={{ cursor: 'pointer', marginRight: '12px' }}>удалить</a>),
                (<a className="Link_14-24" key="33" style={{ cursor: 'pointer', marginRight: '12px' }}>положить</a>),
              ]
}
          />
        )}
      />
      <br />
      <CardImaged
        tags={[(<Tag onClick={() => { console.log('TAG'); }}>1 Tag</Tag>), (<Tag onClick={() => { console.log('TAG'); }}>2 Tag</Tag>), (<Tag onClick={() => { console.log('TAG'); }}>3 Tag</Tag>)]}
        header="Lor of the Rin"
        count={701}
        headerComment="Belorussian potato"
        text="I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato I love potato "
        menu={(
          <MenuIcon
            actions={options}
            onClick={(id) => { console.log(id); }}
          />
        )}
      />
    </div>
  </div>
));
