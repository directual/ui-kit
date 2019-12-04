import React, { Component } from 'react';
import './SimpleLoader.scss';

interface SimpleLoaderProps {
  /** Class name for progress bar */
  className?: string;
}

class SimpleLoader extends Component<SimpleLoaderProps> {
  static defaultProps: SimpleLoaderProps = {
    className: '',
  };

  render() {
    const { className } = this.props;
    return (
      <div className={`loader${className ? ` ${className}` : ''}`} />
    );
  }
}

export default SimpleLoader;
