import React, { Component } from 'react';
import './Tooltip.scss';

interface TooltipProps {
  /** Tooltip children */
  children: React.ReactNode;
  /** Tooltip placement */
  placement?: 'bottomLeft' | 'bottomRight';
  /** Tooltip message */
  message?: string;
}

interface TooltipState {
  show: boolean;
}

interface SelectProtected {
  tooltipWrapperNode: HTMLSpanElement,
  tooltipNode: HTMLSpanElement,
  arrowNode: HTMLSpanElement,
}

const tooltipMargin = 54;
const arrowMargin = 38;

class Tooltip extends Component<TooltipProps, TooltipState> {
  selectProtected: SelectProtected = {
    tooltipWrapperNode: document.createElement('span'),
    tooltipNode: document.createElement('span'),
    arrowNode: document.createElement('span'),
  };

  constructor(props: TooltipProps) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount(): void {
    document.addEventListener('click', this.onTooltipClick);
  }

  componentDidUpdate(): void {
    if (this.selectProtected.tooltipNode && this.selectProtected.arrowNode) {
      const width = this.selectProtected.tooltipNode.clientWidth;
      this.selectProtected.tooltipNode.style.left = `${-width + tooltipMargin}px`;
      this.selectProtected.arrowNode.style.left = `${width - arrowMargin}px`;
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.onTooltipClick);
  }

  onTooltipClick = (event: MouseEvent): void => {
    if (!event) return;

    event.stopPropagation();
    event.preventDefault();
    let path: Array<Node> = [];
    if (event.target instanceof Node) {
      path = this.getTargetArray(event.target);
    }
    const shouldShowTooltip = path.some(
      (target) => target === this.selectProtected.tooltipWrapperNode,
    );
    this.setState({ show: shouldShowTooltip });
  };

  getTargetArray = (target: Node): Array<Node> => {
    if (target) {
      if (target.parentNode) {
        return [target, ...this.getTargetArray(target.parentNode)];
      }
      return [target];
    }
    return [];
  };

  render() {
    const { placement, message, children } = this.props;
    const { show } = this.state;
    const className = show ? 'stb-tooltip' : 'stb-tooltip-hidden';
    return (
      <span
        className="stb-tooltip-wrapper"
        ref={
        (node) => {
          if (node) {
            this.selectProtected.tooltipWrapperNode = node;
          }
        }
}
      >
        { children }
        <span
          className={className}
          ref={
            (node) => {
              if (node && placement !== 'bottomRight') {
                this.selectProtected.tooltipNode = node;
              }
            }
          }
        >
          <p className="stb-tooltip-message">
            {message}
          </p>
          <span
            ref={
              (node) => {
                if (node && placement !== 'bottomRight') {
                  this.selectProtected.arrowNode = node;
                }
              }
            }
            className="arrow-up"
          />
        </span>
      </span>
    );
  }
}

export default Tooltip;
