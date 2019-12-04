/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { RadioGroupProps } from './types';

class RadioGroup extends Component<RadioGroupProps> {
  name: string | number;

  static defaultProps: RadioGroupProps = {
    disabled: false,
    name: '',
    onChange: () => {},
    value: null,
  };

  constructor(props: RadioGroupProps) {
    super(props);
    const { name } = this.props;
    this.name = name || new Date().getUTCMilliseconds();
  }

  render() {
    let children = null;
    const {
      value,
      disabled,
      onChange,
    } = this.props;
    if (this.props.children) {
      children = React.Children.map(this.props.children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement((child as React.ReactElement<any>), {
            // eslint-disable-next-line eqeqeq
            checked: value == child.props.value,
            name: this.name,
            disabled: !!(child.props.disabled || disabled),
          });
        }
        return null;
      });
    }

    return (
      <div
        onChange={onChange}
      >
        { children }
      </div>
    );
  }
}

export default RadioGroup;
