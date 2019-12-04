import { RefObject, FocusEvent } from 'react';
import { Moment } from 'moment';
import { InputStatus } from '../../lib/types/types';
import { IDates } from '../../lib/dates/index';


export interface DatePickerProps {
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

export type SelectedDate = {
  value: Moment | undefined;
  textInputValue: string;
};

export type TSetSelectedDate = React.Dispatch<React.SetStateAction<SelectedDate>>;

export interface DatePickerOverlayProps {
  selectedTime: SelectedDate,
  setSelectedDate: TSetSelectedDate;
  changeValue: (timeString: string) => any;
  submitText?: string;
}

export type Day = {
  isActiveMonth: boolean;
  momentDay: Moment,
  isCurrent: boolean,
  isSelected: boolean,
};

export type Month = {
  momentMonth: Moment,
  isSelected: boolean,
};

export type Year = {
  momentYear: Moment,
  inActivePeriod: boolean,
  isSelected: boolean,
};

export type TDirection = 'prev' | 'next';
export type TChangePeriodFunc = (direction: TDirection) => () => any;

export interface DaysOverlayProps {
  Dates: IDates,
  activeDate: Moment | undefined,
  selectedDate: Moment | undefined,
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>,
  setActiveDate: React.Dispatch<React.SetStateAction<Moment>>,
  selectDate: (date: Moment, shouldCloseDropdown?: boolean) => void,
}

export type MonthsOverlayProps = Pick<DaysOverlayProps, 'activeDate' | 'setActiveDate' | 'setCurrentStep' | 'Dates'>;

export type YearsOverlayProps = MonthsOverlayProps;

export type TSelectDateClb = (date: Moment) => () => void;
