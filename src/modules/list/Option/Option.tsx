import React, { useState } from 'react';
import cn from 'classnames';
import { OptionInterface } from '../types';
import Icon from '../../icon';
import styles from './option.module.scss';

const Option = ({
  id,
  value = '',
  selected = false,
  icon,
  onClick,
  className = '',
  customElement,
  multiline,
  isTreeOption,
  groupId,
}: OptionInterface) => {
  const [isHovered, setHovered] = useState(false);

  const classNames = cn(styles.option, {
    [styles['option-flat']]: !multiline && !icon && !customElement,
    [styles['option-in-group']]: groupId && !multiline,
    [styles['option-in-group-multiline']]: groupId && multiline,
    [styles['option-with-icon']]: !multiline && icon && !customElement,
    [styles['option-multiline-without-icon']]: multiline && !icon && !customElement,
    [styles['option-multiline-with-icon']]: multiline && icon && !customElement,
    [styles['option-selected']]: selected,
    [styles['option-hovered']]: isHovered,
    [styles['tree-option']]: isTreeOption,
    [styles['iconed-tree-option']]: isTreeOption && icon,
  }, className);

  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => setHovered(false);
  const props = {
    className: classNames,
    onClick,
    onMouseEnter,
    onMouseLeave,
  };
  // If there is children prop render it and ignore other
  if (React.isValidElement(customElement)) {
    return (
      <span {...props}>
        {customElement}
      </span>
    );
  }

  // TODO change multiline to text from option
  const optionText = (
    <span className={styles['option-text']}>
      <span className={styles['option-value']}>{value}</span>
      {multiline && (
      <span className={styles['option-multiline']}>{multiline}</span>
      )}
    </span>
  );

  // If option has icon
  if (icon) {
    const optionIcon = icon && React.isValidElement(icon) ? icon : <Icon type={typeof icon === 'string' ? icon : ''} />;
    return (
      <button type="button" {...props}>
        <span className={styles['option-icon']}>
          {optionIcon}
        </span>
        {optionText}
      </button>
    );
  }

  // Plain option without icon
  return (
    <button type="button" {...props}>
      {optionText}
    </button>
  );
};

export default Option;
