import { MouseEvent, ReactNode } from 'react';

export type ButtonTypes = 'default' | 'accent' | 'link';

export interface ButtonProps {
  /** onClick handler */
  onClick?: (event: MouseEvent) => any;
  /** Button inner content */
  children?: ReactNode;
  /** Icon component */
  icon?: ReactNode;
  /** onClick handler */
  disabled?: boolean;
  /** Button wrapper className */
  className?: string;
  /**
   * Button type
   * @default "'default'"
   * */
  type?: ButtonTypes;
  pressed?: boolean;
}
