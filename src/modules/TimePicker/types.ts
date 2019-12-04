import { RefObject, FocusEvent } from 'react';
import { Moment } from 'moment';
import { InputStatus } from '../../lib/types/types';


export interface TimePickerProps {
  id?: number | string,
  value: Moment | undefined,
  placeholder?: string,
  submitText?: string,
  onChange: (value: Moment | undefined) => any,
  status?: InputStatus,
  onFocus?: (event: FocusEvent<HTMLInputElement>) => any,
  onBlur?: (event: FocusEvent<HTMLInputElement>) => any,
  onToggle?: (source: string, ref: RefObject<HTMLInputElement>) => any,
  disabled?: boolean,
}

export type TimePart = 'hours' | 'minutes' | 'seconds';
export type TimePartDict = {[key in TimePart]: number};

export type SelectedTime = {
  value: Moment | undefined;
  textInputValue: string;
  selectedTime: {[key in TimePart]: string};
};

export type TSetSelectedTime = React.Dispatch<React.SetStateAction<SelectedTime>>;
export interface TimePickerOverlayProps {
  selectedTime: SelectedTime,
  setSelectedTime: TSetSelectedTime;
  changeValue: (timeString: string) => any;
  submitText?: string;
}
