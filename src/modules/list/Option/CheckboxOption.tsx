import React from 'react';
import cn from 'classnames';

import Checkbox from '../../checkbox/Checkbox';
import { OptionInterface } from '../types';
import styles from './option.module.scss';


const CheckboxOption = ({
  id,
  value = '',
  checked = false,
  onChange,
  className = '',
  multiline,
  isTreeOption,
  indeterminate = false,
}: OptionInterface & { indeterminate?: boolean }) => {
  const classNames = cn(className, styles['checkbox-option'], {
    [styles['checkbox-option_multiline']]: multiline,
    [styles['tree-option']]: isTreeOption,
  });

  return (
    <Checkbox
      key={id}
      checked={checked}
      onChange={onChange}
      className={classNames}
      indeterminate={indeterminate}
    >
      <span
        className={cn({
          [styles['multiline-content']]: multiline,
        })}
      >
        <span>{value}</span>
        {
          multiline && (
            <span className={styles['multiline-text']}>
              {multiline}
            </span>
          )
        }
      </span>
    </Checkbox>
  );
};

export default CheckboxOption;
