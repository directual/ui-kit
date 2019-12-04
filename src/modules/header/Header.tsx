import React from 'react';
import cn from 'classnames';
import Badge from '../badge/Badge';
import styles from './header.module.scss';

type Props = {
  /** Header content */
  children: React.ReactNode;
  /** header wrapper className */
  className?: string;
  /** header badge count value */
  count?: number;
  /** header badge overflow value */
  overflowCount?: number;
  /** Badge background color */
  color?: string;
};

const Header = ({
  children,
  count,
  color,
  className = '',
  overflowCount = 999,
}: Props) => (
  <span className={cn(styles.header, className)}>
    <span className={cn(styles.headerInner, 'Header_32-40_Black')}>{children}</span>
    { count
      ? (
        <Badge
          className={styles.headerBadge}
          count={count}
          color={color}
          overflowCount={overflowCount}
        />
      )
      : null}
  </span>
);

export default Header;
