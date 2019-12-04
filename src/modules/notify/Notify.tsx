import React, { ReactElement } from 'react';
import { toast, ToastOptions, cssTransition } from 'react-toastify';
import './notify.scss';
import Notification from '../notification/Notification';

const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: 50,
});

toast.configure();

interface NotifyProps {
  type?: 'error' | 'info' | 'success' | 'warning';
  /** Notification header text */
  header: string | ReactElement;
  /** Notification message */
  message?: string | ReactElement;
  /** on submit callback */
  onSubmit?: () => void;
  /** on cancel callback */
  onCancel?: () => void;
  /** show action buttons */
  withButtons?: boolean;
  /** submit button text */
  submitText?: string;
  /** cancel button text */
  cancelText?: string;
  /** render buttons block */
  renderButtons?: (closeToast: () => void) => ReactElement,
  onOpen?: () => void,
  onClose?: () => void,
}

const DEFAULT_CLOSE_DELAY = 5000;

const notify = ({
  type = 'info',
  header = '',
  message = '',
  onSubmit = () => {},
  onCancel = () => {},
  withButtons = false,
  submitText,
  cancelText,
  renderButtons,
  onOpen = () => {},
  onClose = () => {},
}: NotifyProps, {
  transition = Zoom,
  closeButton = false,
  hideProgressBar = true,
  closeOnClick,
  autoClose,
  delay,
  pauseOnHover,
}: ToastOptions = {}) => {
  let closeOnClickEnabled = true;
  let autoCloseEnabled: boolean | number = DEFAULT_CLOSE_DELAY;

  if (withButtons || renderButtons) {
    closeOnClickEnabled = false;
    autoCloseEnabled = false;
  }

  const renderToast = ({ closeToast }: any) => (
    <Notification
      type={type}
      onExit={closeButton ? () => {
        onCancel();
        closeToast();
      } : undefined}
      header={header}
      message={message}
      onSubmit={() => {
        onSubmit();
        closeToast();
      }}
      onCancel={() => {
        onCancel();
        closeToast();
      }}
      withButtons={withButtons}
      submitText={submitText}
      cancelText={cancelText}
      renderButtons={renderButtons ? () => renderButtons(closeToast) : undefined}
    />
  );

  toast(renderToast, {
    transition,
    closeButton,
    hideProgressBar,
    autoClose: autoClose !== undefined ? autoClose : autoCloseEnabled,
    closeOnClick: closeOnClick !== undefined ? closeOnClick : closeOnClickEnabled,
    delay,
    pauseOnHover,
    onOpen,
    onClose,
  });
};

export default notify;
