/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { SelectTree } from '../../export';
import { InputStatus } from '../../lib/types/types';

const simpleOptions = [
  {
    id: 1, value: 'Красные', parentId: null, icon: 'babai',
  },
  {
    id: 2, value: 'Красные', parentId: 1, icon: 'clocks',
  },
  { id: 3, value: 'Апельсины', parentId: 2 },
  { id: 4, value: 'option 4', parentId: null },
  { id: 5, value: 'option 5', parentId: 4 },
  { id: 6, value: 'option 6', parentId: 4 },
  { id: 7, value: 'option 7', parentId: 5 },
  { id: 8, value: 'option 8', parentId: 5 },
  { id: 9, value: 'option 9', parentId: null },
];

class Container extends React.Component {
  state = {
    selected: null,
    options: [
      {
        id: 1, value: 'Красные', groupId: 111, parentId: null, icon: 'babai',
      },
      {
        id: 2, value: 'Красные', groupId: 111, parentId: 1, icon: 'clocks',
      },
      {
        id: 3, value: 'Апельсины', groupId: 111, parentId: 2,
      },
      {
        id: 4, value: 'option 4', groupId: 222, parentId: null,
      },
      {
        id: 5, value: 'option 5', groupId: 222, parentId: 4,
      },
      {
        id: 6, value: 'option 6', groupId: 222, parentId: 4,
      },
      {
        id: 7, value: 'option 7', groupId: 222, parentId: 5,
      },
      {
        id: 8, value: 'option 8', groupId: 222, parentId: 5,
      },
      {
        id: 9, value: 'option 9', groupId: 333, parentId: null,
      },
      { id: 10, value: 'option no group 10', parentId: null },
      {
        id: 11, value: 'option no group 11', groupId: 555, parentId: null,
      },
    ],
    groups: [
      { id: 111, value: 'Фрукты' },
      { id: 222, value: 'Group 2' },
      { id: 333, value: 'Group 3' },
    ],
  };

  handleChange = (optionId: number | string) => {
    this.setState({ selected: optionId });
  };


  render() {
    const { selected, groups, options } = this.state;
    return (
      <>
        <label htmlFor="simple-select-tree">
          <h1>Simple select tree</h1>
        </label>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <SelectTree
                id="simple-select-tree"
                options={simpleOptions}
                onChange={this.handleChange}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionId={selected}
              />
            </div>
          ))}
        </div>
        <h1>Searchable</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <SelectTree
                options={simpleOptions}
                onChange={this.handleChange}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionId={selected}
                searchable
              />
            </div>
          ))}
        </div>
        <h1>Leaves only selectable</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <SelectTree
                options={simpleOptions}
                onChange={this.handleChange}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionId={selected}
                isLeavesOnlySelectable
              />
            </div>
          ))}
        </div>
        <h1>Grouped</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <SelectTree
                groups={groups}
                options={options}
                onChange={this.handleChange}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionId={selected}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

storiesOf('Select', module)
  .add('Select Tree', () => (<Container />), {
    info: {
      inline: true,
      header: true,
      propTables: [SelectTree],
    }
  });
