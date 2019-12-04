// TODO убрать fix
/* eslint-disable react/no-array-index-key */
import React from 'react';
import cn from 'classnames';
import get from 'lodash/get';
import Button from '../button/Button';

import {
  TimePart,
  TimePartDict,
  SelectedTime,
  TSetSelectedTime,
  TimePickerOverlayProps,
} from './types';

import styles from './TimePicker.module.scss';


const TIME_COLS: TimePartDict = {
  hours: 24,
  minutes: 60,
  seconds: 60,
};

const steps:TimePartDict = {
  hours: 1,
  minutes: 1,
  seconds: 1,
};

const makeOptions = (limit: number, step: number): string[] => {
  const options: string[] = [];
  if (!limit || !step) return options;

  for (let i = 0; i < limit; i += step) {
    options.push(i < 10 ? `0${i}` : `${i}`);
  }

  return options;
};

const renderTimeOptions = (
  key: TimePart,
  limit: number,
  step: number,
  selectedTime: SelectedTime,
  setSelectedTime: TSetSelectedTime,
) => {
  const options = makeOptions(limit, step);

  return options.map((timePart: string, i) => (
    <Button
      key={`time-part-button-${i}`}
      className={cn(
        styles['time-button'],
        {
          [styles['time-button_selected']]: selectedTime.selectedTime[key] === timePart,
        },
      )}
      onClick={() => {
        setSelectedTime({
          ...selectedTime,
          selectedTime: {
            ...selectedTime.selectedTime,
            [key]: timePart,
          },
        });
      }}
    >
      <span className={styles['time-button__label']}>{timePart}</span>
    </Button>
  ));
};

const TimePickerOverlay: React.FC<TimePickerOverlayProps> = ({
  selectedTime,
  submitText,
  setSelectedTime,
  changeValue,
}) => {
  const setSelectedToInput = () => {
    const hours = get(selectedTime, 'selectedTime.hours', '');
    const minutes = get(selectedTime, 'selectedTime.minutes', '');
    const seconds = get(selectedTime, 'selectedTime.seconds', '');

    const timeValueString = `${hours || '00'}:${minutes || '00'}:${seconds || '00'}`;

    changeValue(timeValueString);
  };

  const preventInputBlur = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onMouseDown={preventInputBlur}
      className={styles['timepicker-dropdown-content']}
    >
      <div className={styles['time-columns']}>
        {
          Object.keys(TIME_COLS).map((key: TimePart) => {
            const limit = TIME_COLS[key];
            const step = steps[key];

            return (
              <div
                key={`time-column-${key}`}
                className={styles['time-column']}
              >
                {
                  renderTimeOptions(
                    key,
                    limit,
                    step,
                    selectedTime,
                    setSelectedTime,
                  )
                }
              </div>
            );
          })
        }
      </div>

      <Button
        type="accent"
        className={styles['submit-time-button']}
        onClick={setSelectedToInput}
      >
        {submitText || 'Set Time'}
      </Button>
    </div>
  );
};

export default TimePickerOverlay;
