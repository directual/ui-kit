import React from 'react';
import cn from 'classnames';
import styles from './SidePanel.module.scss';
import Icon from '../icon';

interface SidePanelProps {
  /** Inner content */
  children?: React.ReactNode,
  /** Width of panel */
  width: number,
  /** Class name */
  className?: string,
  /** Is showned */
  show: boolean,
  /** onClose handler */
  onClose: (e: React.MouseEvent<HTMLElement>) => void,
}

const SidePanel = ({
  width,
  show = false,
  onClose,
  children,
  className,
}: SidePanelProps) => (
  <div
    className={cn(
      className,
      styles.sidePanel,
      { [styles.sidePanelHidden]: !show },
    )}
    style={{ width: `${width}px` }}
  >
    <div className={cn(styles.contentBlock)}>
      {children}
    </div>
    <div className={cn(styles.iconContainer)}>
      <Icon type="close" onClick={onClose} />
    </div>
  </div>
);

export default SidePanel;
