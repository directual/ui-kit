import React, {
  useState, useEffect, useRef, FocusEvent,
} from 'react';
import { Moment } from 'moment';
import cn from 'classnames';

import Icon from '../icon';
import InputText from '../input/InputText';
import Dropdown from '../../lib/components/dropdown/DropdownComponent';
import DatePickerOverlay from './DatePickerOverlay';

import { DatePickerProps, SelectedDate } from './types';
import { InputStatus } from '../../lib/types/types';
import { INPUT_STATUS, KEY_CODES } from '../../constants/constants';

import styles from '../TimePicker/TimePicker.module.scss';
import selectBaseStyles from '../select/SelectBase/select-base.module.scss';
import { useStorybook } from '../StorybookProvider/withStorybook';


const DatePicker: React.FC<DatePickerProps> = ({
  id,
  value = undefined,
  placeholder = '',
  status = INPUT_STATUS.DEFAULT,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onToggle = () => {},
  disabled = false,
}) => {
  const { Dates } = useStorybook();
  const inputTextRef = useRef<HTMLInputElement>(document.createElement('input'));
  // TODO убрать это, когда переделаем Dates, чтобы они не возвращали boolean
  const formatDate = (date: Moment | undefined): string => {
    let formattedValue = Dates.getPeriodPart(date || '');
    if (typeof formattedValue === 'boolean') {
      formattedValue = '';
    }

    return formattedValue;
  };

  const viewInputTextRef = useRef<HTMLInputElement>(document.createElement('input'));

  const [isDropped, setDropped] = useState<boolean>(false);
  const [currentStatus, setStatus] = useState<InputStatus>(status);

  const getDateInputValue = (dateValue?: Moment | undefined): Moment | undefined => {
    if (!dateValue) return undefined;
    const momentTime = Dates.parseDateDelimeted(dateValue);
    if (momentTime.isValid()) return momentTime;
    return undefined;
  };

  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    value,
    textInputValue: String(Dates.getDateDelimeted(value || '') || ''),
  });

  useEffect(() => setStatus(status), [setStatus, status]);

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const regex = new RegExp('^[0-9:.]*$', 'g');
    const { value: dateValue } = e.target;
    const formatLength = Dates.getDateDelimetedFormat().length;

    if (!regex.test(dateValue) || dateValue.length > formatLength) return;

    setSelectedDate({
      ...selectedDate,
      textInputValue: dateValue,
    });
  };

  const resetDate = () => {
    setSelectedDate({
      value: undefined,
      textInputValue: '',
    });
  };

  const changeValue = (date: Moment | undefined, shouldCloseDropdown: boolean): void => {
    if (shouldCloseDropdown) {
      setDropped(false);
      inputTextRef.current.blur();
    }

    if (!date || !date.isValid()) {
      resetDate();
      onChange(undefined);
      return;
    }

    setSelectedDate({
      value: date,
      textInputValue: String(Dates.getDateDelimeted(date)),
    });

    onChange(date);
  };

  const onToggleDropdown = (source: string): void => {
    if (disabled) return;

    if (source === 'outside') {
      const dateValue = Dates.parseDateDelimeted(selectedDate.textInputValue);
      changeValue(dateValue, true);
    }

    onToggle(source, inputTextRef);
  };

  const onInputFocus = (event: FocusEvent<HTMLInputElement>): void => {
    setStatus(INPUT_STATUS.FOCUSED);
    setDropped(true);
    onFocus(event);
  };

  const onInputBlur = (event: FocusEvent<HTMLInputElement>): void => {
    setStatus(INPUT_STATUS.DEFAULT);
    onBlur(event);
    setDropped(false);
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.keyCode === KEY_CODES.enter || e.keyCode === KEY_CODES.esc) {
      inputTextRef.current.blur();
      changeValue(Dates.parseDateDelimeted(selectedDate.textInputValue), true);
    }
  };

  const formattedValue = formatDate(getDateInputValue(value));

  return (
    <Dropdown
      overlay={(
        <DatePickerOverlay
          selectedDate={selectedDate.value}
          selectDate={changeValue}
        />
      )}
      overlayStyle={{
        left: 0,
        top: '48px',
        width: 304,
        height: 376,
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
          placeholder={Dates.getDateDelimetedFormat()}
          value={selectedDate.textInputValue}
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
          value={formattedValue || ''}
          readOnly
          disabled={disabled}
          onClear={() => changeValue(undefined, true)}
          onChange={() => {}}
          onFocus={() => {
            inputTextRef.current.focus();
            viewInputTextRef.current.blur();
          }}
          tabIndex={-1}
          status={currentStatus}
        />
      </>
      {
        (!value || currentStatus === INPUT_STATUS.FOCUSED)
        && (
        <Icon
          type="calendar"
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

export default DatePicker;
