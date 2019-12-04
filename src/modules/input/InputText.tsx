/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { RefObject, FocusEvent } from 'react';
import cn from 'classnames';
import Icon from '../icon';
import Spinner from '../loader/Spinner';
import './text-input.scss';
import { InputStatus } from '../../lib/types/types';

type InputType = 'text' | 'password';

export interface InputBaseProps {
  value: string,
  type?: InputType,
  disabled?: boolean,
  placeholder?: string,
  className?: string,
  loading?: boolean,
  searchable?: boolean,
  status?: InputStatus,
  onClear?: () => any,
  readOnly?: boolean,
  forwardRef?: string | ((arg: HTMLInputElement | null) => void) | RefObject<HTMLInputElement>,

  // TODO: specify ...rest props
  [key: string]: any,
}

export interface InputTextProps extends InputBaseProps {
  onFocus?: (evt: FocusEvent<HTMLInputElement>) => any,
  onBlur?: (evt: FocusEvent<HTMLInputElement>) => any,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any,
}

export interface TextAreaProps extends InputBaseProps {
  rows?: number,
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => any,
  onBlur?: (evt: FocusEvent<HTMLTextAreaElement>) => any,
  onFocus?: (evt: FocusEvent<HTMLTextAreaElement>) => any,
}

interface InputTextState {
  status: InputStatus,
}

class InputText extends React.Component<InputTextProps, InputTextState> {
  static defaultProps: Omit<InputTextProps,
  'value' | 'onChange' | 'onClear' | 'onBlur' | 'onFocus'> = {
    type: 'text',
    disabled: false,
    placeholder: '',
    className: '',
    loading: false,
    searchable: false,
    status: '',
  };

  state = {
    status: '' as InputStatus,
  };

  onMouseEnter = () => {
    const { disabled } = this.props;
    const { status } = this.state;
    if (disabled || status === 'focused') return;
    this.setState({ status: 'hovered' });
  };

  onMouseLeave = () => {
    const { disabled } = this.props;
    const { status } = this.state;
    if (disabled || status === 'focused') return;
    this.setState({ status: '' });
  };

  onFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { disabled, onFocus } = this.props;
    if (disabled) return;
    if (typeof onFocus === 'function') {
      onFocus(event);
    }
    this.setState({ status: 'focused' });
  };

  onBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { disabled, onBlur } = this.props;
    if (disabled) return;
    if (typeof onBlur === 'function') {
      onBlur(event);
    }
    this.setState({ status: '' });
  };

  render() {
    const {
      value = '',
      disabled,
      status,
      placeholder = '',
      className = '',
      onChange,
      type = 'text',
      loading = false,
      searchable = false,
      onClear = null,
      readOnly = false,
      forwardRef = null,
      ...rest
    } = this.props;

    const condition = (status && !disabled)
      ? status
      // eslint-disable-next-line react/destructuring-assignment
      : this.state.status;

    const classNames = cn('str-text-input', {
      'text-input-disabled': disabled,
      [`text-input-${condition}`]: condition,
    }, className);

    const searchClassNames = cn('search', {
      'color-secondary': condition === 'hovered',
    });

    const inputClassNames = cn('input-text-reset', {
      'text-input-read-only': readOnly,
    });

    return (
      <label
        className={classNames}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={(e: React.MouseEvent<any>) => {
          const element = e.target as HTMLElement;
          if (element.tagName === 'LABEL') {
            e.stopPropagation();
          }
        }}
      >
        {value.length === 0 && (
          <span className="text-input-placeholder">
            {searchable && condition !== 'focused'
          && (
            <span className={searchClassNames}>
              <Icon type="search" />
            </span>
          )}
            {placeholder}
          </span>
        )}
        <input
          value={value}
          disabled={disabled}
          type={type}
          onChange={onChange}
          readOnly={readOnly}
          {...rest}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={inputClassNames}
          ref={forwardRef}
        />
        {!disabled && (value.length > 0 || loading) && (
          <span className="close">
            {loading && <span className="input-spinner-wrapper"><Spinner size="big" /></span>}
            {(value.length > 0 && !!onClear) && <span className="input-icon-wrapper" onClick={onClear}><Icon type="close" /></span>}
          </span>
        )}
      </label>
    );
  }
}

export default InputText;
