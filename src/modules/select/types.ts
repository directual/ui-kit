import React, { FocusEvent, RefObject } from 'react';
import { TagProps } from '../tag/Tag';
import { GroupInterface, OptionInterface } from '../list/types';
import { InputStatus } from '../../lib/types/types';
import { TreeGroupOption, TreeOption } from '../tree/types';

export interface Tag extends TagProps {
  value: string,
}

export interface TagsListProps {
  tags: Array<Tag>,
  onHeightChange: (containerHeight: number) => void,
}

export interface SelectBasePropsBase {
  id?: number | string,
  icon?: string | React.ReactNode,
  onToggle?: (source: string, ref: RefObject<HTMLInputElement>, isDropped: boolean) => any,
  searchable?: boolean,
  disabled?: boolean,
  hasError?: boolean,
  isLoading?: boolean,
}
export interface SelectBaseProps extends SelectBasePropsBase {
  renderSelectedOptions: (
    currentStatus: InputStatus,
    isDropped: boolean,
  ) => any,
  renderDropdownOverlay: (
    setDropped: (isDropped: boolean) => void,
  ) => any,
  onFocus?: (setSearchString: (searchString: string) => void, evt: FocusEvent) => any,
  searchFilter?: (
    options: Array<OptionInterface>,
    searchString: string,
    optionsById: object,
  ) => Array<OptionInterface>,
  searchString: string,
  setSearchString: (searchString: string) => void,
  onBlur?: (evt: FocusEvent<HTMLInputElement>) => any,
  onKeyUp?: (e: KeyboardEvent) => void,
}

export interface SelectProps extends SelectBasePropsBase {
  options: Array<OptionInterface>,
  selectedOptionId: number | string | null,
  groups?: Array<GroupInterface>,
  placeholder?: string,
  onFocus?: (evt: FocusEvent<HTMLInputElement>) => any,
  onBlur?: (selectedOptionId: number | string | null) => any,
  onChange?: (optionId: string | number) => any,
  onSearch?: (searchString: string) => void,
}

export interface SelectCheckableProps extends SelectBasePropsBase {
  options: Array<OptionInterface>,
  selectedOptionIds: Array<string | number>,
  groups?: Array<GroupInterface>,
  placeholder?: string,
  onFocus?: (evt: FocusEvent<HTMLInputElement>) => any,
  onChange?: (optionIds: Array<string | number>) => any,
  onBlur?: (selectedOptionIds: Array<string | number>) => any,
  onSearch?: (searchString: string) => void,
  onCreateNewOption?: (newOptionName: string) => void,
}

export interface SelectTreeBaseProps {
  id?: number | string,
  onFocus?: (evt: FocusEvent<HTMLInputElement>) => any,
  icon?: string,
  options: TreeOption[],
  groups?: TreeGroupOption[],
  searchable?: boolean,
  disabled?: boolean,
  hasError?: boolean,
  isLoading?: boolean,
  placeholder?: string,
  isLeavesOnlySelectable?: boolean,
}

export interface SelectTreeProps extends SelectTreeBaseProps {
  selectedOptionId: number | string | null,
  onChange?: (optionId: string | number) => any,
  onBlur?: (selectedOptionId: number | string | null) => any,
}

export interface SelectCheckableTreeProps extends SelectTreeBaseProps {
  selectedOptionIds: Array<string>,
  onChange?: (optionIds: Array<string>) => any,
  onBlur?: (selectedOptionIds: Array<string>) => any,
}


export interface SelectSimpleOptionProps {
  icon?: string | React.ReactNode,
  searchable: boolean,
  currentStatus: InputStatus,
  selectedOptionId: number | string | null,
  searchString: string,
  selectedOptionValue: string | number,
  placeholder: string,
}

export interface SelectCheckableOptionProps {
  icon?: string | React.ReactNode,
  searchable: boolean,
  currentStatus: InputStatus,
  searchString: string,
  placeholder: string,
  disabled: boolean,
  isDropped: boolean,
  selectedOptionIds: Array<string | number>,
  optionsById: object,
  onChangeHandler?: (arg: string | number) => void,
  showHint: boolean,
  setShowHint: (newHint: boolean) => void,
  closeable?: boolean,
}


export interface BaseOption {
  id: string | number,
  value: string | number,
}

export type UniversalOptionById = { [key: string]: BaseOption };
export type OptionsById = { [key: string]: OptionInterface };
export type TreeOptionsById = { [key: string]: TreeOption };
