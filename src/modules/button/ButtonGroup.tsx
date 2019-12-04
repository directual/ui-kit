import React from 'react';
import cn from 'classnames';
import style from './ButtonGroup.module.scss';


type ButtonGroupProps = {
  /** Icons buttons as a children */
  children?: React.ReactNode;
  /** class name for button group */
  className?: string;
};

const ButtonGroup = ({ className = '', children = null }: ButtonGroupProps) => (
  <span className={cn(className, style.buttonGroup)}>
    {children}
  </span>
);

export default ButtonGroup;
