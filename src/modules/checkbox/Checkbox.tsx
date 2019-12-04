/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import cn from 'classnames';
import style from './Checkbox.module.scss';
import './Checkbox.scss';

interface CheckboxProps {
  /** Specifies whether the checkbox is selected */
  checked: boolean;
  /** The callback function that is triggered when the state changes */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Checkbox content property */
  children?: React.ReactNode | string;
  /** get focus when component mounted */
  autoFocus?: boolean;
  /** Default checked */
  defaultChecked?: boolean;
  /** Disable checkbox */
  disabled?: boolean;
  /** indeterminate checked state of checkbox */
  indeterminate: boolean;
  /** className */
  className?: string;
  /** checkbox wrapper click handler */
  onClick?: (e: any) => any;
}

class Checkbox extends Component<CheckboxProps> {
  static defaultProps: CheckboxProps = {
    autoFocus: false,
    checked: false,
    defaultChecked: false,
    disabled: false,
    indeterminate: false,
    onChange: () => {},
  };

  render() {
    const {
      className,
      checked,
      disabled,
      onChange,
      autoFocus,
      indeterminate,
      children,
    } = this.props;
    return (
      <label
        className={cn(
          'checkbox-storybook',
          style['checkbox-wrapper'],
          className,
        )}
      >
        <span className={style.checkbox}>
          <input
            type="checkbox"
            className={style['checkbox-input']}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            autoFocus={autoFocus}
          />
          <span
            className={cn(style['checkbox-inner'], {
              [style.checked]: checked,
              [style.disabled]: disabled,
              [style.indeterminate]: indeterminate,
            })}
          />
        </span>

        <span className={style['checkbox-children']}>
          {children}
        </span>
      </label>
    );
  }
}

export default Checkbox;
