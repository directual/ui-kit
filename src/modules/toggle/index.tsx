import React from 'react';
import './index.scss';

interface Props {
  /** onSwitch handler */
  onSwitch: () => void;
  /** Toggle value */
  value: boolean;
  /** is Toggle disabled */
  disabled?: boolean;
}

class Toggle extends React.Component<Props> {
  onSwitch = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.stopPropagation();
    const { onSwitch } = this.props;
    onSwitch();
  };

  render(): React.ReactNode {
    const {
      value,
      disabled,
    } = this.props;
    return (
      <button
        className={`toggle toggle-${value ? 'on' : 'off'}${disabled ? ' toggle-disabled' : ''}`}
        onClick={this.onSwitch}
        disabled={disabled}
        type="button"
      >
        <span className="toggle-thumb" />
      </button>
    );
  }
}

export default Toggle;
