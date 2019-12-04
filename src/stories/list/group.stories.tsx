// eslint-disable-next-line max-classes-per-file
import React from 'react';

import { storiesOf } from '@storybook/react';
import { List, CheckableList } from '../../export';


interface Props {
}

interface State {
  selected: Array<number>;
  options: Array<{ id: number, value: string }>;
}

class ContainerGrouped extends React.Component<Props, State> {
  state = {
    selected: [],
    options: [
      { id: 1, value: 'option 1', groupId: 111 },
      { id: 2, value: 'option 2', groupId: 111 },
      { id: 3, value: 'option 3', groupId: 111 },
      { id: 4, value: 'option 4', groupId: 222 },
      { id: 5, value: 'option 5', groupId: 222 },
      { id: 6, value: 'option 6', groupId: 222 },
      { id: 7, value: 'option 7', groupId: 333 },
      { id: 8, value: 'option 8', groupId: 333 },
      { id: 9, value: 'option 9', groupId: 333 },
    ],
    groups: [
      { id: 111, value: 'Group 1' },
      { id: 222, value: 'Group 2' },
      { id: 333, value: 'Group 3' },
    ],
  };

  onChange = (selected: number): void => {
    this.setState({ selected: [selected] });
  };

  render() {
    const { selected, options, groups } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '240px', margin: '10px', height: '250px' }}>
            <List
              selected={selected}
              options={options}
              groups={groups}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ContainerIconedGrouped extends React.Component<Props, State> {
  state = {
    selected: [],
    options: [
      { id: 1, value: 'option 1', groupId: 111 },
      { id: 2, value: 'option 2', groupId: 111 },
      { id: 3, value: 'option 3', groupId: 111 },
      { id: 4, value: 'option 4', groupId: 222 },
      { id: 5, value: 'option 5', groupId: 222 },
      { id: 6, value: 'option 6', groupId: 222 },
      { id: 7, value: 'option 7', groupId: 333 },
      { id: 8, value: 'option 8', groupId: 333 },
      { id: 9, value: 'option 9', groupId: 333 },
    ],
    groups: [
      { id: 111, value: 'Group 1' },
      { id: 222, value: 'Group 2' },
      { id: 333, value: 'Group 3' },
    ],
  };

  onChange = (selected: number): void => {
    this.setState({ selected: [selected] });
  };

  render() {
    const { selected, options, groups } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '240px', margin: '10px', height: '250px' }}>
            <List
              icon="clocks"
              selected={selected}
              options={options}
              groups={groups}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ContainerGroupedCheckable extends React.Component<Props, State> {
  state = {
    selected: [],
    options: [
      { id: 1, value: 'option 1', groupId: 111 },
      { id: 2, value: 'option 2', groupId: 111 },
      { id: 3, value: 'option 3', groupId: 111 },
      { id: 4, value: 'option 4', groupId: 222 },
      { id: 5, value: 'option 5', groupId: 222 },
      { id: 6, value: 'option 6', groupId: 222 },
      { id: 7, value: 'option 7', groupId: 333 },
      { id: 8, value: 'option 8', groupId: 333 },
      { id: 9, value: 'option 9', groupId: 333 },
    ],
    groups: [
      { id: 111, value: 'Group 1' },
      { id: 222, value: 'Group 2' },
      { id: 333, value: 'Group 3' },
    ],
  };

  onChange = (selected: number[]): void => console.log(selected);

  render() {
    const { options, groups, selected } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '240px', margin: '10px', height: '250px' }}>
            <CheckableList
              defaultValues={[1, 2, 5]}
              options={options}
              groups={groups}
              onChange={this.onChange}
              selected={selected}
            />
          </div>
        </div>
      </div>
    );
  }
}

const storyGroup = storiesOf('List/Group', module);

storyGroup.add('List Grouped', () => (
  <ContainerGrouped />
));

storyGroup.add('List Iconed Grouped', () => (
  <ContainerIconedGrouped />
));

storyGroup.add('Checkable Grouped List', () => (
  <ContainerGroupedCheckable />
));
