import React from 'react';


export interface RadioProps {
  /** Radio content property */
  children?: React.ReactNode | string,
  /** get focus when component mounted */
  autoFocus?: boolean,
  /** Specifies whether the radio is selected */
  checked?: boolean,
  /** Specifies the initial state: whether or not the radio is selected */
  defaultChecked?: boolean,
  /** Disable radio */
  disabled?: boolean,
  /** According to value for comparison, to determine whether the selected */
  value: any,
  /** Radio name */
  name?: string,
}

export interface RadioGroupProps {
  /** Radio content */
  children?: React.ReactNode | string;
  /** The callback function that is triggered when the state changes */
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  /** Used for setting the currently selected value */
  value: any,
  /** Disable checkbox */
  disabled?: boolean;
  /** The name property of all input[type="checkbox"] children */
  name?: string | number,
}
