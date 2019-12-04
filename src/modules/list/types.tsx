import React from 'react';


export interface OptionInterface {
  id: string | number,
  value: string | number,
  className?: string,
  selected?: boolean,
  checked?: boolean,
  icon?: string | React.ReactNode,
  children?: React.ReactNode,
  onClick?: () => void,
  onChange?: () => void,
  customElement?: React.ReactNode,
  multiline?: string | number,
  groupId?: string | number,
  isTreeOption?: boolean,
}

export interface GroupInterface {
  id: string | number,
  value: string | number | React.ReactNode,
}


interface FlatListBase {
  selected?: Array<string | number>,
  options: Array<OptionInterface>,
  checkable?: boolean,
  icon?: string | React.ReactNode,
  inGroup?: boolean,
}

export interface FlatListInterface extends FlatListBase {
  onChange?: (arg: string | number | Array<string | number>) => void,
}

export interface ListInterface extends FlatListBase {
  groups?: Array<GroupInterface>,
  onChange?: (arg: string | number) => void,
}

export interface CheckableListInterface extends FlatListBase {
  groups?: Array<GroupInterface>,
  defaultValues?: Array<string | number>,
  onChange?: (arg: Array<string | number>) => void,
}
