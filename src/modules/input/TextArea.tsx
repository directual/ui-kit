import React, { FocusEvent } from 'react';
import cn from 'classnames';
import './textarea-input.scss';
import { TextAreaProps } from './InputText';


class TextArea extends React.Component<TextAreaProps> {
  state = {
    condition: '',
  };

  onMouseEnter = () => {
    const { disabled } = this.props;
    const { condition } = this.state;
    if (disabled || condition === 'focused') return;
    this.setState({ condition: 'hovered' });
  };

  onMouseLeave = () => {
    const { disabled } = this.props;
    const { condition } = this.state;
    if (disabled || condition === 'focused') return;
    this.setState({ condition: '' });
  };

  onFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    const { disabled, onFocus } = this.props;
    if (disabled) return;
    if (typeof onFocus === 'function') {
      onFocus(event);
    }
    this.setState({ condition: 'focused' });
  };

  onBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    const { disabled, onBlur } = this.props;
    if (disabled) return;
    if (typeof onBlur === 'function') {
      onBlur(event);
    }
    this.setState({ condition: '' });
  };

  render() {
    const {
      value = '',
      placeholder = '',
      rows = 5,
      disabled,
      status,
      ...rest
    } = this.props;

    // eslint-disable-next-line react/destructuring-assignment
    const condition = (status && !disabled) ? status : this.state.condition;

    const className = cn('textarea-input', {
      'textarea-input-disabled': disabled,
      [`textarea-input-${condition}`]: condition,
    });

    return (
      <span
        className={className}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {value.length === 0 && (
          <span className="text-input-placeholder">
            {placeholder}
          </span>
        )}
        <textarea
          disabled={disabled}
          value={value}
          rows={rows}
          {...rest}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </span>
    );
  }
}

export default TextArea;
