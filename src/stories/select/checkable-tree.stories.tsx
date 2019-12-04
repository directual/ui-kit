/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { SelectTree } from '../../export';
import SelectCheckableTree from '../../modules/select/SelectCheckableTree/SelectCheckableTree';
import { InputStatus } from '../../lib/types/types';

const options = [
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
];
const groups = [
  { id: 111, value: 'Фрукты' },
  { id: 222, value: 'Group 2' },
  { id: 333, value: 'Group 3' },
];

type State = {
  selected: (number | string)[];
};

class CheckableTree extends React.Component<{}, State> {
  placeholder: string = 'Выберите из списка';

  state = {
    selected: [],
  };

  render() {
    const { selected } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="select-checkable-tree">
          <h1>Select Checkable Tree</h1>
        </label>

        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <SelectCheckableTree
                id="select-checkable-tree"
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                selectedOptionIds={selected}
                options={options}
                groups={groups}
                onChange={(sel: string[]) => this.setState({ selected: sel })}
                placeholder="Выберите из списка"
              />
            </div>
          ))}
        </div>
        <h1>Select Checkable Tree Searchable</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <SelectCheckableTree
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                selectedOptionIds={selected}
                options={options}
                groups={groups}
                onChange={(sel: string[]) => this.setState({ selected: sel })}
                placeholder="Выберите из списка"
                searchable
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

storiesOf('Select', module)
  .add('Select Checkable Tree', () => (<CheckableTree />), {
    info: {
      inline: true,
      header: true,
      propTables: [SelectTree],
    }
  });
