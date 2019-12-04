// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { storiesOf } from '@storybook/react';
import { List, CheckableList } from '../../export';
import { OptionInterface } from '../../modules/list/types';


const makeOptionsMultiline = (options: OptionInterface[]): OptionInterface[] => options.map((opt: OptionInterface) => ({ ...opt, multiline: 'multiline text here' }));

interface Props {
  multiline?: boolean;
}

interface State {
  selected: Array<number>;
  options: Array<{ id: number, value: string }>;
}

class Container extends React.Component<Props, State> {
  state = {
    selected: [],
    options: Array.from({ length: 10 }, (v, k) => ({ id: k, value: `option ${k}` })),
  };

  onChange = (selected: number): void => {
    this.setState({ selected: [selected] });
  };

  render() {
    const { selected, options } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '240px', margin: '10px', height: '250px' }}>
            <List
              selected={selected}
              options={options}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ContainerIconed extends React.Component<Props, State> {
  state = {
    selected: [],
    options: Array.from({ length: 10 }, (v, k) => ({ id: k, value: `option ${k}` })),
  };

  onChange = (selected: number): void => {
    this.setState({ selected: [selected] });
  };


  render() {
    const { multiline } = this.props;
    const { options, selected } = this.state;
    const optionsToRender = multiline
      ? makeOptionsMultiline(options)
      : options;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '240px', margin: '10px', height: '250px' }}>
            <List
              icon="clocks"
              selected={selected}
              options={optionsToRender}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ContainerCheck extends React.Component<Props, State> {
  state = {
    selected: [],
    options: Array.from({ length: 10 }, (v, k) => ({ id: k, value: `option ${k}` })),
  };

  onChange = (selected: number[]): void => console.log(selected);

  render() {
    const { multiline } = this.props;
    const { options, selected } = this.state;
    const optionsToRender = multiline
      ? makeOptionsMultiline(options)
      : options;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '240px', height: '250px', margin: '10px' }}>
            <CheckableList
              selected={selected}
              options={optionsToRender}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const storyFlat = storiesOf('List/Flat', module);

storyFlat.add('List', () => (
  <Container />
));

storyFlat.add('List Iconed', () => (
  <ContainerIconed />
));

storyFlat.add('List Checkable', () => (
  <ContainerCheck />
));

storyFlat.add('List multiline', () => (
  <ContainerIconed multiline />
));

storyFlat.add('List checkable multiline', () => (
  <ContainerCheck multiline />
));
