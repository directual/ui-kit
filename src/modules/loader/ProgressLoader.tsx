import React, { Component } from 'react';
import './ProgressLoader.scss';

interface ProgressLoaderProps {
  /** Progress from 0 to 100 */
  progress: number;
  /** Class name for progress bar */
  className?: string;
}

class ProgressLoader extends Component<ProgressLoaderProps> {
  static defaultProps: ProgressLoaderProps = {
    progress: 0,
    className: '',
  };

  render() {
    const { className, progress } = this.props;
    return (
      <div className={['progress-loader', className || ''].join(' ')}>
        <div style={{ width: `${progress}%` }} className="progress-loader-inner" />
      </div>
    );
  }
}

export default ProgressLoader;
