import React, { useState, useRef, FocusEvent } from 'react';
import cn from 'classnames';
import Dropdown, { TOGGLE_SOURCES } from '../../../lib/components/dropdown/DropdownComponent';
import InputText from '../../input/InputText';
import Icon from '../../icon';
import styles from './select-base.module.scss';
import { SelectBaseProps } from '../types';
import { InputStatus } from '../../../lib/types/types';

const KEY_CODES = {
  keyDown: 40,
  space: 32,
};

export const STATUS_DEFAULT = 'default';
export const STATUS_FOCUSED = 'focused';
export const STATUS_HOVERED = 'hovered';
export const STATUS_ERROR = 'error';

export const EMPTY_LIST_OPTION_ID = 'empty';


const SelectBase = ({
  id,
  icon = null,
  onFocus = () => {
  },
  onBlur = () => {
  },
  onToggle = () => {
  },
  disabled = false,
  searchable = false,
  hasError = false,
  isLoading = false,
  renderSelectedOptions = () => null,
  renderDropdownOverlay = () => null,
  searchString = '',
  setSearchString = () => null,
  onKeyUp = () => null,
}: SelectBaseProps) => {
  // Input text ref to focus/blur
  const inputTextRef = useRef<HTMLInputElement>(document.createElement('input'));
  const [isDropped, setDropped] = useState(false);
  const [currentStatus, setStatus] = useState<InputStatus>(STATUS_DEFAULT);

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    if (!isDropped) {
      setDropped(true);
    }
  };

  const onToggleDropdown = (source: string) => {
    if (disabled) {
      return;
    }
    if (isDropped) {
      if (!searchable || (searchable && source !== TOGGLE_SOURCES.control)) {
        setDropped(!isDropped);
        setSearchString('');
      }
    } else {
      setDropped(!isDropped);
    }
    onToggle(source, inputTextRef, !isDropped);
  };

  const onInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    // Set and select current option value in input text
    if (searchable) {
      setTimeout(() => inputTextRef.current.select(), 0);
    }
    setStatus(STATUS_FOCUSED);
    onFocus(setSearchString, evt);
  };

  const onInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    setStatus(STATUS_DEFAULT);
    onBlur(event);
  };

  const onKeyUpHandler = (e: KeyboardEvent) => {
    onKeyUp(e);
    const keycode = (e.keyCode ? e.keyCode : e.which);
    if (!isDropped && keycode === KEY_CODES.keyDown) {
      setDropped(true);
    }
  };

  const onMouseEnter = () => {
    if (currentStatus === STATUS_DEFAULT) {
      setStatus(STATUS_HOVERED);
    }
  };
  const onMouseLeave = () => {
    if (currentStatus === STATUS_HOVERED) {
      setStatus(STATUS_DEFAULT);
    }
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Dropdown
        overlay={renderDropdownOverlay(setDropped)}
        overlayStyle={{
          left: 0,
          top: '48px',
        }}
        isDropped={isDropped}
        onToggle={onToggleDropdown}
      >
        <InputText
          status={hasError ? STATUS_ERROR : currentStatus}
          disabled={disabled}
          value={searchString}
          onChange={onTextInputChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onKeyUp={onKeyUpHandler}
          readOnly={!searchable}
          forwardRef={inputTextRef}
          className={cn({ [styles['base-with-icon']]: icon })}
          loading={isLoading}
          id={id}
        />
        {renderSelectedOptions(currentStatus, isDropped)}
        <Icon
          type="down"
          className={cn(styles['arrow-down'], {
            [styles['arrow-down-open']]: isDropped,
            [styles['arrow-down-hovered']]: !disabled && currentStatus === STATUS_HOVERED,
          })}
          onClick={() => onToggleDropdown('icon')}
        />
      </Dropdown>
    </div>
  );
};

export default SelectBase;
