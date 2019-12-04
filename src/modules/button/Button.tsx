import React, { Component, MouseEvent } from 'react';
import cn from 'classnames';
import { ButtonProps } from './types';
import style from './Button.module.scss';


class Button extends Component<ButtonProps> {
  private onClick = (event: MouseEvent): void => {
    const { disabled, onClick } = this.props;
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      disabled = false,
      className = '',
      icon,
      type = 'default',
      children,
    } = this.props;

    return (
      <button
        className={cn(
          className,
          style.button,
          {
            [style.buttonIcon]: !!icon,
            [style.buttonDisabled]: disabled,
            [style.buttonAccent]: type === 'accent',
            [style.linkButton]: type === 'link',
          },
        )}
        onClick={this.onClick}
        type="button"
      >
        {icon
          && (
          <div className={style.iconWrapper}>
            {icon}
          </div>
          )}
        {children}
      </button>
    );
  }
}

export default Button;
