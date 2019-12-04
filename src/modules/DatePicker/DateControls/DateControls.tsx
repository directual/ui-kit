import React from 'react';

import Button from '../../button/Button';
import IconButton from '../../button/IconButton';

import styles from './DateControls.module.scss';


type IProps = {
  activeDateString: string;
  onPrevClick: () => void;
  onNextClick: () => void;
  onActiveClick?: () => any;
};

const DateControls: React.FC<IProps> = ({
  activeDateString,
  onPrevClick,
  onNextClick,
  onActiveClick,
}) => (
  <div className={styles['date-controls']}>
    <IconButton
      onClick={onPrevClick}
      icon="back"
    />

    <Button
      type="link"
      onClick={onActiveClick}
    >
      {activeDateString}
    </Button>

    <IconButton
      onClick={onNextClick}
      icon="forward"
    />
  </div>
);

export default DateControls;
