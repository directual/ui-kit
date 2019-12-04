import React, { Component } from 'react';
import cn from 'classnames';

import './Alert.scss';
import '../../lib/styles/default.css';
import Icon from '../icon/index';

type alertType = 'info'| 'warning' | 'error' | 'default';

interface AlertProps {
  /** Alert header. * */
  header?: string;
  /** Alert message. * */
  message?: string;
  /** Alert type */
  type?: alertType;
  /** Icon type string * */
  iconType?: string;
  /** Is alert closable. * */
  closeable?: boolean;
  /** onClose callback function. * */
  onClose?: () => void;
  /** className * */
  className?: string;
}

class Alert extends Component<AlertProps> {
  static defaultProps: AlertProps = {
    type: 'default',
    header: '',
    message: '',
    closeable: false,
    className: '',
    onClose: () => {},
  };

  onClose = () => {
    const { closeable, onClose } = this.props;
    if (closeable && onClose) {
      onClose();
    }
  };

  get iconType(): string {
    const { iconType, type } = this.props;

    if (iconType) {
      return iconType;
    }

    switch (type) {
      case 'warning':
        return 'warning';
      case 'error':
        return 'warning';
      case 'info':
        return 'info';
      case 'default':
        return 'clocks';
      default:
        return '';
    }
  }

  render() {
    const {
      type, className, closeable, message, header,
    } = this.props;
    return (
      <div className={cn('alert-body', `${type}-alert`, className)}>
        <div
          className="alert-icon alert-icon-main"
        >
          <Icon
            className="className"
            type={this.iconType}
          />
        </div>
        <div className="alert-text-block">
          <span className="alert-header">{header}</span>
          <span className="alert-text">{message}</span>
        </div>
        <div className="alert-icon alert-icon-close">
          {closeable && (
            <Icon
              className="className"
              type="close"
              onClick={this.onClose}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Alert;
