import React from 'react';
import cn from 'classnames';
import styles from './badge.module.scss';

type BadgeProps = {
  /** count value */
  count: number;
  /** Content to be wrapped by Badge */
  children?: React.ReactNode;
  /** Showned number on overflow */
  overflowCount?: number;
  /** className */
  className?: string;
  /** Badge background color */
  color?: string;
};

const Badge = ({
  count,
  children,
  color = '',
  className = '',
  overflowCount = 999,
}: BadgeProps) => (
  <div className={cn(styles.badge, className)}>
    {children}
    <sup
      className={cn(styles.badgeCount, { [styles.relative]: children })}
      style={{ backgroundColor: color }}
    >
      <span className={styles.text}>
        {
          count > overflowCount
            ? `${overflowCount}+`
            : count
        }
      </span>
    </sup>
  </div>
);

export default Badge;
