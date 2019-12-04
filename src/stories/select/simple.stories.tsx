/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '../../export';
import { InputStatus } from '../../lib/types/types';
import { plainSearchFilter } from '../../modules/select/helpers';

const options = Array.from({ length: 5 }, (v, k) => ({ id: k, value: `Неделя ${k + 1}` }));
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
const optionsMultiline = [
  {
    id: 1, value: 'Красные', groupId: 111, multiline: 'В пупырышку',
  },
  {
    id: 2, value: 'Цитрусовые', groupId: 111, multiline: 'Очень спелые',
  },
  {
    id: 3, value: 'Груши', groupId: 111, multiline: 'Припущенные',
  },
  {
    id: 4, value: 'Помидоры', groupId: 222, multiline: 'Припущенные',
  },
  {
    id: 5, value: 'Огурцы', groupId: 222, multiline: 'Припущенные',
  },
  {
    id: 6, value: 'Картофель', groupId: 222, multiline: 'Припущенные',
  },
];

class Container extends React.Component {
  state = {
    selectedOptionIdSimple: null,
    selectedOptionIdSearchable: null,
    selectedOptionIdGrouped: null,
    selectedOptionIdIconed: null,
    options,
    isLoading: false,
  };

  onChange = (key: string) => (selected: number): void => {
    this.setState({
      [key]: selected,
    });
  };

  onSearch = (searchString: string) => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({
        options: plainSearchFilter(options, searchString),
      });
      this.setState({ isLoading: false });
    }, 3000);
  };

  render() {
    const {
      selectedOptionIdSimple,
      selectedOptionIdSearchable,
      selectedOptionIdGrouped,
      options: optionsState,
      selectedOptionIdIconed,
      isLoading,
    } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="some-select">
          <h1>Multiline Iconed</h1>
        </label>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <Select
                id="some-select"
                options={optionsMultiline}
                onChange={this.onChange('selectedOptionIdSimple')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка 1"
                icon="clocks"
                searchable
                groups={groups}
                selectedOptionId={selectedOptionIdSimple}
              />
            </div>
          ))}
        </div>
        <h1>Multiline</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <Select
                options={optionsMultiline}
                onChange={this.onChange('selectedOptionIdSimple')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                searchable
                groups={groups}
                selectedOptionId={selectedOptionIdSimple}
              />
            </div>
          ))}
        </div>
        <h1>Simple</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <Select
                options={options}
                onChange={this.onChange('selectedOptionIdSimple')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionId={selectedOptionIdSimple}
              />
            </div>
          ))}
        </div>
        <h1>Searchable</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <Select
                options={options}
                onChange={this.onChange('selectedOptionIdSearchable')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                searchable
                icon="clocks"
                selectedOptionId={selectedOptionIdSearchable}
              />
            </div>
          ))}
        </div>
        <h1>Grouped</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <Select
                options={optionsGroups}
                groups={groups}
                onChange={this.onChange('selectedOptionIdGrouped')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                selectedOptionId={selectedOptionIdGrouped}
              />
            </div>
          ))}
        </div>
        <h1>Iconed</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'error'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <Select
                options={options}
                onChange={this.onChange('selectedOptionIdIconed')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                placeholder="Выберите из списка"
                icon="clocks"
                selectedOptionId={selectedOptionIdIconed}
              />
            </div>
          ))}
        </div>
        <h1>External search</h1>
        <div style={{ display: 'flex' }}>
          {['default', 'disabled', 'loading'].map((status: InputStatus) => (
            <div key={status} style={{ width: '300px', margin: '10px' }}>
              <Select
                options={optionsState}
                onChange={this.onChange('selectedOptionIdIconed')}
                disabled={status === 'disabled'}
                hasError={status === 'error'}
                isLoading={isLoading}
                placeholder="Выберите из списка"
                icon="clocks"
                selectedOptionId={selectedOptionIdIconed}
                onSearch={this.onSearch}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

storiesOf('Select', module)
  .add('Select', () => (<Container />), {
    info: {
      inline: true,
      header: true,
      propTables: [Select],
    }
  });
