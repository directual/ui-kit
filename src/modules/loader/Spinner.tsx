import React, { Component } from 'react';

import './Spinner.scss';

interface SpinnerProps {
  /** Spinner size can be big or small */
  size?: 'small' | 'big';
}

class Spinner extends Component<SpinnerProps> {
  static defaultProps: SpinnerProps = {
    size: 'small',
  };

  render() {
    const { size } = this.props;
    return (
      <div className={`spinner${size ? ` ${size}` : ''}`} />
    );
  }
}

export default Spinner;
