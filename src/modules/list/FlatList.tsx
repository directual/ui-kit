import React from 'react';
import cn from 'classnames';
import Option from './Option/Option';
import CheckboxOption from './Option/CheckboxOption';
import { FlatListInterface } from './types';
import styles from './list.module.scss';


const FlatList = ({
  selected = [],
  options = [],
  onChange = () => {
  },
  checkable = false,
  icon = null,
  inGroup = false,
}: FlatListInterface) => {
  const renderCheckboxes = () => options.map((option) => (
    <CheckboxOption
      key={option.id}
      className={styles['list-padding']}
      {...option}
      icon={option.icon ? option.icon : icon}
      checked={selected.includes(option.id)}
      onChange={() => onChange(option.id)}
    />
  ));

  const renderOptions = () => options.map((option) => (
    <Option
      key={option.id}
      {...option}
      icon={option.icon ? option.icon : icon}
      selected={selected.includes(option.id)}
      onClick={() => onChange(option.id)}
    />
  ));

  // If checkable render Checkboxes list otherwise Options
  return (
    <div
      className={cn(styles.list, {
        [styles.wrapper]: !inGroup,
      })}
    >
      {checkable ? renderCheckboxes() : renderOptions()}
    </div>
  );
};

export default FlatList;
