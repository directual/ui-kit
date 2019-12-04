import React from 'react';
import { storiesOf } from '@storybook/react';

import { Input, TextArea } from '../export';
import { InputStatus } from '../lib/types/types';


class ContainerInput extends React.Component {
  placeholder: string = 'placeholder';

  state = {
    value: 'awesome text',
    status: '' as InputStatus,
  };

  onChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    let status: InputStatus = '';
    if (event.target.value.length > 8) {
      status = 'error';
    } else if (event.target.value.length > 3) {
      status = 'verified';
    }
    this.setState({ value: event.target.value, status });
  };

  onClear = () => {
    this.setState({ value: '', status: 'error' });
  };

  render() {
    const { value, status } = this.state;
    return (
      <div style={{ width: 400 }}>
        <br />
        <Input
          value={value}
          placeholder={this.placeholder}
          onChange={this.onChange}
          onClear={this.onClear}
          status={status}
        />
        <br />
        <Input
          value={value}
          placeholder="search"
          searchable
          loading
          onChange={this.onChange}
          onClear={this.onClear}
          status={status}
        />
        <br />
        <Input
          value={value}
          placeholder={this.placeholder}
          searchable
          onChange={this.onChange}
          onClear={this.onClear}
          disabled
          status={status}
        />
        <br />
        <TextArea
          value={value}
          placeholder="placeholder"
          onChange={this.onChange}
          status={status}
          rows={5}
        />
      </div>
    );
  }
}

storiesOf('Input', module)
  .add('Input', () => (<ContainerInput />), {
    info: {
      inline: true,
      header: true,
      propTables: [Input],
    }
  });
