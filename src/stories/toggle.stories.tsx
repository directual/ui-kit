import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { Toggle } from '../export';

const story = storiesOf('Toggle', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

class ToggleExample extends React.Component<{}, { value: boolean }> {
  state = {
    value: false,
  };

  style: { [key: string]: any } = {
    div: {
      style: { margin: '10px 0' },
      span: {
        style: { margin: '0 0 0 10px' },
      },
    },
  };

  onSwitch = () => {
    this.setState((prevState) => ({ value: !prevState.value }));
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <div style={this.style.div.style}>
          <Toggle onSwitch={this.onSwitch} value={value} />
          <span style={this.style.div.span.style}>
            normal &
            {' '}
            {value.toString()}
          </span>
        </div>
        <div style={this.style.div.style}>
          <Toggle onSwitch={this.onSwitch} value={!value} />
          <span style={this.style.div.span.style}>
            normal &
            {' '}
            {(!value).toString()}
          </span>
        </div>
        <div style={this.style.div.style}>
          <Toggle onSwitch={this.onSwitch} value={!value} disabled />
          <span style={this.style.div.span.style}>
            disabled &
            {' '}
            {(!value).toString()}
          </span>
        </div>
      </div>
    );
  }
}

story.add('Overview', () => (
  <ToggleExample />
));

story.add('Toggle normal & true', () => (
  <Toggle onSwitch={action('switch')} value />
));

story.add('Toggle normal & false', () => (
  <Toggle onSwitch={action('switch')} value={false} />
));

story.add('Toggle disabled & true', () => (
  <Toggle onSwitch={action('switch')} value disabled />
));
