import React, {
  useState, RefObject, FocusEvent, useEffect,
} from 'react';
import isEmpty from 'lodash/isEmpty';
import keyBy from 'lodash/keyBy';
import SelectBase, { EMPTY_LIST_OPTION_ID } from '../SelectBase/SelectBase';
import { TOGGLE_SOURCES } from '../../../lib/components/dropdown/DropdownComponent';
import { OptionsById, SelectCheckableProps } from '../types';
import { InputStatus } from '../../../lib/types/types';
import List from '../../list/List';
import {
  emptyListOption, plainSearchFilter, isEmptyList, isLoadingOption,
} from '../helpers';
import SelectCheckableOption from '../shared/SelectCheckableOption/SelectCheckableOption';

export const KEY_NAMES = {
  ENTER: 'Enter',
};

const SelectCheckable = ({
  id,
  options = [],
  groups = [],
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  disabled = false,
  searchable = false,
  hasError = false,
  isLoading = false,
  placeholder = '',
  selectedOptionIds = [],
  onSearch,
  onCreateNewOption,
}: SelectCheckableProps) => {
  const [searchString, setSearchString] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [optionsById, setOptionsById] = useState<OptionsById>({});
  const isSearchEnabled = searchable || (typeof onSearch === 'function');

  let visibleOptions = options;
  if (searchable && !isEmpty(searchString) && !onSearch) {
    visibleOptions = plainSearchFilter(options, searchString);
  }
  visibleOptions = isEmpty(visibleOptions) ? [emptyListOption] : visibleOptions;

  if (isLoading) {
    visibleOptions = [isLoadingOption];
  }

  useEffect(() => {
    setOptionsById({
      ...optionsById,
      ...keyBy(options, (o) => o.id),
    });
  }, [options]);

  const onSearchChange = (curSearchString: string) => {
    if (typeof onSearch === 'function') {
      onSearch(curSearchString);
    }
    setSearchString(curSearchString);
  };

  const onChangeHandler = (optionId: string | number) => {
    if (optionId === EMPTY_LIST_OPTION_ID) {
      return;
    }
    let newSelectedOptionIds = [];
    if (selectedOptionIds.includes(optionId)) {
      newSelectedOptionIds = selectedOptionIds.filter((curOptionId) => curOptionId !== optionId);
    } else {
      newSelectedOptionIds = [...selectedOptionIds, optionId];
    }
    onChange(newSelectedOptionIds);
  };

  const renderSelectedOptions = (
    currentStatus: InputStatus,
    isDropped: boolean,
  ) => (
    <SelectCheckableOption
      disabled={disabled}
      placeholder={placeholder}
      showHint={showHint}
      setShowHint={setShowHint}
      currentStatus={currentStatus}
      isDropped={isDropped}
      onChangeHandler={onChangeHandler}
      searchString={searchString}
      optionsById={optionsById}
      selectedOptionIds={selectedOptionIds}
      searchable={isSearchEnabled}
    />
  );

  const renderDropdownOverlay = () => (
    <List
      selected={selectedOptionIds}
      options={visibleOptions}
      groups={groups}
      onChange={onChangeHandler}
      checkable={!isEmptyList(visibleOptions)}
    />
  );

  const onToggle = (source: string, inputTextRef: RefObject<HTMLInputElement>) => {
    if (isSearchEnabled && source === TOGGLE_SOURCES.control) {
      // @ts-ignore
      inputTextRef.current.focus();
    }
  };

  const onFocusHandler = (_: any, event: FocusEvent<HTMLInputElement>) => onFocus(event);
  const onBlurHandler = () => onBlur(selectedOptionIds);
  const onKeyUpHandler = (e: KeyboardEvent) => {
    if (e.key === KEY_NAMES.ENTER && onCreateNewOption) {
      onCreateNewOption(searchString);
      setSearchString('');
    }
  };

  return (
    <SelectBase
      id={id}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      onToggle={onToggle}
      disabled={disabled}
      searchable={isSearchEnabled}
      renderSelectedOptions={renderSelectedOptions}
      renderDropdownOverlay={renderDropdownOverlay}
      searchString={searchString}
      setSearchString={onSearchChange}
      hasError={hasError}
      isLoading={isLoading}
      onKeyUp={onKeyUpHandler}
    />
  );
};

export default SelectCheckable;
