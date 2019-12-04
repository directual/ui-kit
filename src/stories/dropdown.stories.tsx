// eslint-disable-next-line max-classes-per-file
import React from 'react';

import { storiesOf } from '@storybook/react';
import {
  Icon, Dropdown, List, CheckableList, Button,
} from '../export';

type Props = {};

type State = {
  selected?: Set<number>;
  options?: Array<{ id: number, value: string }>;
  isDropdownDropped?: boolean;
};

class ContainerCheckable extends React.Component<Props, State> {
  state = {
    isDropdownDropped: false,
  };

  onToggle = () => {
    const { isDropdownDropped } = this.state;
    this.setState({
      isDropdownDropped: !isDropdownDropped,
    });
  };

  render() {
    const options = Array.from({ length: 10 }, (v, k) => ({ id: k, value: `option ${k}` }));
    const overlay = (
      <CheckableList
        options={options}
      />
    );
    const { isDropdownDropped } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ margin: '10px' }}>
            <Dropdown
              overlay={overlay}
              overlayStyle={{
                left: 0,
                top: '50px',
                width: 240,
              }}
              isDropped={isDropdownDropped}
              onToggle={this.onToggle}
            >
              <Button type="accent">Dropdown</Button>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

class DropdownContainer extends React.Component<Props, State> {
  placeholder: string = '';

  state = {
    isDropdownDropped: false,
  };

  closeDropdown = () => {
    this.setState({
      isDropdownDropped: false,
    });
  };

  onToggle = () => {
    const { isDropdownDropped } = this.state;
    this.setState({
      isDropdownDropped: !isDropdownDropped,
    });
  };

  render() {
    const options = [
      { id: 1, value: 'option 1', groupId: 111 },
      { id: 2, value: 'option 2', groupId: 111 },
      { id: 3, value: 'option 3', groupId: 111 },
      { id: 4, value: 'option 4', groupId: 222 },
      { id: 5, value: 'option 5', groupId: 222 },
      { id: 6, value: 'option 6', groupId: 222 },
    ];
    const groups = [
      { id: 111, value: 'Group 1' },
      { id: 222, value: 'Group 2' },
    ];

    const overlay = (
      <List
        options={options}
        groups={groups}
        onChange={this.closeDropdown}
      />
    );

    const { isDropdownDropped } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', width: 32 }}>
          <Dropdown
            overlay={overlay}
            style={{
              top: 270,
              left: 270,
            }}
            overlayStyle={{
              right: 32,
              bottom: 0,
              width: 240,
            }}
            isDropped={isDropdownDropped}
            onToggle={this.onToggle}
          >
            <Icon type="details" />
          </Dropdown>
        </div>

      </div>
    );
  }
}

const storyFlat = storiesOf('Dropdown', module);

storyFlat.add('Checkable List from button', () => (
  <ContainerCheckable />
));

storyFlat.add('Dropdown from icon', () => (
  <DropdownContainer />
));
