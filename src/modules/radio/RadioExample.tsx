import React, { Component } from 'react';
import Radio from './Radio';
import RadioGroup from './RadioGroup';

interface Props {}

interface State {
  value: number | string;
}

class RadioExample extends Component<Props, State> {
  state = {
    value: 1,
  };

  onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: evt.target.value,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <>
        <RadioGroup
          onChange={this.onChange}
          value={value}
        >
          <Radio value={1}>Frontend</Radio>
          <Radio value={2}>Backend</Radio>
          <Radio value={3}>Dev Ops</Radio>
          <Radio disabled value={4}>???</Radio>
        </RadioGroup>
      </>
    );
  }
}

export default RadioExample;
