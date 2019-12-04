/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import styles from './Handlebar.module.scss';
import Icon from '../icon';

type Props = {
  isPressed?: boolean,
  isVisible: boolean,
  onMouseOver: (evt: React.MouseEvent<HTMLDivElement>) => void,
  onMouseOut: (evt: React.MouseEvent<HTMLDivElement>) => void,
};

const Handlebar = ({
  isPressed, isVisible, onMouseOver, onMouseOut,
}: Props) => {
  const isPressedClass = isPressed ? styles.pressed : '';
  const isVisibleClass = isVisible ? styles.visible : '';
  return (
    <div
      className={`${styles.handlebar} ${isVisibleClass} ${isPressedClass} `}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div className={styles.bar} />
      <div className={styles.iconContainer}>
        <Icon type="details" />
      </div>
      <div className={styles.bar} />
    </div>
  );
};

export default Handlebar;
