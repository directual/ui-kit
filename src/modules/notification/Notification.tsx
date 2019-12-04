import React, { Component, ReactElement } from 'react';
import Icon from '../icon/index';
import Button from '../button/Button';

import './Notification.scss';

export interface NotificationProps {
  /** Notification type */
  type: 'error' | 'info' | 'success' | 'warning';
  /** Notification header text */
  header: string | ReactElement;
  /** Notification message */
  message: string | ReactElement;
  /** On close callback */
  onExit?: () => void;
  /** show action buttons */
  withButtons?: boolean;
  /** submit button text */
  submitText?: string;
  /** cancel button text */
  cancelText?: string;
  /** on submit callback */
  onSubmit?: () => void;
  /** on cancel callback */
  onCancel?: () => void;
  /** render buttons block */
  renderButtons?: () => any,
}

type DefaultNotificationProps = Omit<
NotificationProps,
'type' | 'header' | 'message' | 'onExit'
>;

class Notification extends Component<NotificationProps> {
  static defaultProps: DefaultNotificationProps = {
    withButtons: false,
    submitText: 'Submit',
    cancelText: 'Cancel',
    onSubmit: () => {},
    onCancel: () => {},
  };

  onExit = (): void => {
    const { onExit } = this.props;
    if (onExit) {
      onExit();
    }
  };

  onSubmit = (): void => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit();
    }
  };

  onCancel = (): void => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  render() {
    const {
      type,
      header,
      message,
      withButtons,
      submitText,
      cancelText,
      renderButtons,
      onExit,
    } = this.props;
    return (
      <div className="notification">
        <div className={`icon-wrapper icon-wrapper-main icon-wrapper-${type}`}>
          <Icon
            className={`${type} notification-icon`}
            type={`notification-${type}`}
          />
        </div>
        <p className="notification-header">{header}</p>
        <p className="notification-message">{message}</p>
        { (withButtons && !renderButtons)
          && (
          <div className="notification-button-wrapper">
            <Button
              onClick={this.onSubmit}
              className="notification-submit-button"
              type="accent"
            >
              {submitText}
            </Button>
            <Button onClick={this.onCancel}>{cancelText}</Button>
          </div>
          )}
        {renderButtons && (
          <div className="notification-button-wrapper">
            {renderButtons()}
          </div>
        )}
        {onExit
          && (
          <div className="icon-wrapper icon-wrapper-close">
            <Icon
              className="notification-exit"
              type="close"
              onClick={this.onExit}
            />
          </div>
          )}
      </div>
    );
  }
}

export default Notification;
