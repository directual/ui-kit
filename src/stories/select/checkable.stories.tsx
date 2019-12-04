/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { storiesOf } from '@storybook/react';
import maxBy from 'lodash/maxBy';
import { SelectCheckable } from '../../export';
import { InputStatus } from '../../lib/types/types';
import { plainSearchFilter } from '../../modules/select/helpers';

const globalOptions = Array.from({ length: 5 }, (v, k) => ({ id: k, value: `Неделя ${k + 1}` }));
const optionsGroups = [
  { id: 1, value: 'Яблоки', groupId: 111 },
  { id: 2, value: 'Апельсины', groupId: 111 },
  { id: 3, value: 'Груши', groupId: 111 },
  { id: 4, value: 'Помидоры', groupId: 222 },
  { id: 5, value: 'Огурцы', groupId: 222 },
  { id: 6, value: 'Картофель', groupId: 222 },
];
const groups = [
  { id: 111, value: 'Фрукты' },
  { id: 222, value: 'Овощи' },
];

class Container extends React.Component {
  state = {
    selected: [],
    selectedGroups: [],
    options: optionsGroups,
    isLoading: false,
  };

  onChange = (key?: string) => (selected: number[]): void => {
    if (key === 'groups') {
      this.setState({
        selectedGroups: selected,
      });
      return;
    }
    this.setState({
      selected,
    });
  };

  onSearch = (searchString: string) => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({
        options: plainSearchFilter(optionsGroups, searchString),
      });
      this.setState({ isLoading: false });
    }, 3000);
  };

  onCreateNewOption = (newOptionName: string) => {
    const { options, selected } = this.state;
    const { id = 0 } = maxBy(options, 'id') || {};
    const newId = id + 1;
    this.setState({
      options: [...options, { id: id + 1, value: newOptionName }],
      selected: [...selected, newId],
    });
  };


  render() {
    const {
      selected, selectedGroups, isLoading, options,
    } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Simple</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '350px', margin: '10px' }}>
              <SelectCheckable
                options={globalOptions}
                onChange={this.onChange()}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionIds={selected}
              />
            </div>
          ))}
        </div>
        <h1>Searchable</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '350px', margin: '10px' }}>
              <SelectCheckable
                options={globalOptions}
                onChange={this.onChange()}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                searchable
                selectedOptionIds={selected}
              />
            </div>
          ))}
        </div>
        <h1>Grouped</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '350px', margin: '10px' }}>
              <SelectCheckable
                options={optionsGroups}
                groups={groups}
                onChange={this.onChange('groups')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionIds={selectedGroups}
              />
            </div>
          ))}
        </div>
        <label htmlFor="checkable-multiline">
          <h1>Checkable Multiline</h1>
        </label>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '350px', margin: '10px' }}>
              <SelectCheckable
                id="checkable-multiline"
                options={optionsGroups.map((item) => ({ ...item, multiline: 'Solve coagula' }))}
                groups={groups}
                onChange={this.onChange('groups')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionIds={selectedGroups}
              />
            </div>
          ))}
        </div>
        <h1>External search</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '350px', margin: '10px' }}>
              <SelectCheckable
                options={options.map((item) => ({ ...item, multiline: 'Solve coagula' }))}
                groups={groups}
                onChange={this.onChange('groups')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionIds={selectedGroups}
                onSearch={this.onSearch}
                isLoading={isLoading}
              />
            </div>
          ))}
        </div>
        <h1>Searchable with create new tag</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '350px', margin: '10px' }}>
              <SelectCheckable
                options={options}
                onChange={this.onChange()}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка или добавьте новый"
                selectedOptionIds={selected}
                onCreateNewOption={this.onCreateNewOption}
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
  .add('Select Checkable', () => (<Container />), {
    info: {
      inline: true,
      header: true,
      propTables: [SelectCheckable],
    }
  });
