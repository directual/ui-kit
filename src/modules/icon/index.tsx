/* eslint-disable react/no-danger */
import React, { Component, MouseEvent } from 'react';
import './Icon.scss';

import { getSvgCollection } from './svgCollection';

const svgCollection = getSvgCollection();

type Props = {
  /** Type from list */
  type: string,
  /** Styler */
  style?: React.CSSProperties,
  /** Class name */
  className?: string,
  /** Click function */
  onClick?: (event: MouseEvent<HTMLElement>) => void,
  /** Width */
  width?: number,
  /** Height */
  height?: number,
};

class Icon extends Component<Props> {
  get style(): React.CSSProperties {
    const newStyle: React.CSSProperties = {};
    const { style, width, height } = this.props;
    if (typeof style === 'object') {
      Object.assign(newStyle, style);
    }
    if (typeof width === 'number') {
      newStyle.width = `${width}px`;
    }
    if (typeof height === 'number') {
      newStyle.height = `${height}px`;
    }
    return newStyle;
  }

  render() {
    const { className, type, onClick } = this.props;
    const svgHtml = svgCollection[type]
      ? svgCollection[type].replace('<svg', '<svg fill="currentColor"')
      : '';

    return (
      <i
        style={this.style}
        className={`${className} icon-class`}
        dangerouslySetInnerHTML={{ __html: svgHtml }}
        onClick={onClick}
      />
    );
  }
}

export default Icon;
