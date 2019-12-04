import React, { FocusEvent, useMemo, useState } from 'react';
import keyBy from 'lodash/keyBy';
import isEmpty from 'lodash/isEmpty';
import SelectBase, { EMPTY_LIST_OPTION_ID } from '../SelectBase/SelectBase';
import { SelectProps, OptionsById } from '../types';
import { InputStatus } from '../../../lib/types/types';
import List from '../../list/List';
import SelectSimpleOption from '../shared/SelectSimpleOption';
import {
  getSelectedOptionValue, isEmptyList, plainSearchFilter, emptyListOption, isLoadingOption,
} from '../helpers';


const Select = ({
  id,
  options = [],
  groups = [],
  icon = null,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  disabled = false,
  searchable = false,
  hasError = false,
  isLoading = false,
  placeholder = '',
  selectedOptionId = null,
  onSearch,
}: SelectProps) => {
  const [searchString, setSearchString] = useState('');
  const optionsById = useMemo<OptionsById>(() => keyBy(options, (o) => o.id), [options]);
  const selectedOptionValue = getSelectedOptionValue(optionsById, selectedOptionId);
  const isSearchEnabled = searchable || (typeof onSearch === 'function');

  const onSearchChange = (curSearchString: string) => {
    if (typeof onSearch === 'function') {
      onSearch(curSearchString);
    }
    setSearchString(curSearchString);
  };

  const renderSelectedOption = (currentStatus: InputStatus) => (
    <SelectSimpleOption
      icon={icon}
      placeholder={placeholder}
      selectedOptionId={selectedOptionId}
      selectedOptionValue={selectedOptionValue}
      searchable={isSearchEnabled}
      currentStatus={currentStatus}
      searchString={searchString}
    />
  );

  const renderDropdownOverlay = (setDropped: (isDropped: boolean) => void) => {
    const onChangeHandler = (optionId: string | number) => {
      if (optionId === EMPTY_LIST_OPTION_ID) {
        return;
      }
      setDropped(false);
      onSearchChange('');
      onChange(optionId);
    };

    let visibleOptions = options;
    if (searchable && !isEmpty(searchString) && !onSearch) {
      visibleOptions = plainSearchFilter(options, searchString);
    }
    visibleOptions = isEmpty(visibleOptions) ? [emptyListOption] : visibleOptions;

    if (isLoading) {
      visibleOptions = [isLoadingOption];
    }
    return (
      <List
        selected={selectedOptionId !== null ? [selectedOptionId] : []}
        options={visibleOptions}
        groups={groups}
        icon={isEmptyList(visibleOptions) || isLoading ? null : icon}
        onChange={onChangeHandler}
      />
    );
  };

  const onFocusHandler = (_: any, evt: FocusEvent<HTMLInputElement>) => onFocus(evt);
  const onBlurHandler = () => onBlur(selectedOptionId);

  return (
    <SelectBase
      id={id}
      icon={icon}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      disabled={disabled}
      searchable={isSearchEnabled}
      renderSelectedOptions={renderSelectedOption}
      renderDropdownOverlay={renderDropdownOverlay}
      searchString={searchString}
      setSearchString={onSearchChange}
      hasError={hasError}
      isLoading={isLoading}
    />
  );
};

export default Select;
