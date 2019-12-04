import cn from 'classnames';
import React from 'react';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import styles from '../Select/select.module.scss';
import Icon from '../../icon';
import { STATUS_FOCUSED } from '../SelectBase/SelectBase';
import { SelectSimpleOptionProps } from '../types';


const SelectSimpleOption = ({
  icon,
  searchable,
  currentStatus,
  selectedOptionId,
  searchString,
  selectedOptionValue,
  placeholder,
}: SelectSimpleOptionProps) => {
  let optionIcon: string | React.ReactNode = null;
  if (icon) {
    optionIcon = (
      <span className={styles['selected-option-icon']}>
        {icon && React.isValidElement(icon) ? icon : <Icon type={String(icon)} />}
      </span>
    );
  }
  const showSelectedOption = (searchable && currentStatus !== STATUS_FOCUSED)
    || (!searchable && !isNull(selectedOptionId));
  const showPlaceholder = isNull(selectedOptionId) && isEmpty(searchString);

  return (
    <>
      {showSelectedOption && (
        <span className={
          cn(styles['selected-option'],
            {
              [styles['selected-with-icon']]: optionIcon,
            })
        }
        >
          { optionIcon }
          { selectedOptionValue }
        </span>
      )}
      {showPlaceholder && (
        <span className={
          cn(styles.placeholder,
            {
              [styles['selected-with-icon']]: optionIcon,
            })
        }
        >
          { optionIcon }
          { placeholder }
        </span>
      )}
    </>
  );
};

export default SelectSimpleOption;
