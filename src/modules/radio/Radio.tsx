/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import style from './Radio.module.scss';
import { RadioProps } from './types';

class Radio extends Component<RadioProps> {
  static defaultProps: RadioProps = {
    autoFocus: false,
    checked: false,
    defaultChecked: false,
    disabled: false,
    value: null,
  };

  render() {
    const {
      disabled,
      value,
      checked,
      autoFocus,
      name,
      children,
    } = this.props;
    return (
      <>
        <label className={style['radio-wrapper']}>
          <span className={style.radio}>
            <input
              type="radio"
              disabled={disabled}
              value={value}
              checked={checked}
              autoFocus={autoFocus}
              name={name || ''}
            />
          </span>
          <span>{children}</span>
        </label>
      </>
    );
  }
}

export default Radio;
