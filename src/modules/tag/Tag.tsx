import React, { Component } from 'react';
import cn from 'classnames';
import Icon from '../icon/index';
import { ColorGroup } from '../../lib/types/types';
import styles from './Tag.module.scss';

export interface TagProps {
  /** onClick handler */
  onClick?: () => void;
  /** onClose handler */
  onClose?: () => void;
  /** Tag inner content */
  children?: React.ReactNode;
  /** is Tag closable */
  closeable?: boolean;
  /** is Tag disabled */
  disabled?: boolean;
  /** tag wrapper classname */
  className?: string;
  /** close icon classname */
  iconClassName?: string;
  /** tag background clolor group */
  colorGroup?: ColorGroup;
  style?: React.CSSProperties;
  /** ref to set to tag wrapper (button) */
  ref?: (source: any) => any;
}

class Tag extends Component<TagProps> {
  static defaultProps: TagProps = {
    disabled: false,
    closeable: false,
    className: '',
    iconClassName: '',
    onClick: () => {},
    onClose: () => {},
    style: {},
  };

  onClose = (evt: any) => {
    if (evt) {
      evt.stopPropagation();
    }
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  render() {
    const {
      closeable,
      disabled,
      children,
      className,
      iconClassName,
      colorGroup,
      style,
      onClick,
      ref,
    } = this.props;

    const onClickHandler = (disabled === true || closeable === true)
      ? () => {}
      : onClick;

    const isTagWithIcon = closeable && !disabled;
    const setRef = (source: any) => {
      if (ref) {
        ref(source);
      }
    };
    return (
      <button
        ref={setRef}
        style={style}
        disabled={disabled}
        className={cn(
          className,
          styles.tag,
          {
            [styles['tag-default']]: !colorGroup,
            [`card-${colorGroup}`]: !!colorGroup,
            [styles['tag-with-icon']]: isTagWithIcon,
            [styles['tag-without-icon']]: !isTagWithIcon,
          },
        )}
        onClick={onClickHandler}
        type="button"
      >
        <span
          className={[
            styles['tag-text'],
            (closeable && !disabled)
              ? styles['tag-text-with-icon']
              : styles['tag-text-without-icon'],
          ].join(' ')}
        >
          {children}
        </span>

        {
          isTagWithIcon
          && (
          <Icon
            className={cn(iconClassName, styles['tag-icon'])}
            type="close"
            onClick={this.onClose}
          />
          )
        }
      </button>
    );
  }
}

export default Tag;
