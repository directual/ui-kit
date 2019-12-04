import React, { Component } from 'react';
import Icon from '../icon/index';

import style from './IconButton.module.scss';

type IconButtonProps = {
  onClick: () => void;
  icon: string;
  disabled?: boolean;
  className?: string;
};

class IconButton extends Component<IconButtonProps> {
  static defaultProps: Pick<IconButtonProps, 'disabled' | 'className'> = {
    disabled: false,
    className: '',
  };

  onClick = (): void => {
    const { disabled, onClick } = this.props;
    if (!disabled && onClick) {
      onClick();
    }
  };

  render() {
    const { className = '', disabled, icon } = this.props;
    return (
      <button
        className={`${className} ${style.iconButton} ${disabled ? style.buttonDisabled : ''}`}
        onClick={this.onClick}
        type="button"
      >
        <div className={style.buttonIconWrapper}>
          <Icon type={icon} />
        </div>
      </button>
    );
  }
}

export default IconButton;
