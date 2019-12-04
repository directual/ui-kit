import React, { Component } from 'react';
import { DraggableCore, DraggableData } from 'react-draggable';
import styles from './SidePanel.module.scss';


interface SidePanelResizableProps {
  /** Inner content */
  children?: React.ReactNode,
  /** Icon to show in left corner */
  icon?: React.ReactNode,
  /** Handle for component resize */
  handle?: React.ReactNode,
  /** Initial width for panel */
  initWidth: number,
  /** Min panel width */
  minWidth: number,
  /** Max panel width */
  maxWidth: number,
  /** Handler triggers when drag start */
  onDragStart: (e: React.MouseEvent<HTMLElement>, data: DraggableData) => void;
  /** Handler triggers when drag end */
  onDragEnd: (e: React.MouseEvent<HTMLElement>, data: DraggableData) => void;
}

interface RefObject {
  current: any,
}

class SidePanelResizable extends Component<SidePanelResizableProps> {
  resizableContainer: RefObject;

  ticking = false;

  constructor(props: SidePanelResizableProps) {
    super(props);
    this.resizableContainer = React.createRef();
  }

  componentDidMount(): void {
    const { initWidth } = this.props;
    const validInitWidth = this.getValidWidth(initWidth);
    this.resizableContainer.current.style.width = `${validInitWidth}px`;
  }

  onDragStart = (e: React.MouseEvent<HTMLElement>, data: DraggableData): void => {
    const { onDragStart } = this.props;
    onDragStart(e, data);
  };

  getValidWidth = (newWidth: number): number => {
    const { maxWidth, minWidth } = this.props;
    if (newWidth > maxWidth) {
      return maxWidth;
    }
    if (newWidth < minWidth) {
      return minWidth;
    }
    return newWidth;
  };

  calculatePanelWidth = (data: DraggableData): number => {
    const newWidth = parseInt(this.resizableContainer.current.style.width, 10) - data.x;
    return this.getValidWidth(newWidth);
  };

  onDragging = (e: React.MouseEvent<HTMLElement>, data: DraggableData): void => {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        const newWidth = this.calculatePanelWidth(data);
        this.resizableContainer.current.style.width = `${newWidth}px`;
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  onDragStop = (e: React.MouseEvent<HTMLElement>, data: DraggableData): void => {
    const { onDragEnd } = this.props;
    onDragEnd(e, data);
  };

  renderDragHandler = () => {
    const { handle } = this.props;
    return (
      <DraggableCore
        key="resizableHandle"
        onStart={this.onDragStart}
        onDrag={this.onDragging}
        onStop={this.onDragStop}
      >
        <div className={`handle ${styles.handle}`}>
          {handle}
        </div>
      </DraggableCore>
    );
  };

  render() {
    const { children, icon } = this.props;
    return (
      <div className={styles.sidePanel} ref={this.resizableContainer}>
        <div className={styles.contentBlock}>
          {children}
        </div>
        <div className={styles.iconContainer}>
          {icon}
        </div>
        {this.renderDragHandler()}
      </div>
    );
  }
}

export default SidePanelResizable;
