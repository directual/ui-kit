import React, {
  useState, useEffect, useRef, FocusEvent,
} from 'react';
import moment, { Moment } from 'moment';
import cn from 'classnames';

import Icon from '../icon';
import InputText from '../input/InputText';
import TimePickerOverlay from './TimePickerOverlay';
import Dropdown from '../../lib/components/dropdown/DropdownComponent';

import { TimePickerProps, SelectedTime } from './types';
import { InputStatus } from '../../lib/types/types';
import { INPUT_STATUS, KEY_CODES } from '../../constants/constants';

import styles from './TimePicker.module.scss';
import selectBaseStyles from '../select/SelectBase/select-base.module.scss';


const FORMAT = 'HH:mm:ss';

const TimePicker: React.FC<TimePickerProps> = ({
  id,
  value = undefined,
  placeholder = '',
  submitText = '',
  status = INPUT_STATUS.DEFAULT,
  onChange = () => {
  },
  onFocus = () => {
  },
  onBlur = () => {
  },
  onToggle = () => {
  },
  disabled = false,
}) => {
  // Input text ref to focus/blur
  const inputTextRef = useRef<HTMLInputElement>(document.createElement('input'));
  const viewInputTextRef = useRef<HTMLInputElement>(document.createElement('input'));
  const [isDropped, setDropped] = useState<boolean>(false);
  const [currentStatus, setStatus] = useState<InputStatus>(status);

  const [selectedTime, setSelectedTime] = useState<SelectedTime>({
    value,
    textInputValue: '',
    selectedTime: {
      hours: '',
      minutes: '',
      seconds: '',
    },
  });

  useEffect(() => setStatus(status), [setStatus, status]);

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: timeValue } = e.target;
    const regex = new RegExp('^[0-9:]*$', 'g');

    if (!regex.test(timeValue) || timeValue.length > FORMAT.length) return;

    setSelectedTime({
      ...selectedTime,
      textInputValue: timeValue,
    });
  };

  const resetTime = () => {
    setSelectedTime({
      value: undefined,
      textInputValue: '',
      selectedTime: {
        hours: '',
        minutes: '',
        seconds: '',
      },
    });
    onChange(undefined);
  };

  const changeValue = (timeString: string): void => {
    setDropped(false);

    const momentTime = moment(timeString, FORMAT);

    if (timeString === '' || !momentTime.isValid()) {
      resetTime();
      onChange(undefined);
      return;
    }

    setSelectedTime({
      value: momentTime,
      textInputValue: momentTime.format(FORMAT),
      selectedTime: {
        hours: momentTime.format('HH'),
        minutes: momentTime.format('mm'),
        seconds: momentTime.format('ss'),
      },
    });

    onChange(momentTime);
  };

  const onToggleDropdown = (source: string): void => {
    if (disabled) return;

    if (source === 'outside') {
      changeValue(selectedTime.textInputValue);
    }

    onToggle(source, inputTextRef);
  };

  const onInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    setStatus(INPUT_STATUS.FOCUSED);
    setDropped(true);
    onFocus(event);
  };

  const onInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    setStatus(INPUT_STATUS.DEFAULT);
    setDropped(false);
    onBlur(event);
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.keyCode === KEY_CODES.enter || e.keyCode === KEY_CODES.esc) {
      inputTextRef.current.blur();
    }
  };

  const getTimeInputValue = (timeValue?: Moment) => {
    if (!timeValue) return '';

    const momentTime = moment(timeValue);
    if (momentTime.isValid()) {
      return momentTime.format(FORMAT);
    }
    return '';
  };


  return (
    <Dropdown
      overlay={(
        <TimePickerOverlay
          submitText={submitText}
          selectedTime={selectedTime}
          changeValue={changeValue}
          setSelectedTime={setSelectedTime}
        />
      )}
      overlayStyle={{
        left: 0,
        top: '48px',
        width: 254,
        height: 248,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
      isDropped={isDropped}
      onToggle={onToggleDropdown}
    >
      <>
        {/* инпут для ввода */}
        <InputText
          id={id}
          className={cn(
            styles['timepicker-input'],
            {
              [styles.input__active]: currentStatus === INPUT_STATUS.FOCUSED,
            },
          )}
          placeholder={FORMAT.toUpperCase()}
          value={selectedTime.textInputValue}
          onChange={onTextInputChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          disabled={disabled}
          onKeyUp={onKeyUp}
          forwardRef={inputTextRef}
          status={currentStatus}
        />

        {/* инпут для отображения */}
        <InputText
          className={cn(
            styles['timepicker-input'],
            {
              [styles.input__active]: currentStatus !== INPUT_STATUS.FOCUSED,
            },
          )}
          forwardRef={viewInputTextRef}
          placeholder={placeholder}
          value={getTimeInputValue(value)}
          readOnly
          disabled={disabled}
          onClear={() => changeValue('')}
          onChange={() => {
          }}
          onFocus={() => {
            inputTextRef.current.focus();
            viewInputTextRef.current.blur();
          }}
          tabIndex={-1}
          status={
            currentStatus === INPUT_STATUS.DISABLED
              ? INPUT_STATUS.DISABLED
              : currentStatus
          }
        />
      </>
      {
        (!value || currentStatus === INPUT_STATUS.FOCUSED)
        && (
          <Icon
            type="clocks"
            className={cn(selectBaseStyles['arrow-down'], {
              [selectBaseStyles['arrow-down-hovered']]: !disabled && currentStatus === INPUT_STATUS.HOVERED,
              [selectBaseStyles['arrow-down-focused']]: !disabled && currentStatus === INPUT_STATUS.FOCUSED,
            })}
          />
        )
      }
    </Dropdown>
  );
};

export default TimePicker;
