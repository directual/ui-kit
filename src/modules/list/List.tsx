import React from 'react';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import cn from 'classnames';
import FlatList from './FlatList';
import { ListInterface } from './types';
import styles from './list.module.scss';
import optionStyles from './Option/option.module.scss';


const List = ({
  selected = [],
  options = [],
  onChange = (arg: string | number) => {},
  checkable = false,
  icon = null,
  groups = [],
}: ListInterface) => {
  // Grouped list render
  if (!isEmpty(groups) && isArray(groups)) {
    return (
      <div className={cn(styles.list, styles.wrapper)}>
        {groups.map((group) => (
          <>
            <span className={optionStyles['option-group-name']}>{group.value}</span>
            <FlatList
              selected={selected}
              options={options.filter(({ groupId }) => String(groupId) === String(group.id))}
              onChange={onChange}
              checkable={checkable}
              icon={icon}
              inGroup
            />
          </>
        ))}
      </div>
    );
  }

  return (
    <FlatList
      selected={selected}
      options={options}
      onChange={onChange}
      checkable={checkable}
      icon={icon}
    />
  );
};

export default List;
