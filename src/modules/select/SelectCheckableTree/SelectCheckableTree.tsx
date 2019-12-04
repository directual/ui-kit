import React, {
  useState, useMemo, FocusEvent, MutableRefObject,
} from 'react';
import isEmpty from 'lodash/isEmpty';
import keyBy from 'lodash/keyBy';
import difference from 'lodash/difference';
import SelectBase, { EMPTY_LIST_OPTION_ID } from '../SelectBase/SelectBase';
import { TOGGLE_SOURCES } from '../../../lib/components/dropdown/DropdownComponent';
import { TreeOptionsById, SelectCheckableTreeProps } from '../types';
import { InputStatus } from '../../../lib/types/types';
import {
  calculateOptionsLookup,
  emptyListOption,
  getExpandedKeysForSearch,
  treeSearchFilter,
  setExpanded,
  getExpandedKeys,
  isEmptyList,
  isLoadingOption,
} from '../helpers';
import SelectCheckableOption from '../shared/SelectCheckableOption/SelectCheckableOption';
import Tree from '../../tree/Tree';
import { TreeNodeExpandedEvent } from '../../tree/BaseTree';

const SelectCheckableTree = ({
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
}: SelectCheckableTreeProps) => {
  const [searchString, setSearchString] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Array<string>>([]);
  const optionsById = useMemo<TreeOptionsById>(() => keyBy(options, (o) => o.id), [options]);
  const optionsTreeLookup = useMemo(() => calculateOptionsLookup(options, optionsById), [options]);

  const onSearchChange = (newSearchString: string) => {
    const expandedSearchKeys = getExpandedKeysForSearch(
      options, newSearchString, optionsTreeLookup,
    );
    setExpandedKeys(expandedSearchKeys);
    setSearchString(newSearchString);
  };

  const onChangeHandler = (optionId: string | number) => {
    const parentKeys = getExpandedKeys([optionId], optionsTreeLookup);
    const newSelected = difference(selectedOptionIds, [...parentKeys, String(optionId)]);
    onChange(newSelected);
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
      selectedOptionIds={selectedOptionIds.filter(
        (optionId) => isEmpty(optionsTreeLookup[optionId].childNodeIds),
      )}
      searchable={searchable}
    />
  );

  const renderDropdownOverlay = () => {
    const onExpand = (
      _: any, nodeExpandedEvent: TreeNodeExpandedEvent,
    ) => setExpanded(nodeExpandedEvent.node, expandedKeys, setExpandedKeys);

    let visibleOptions = options;
    if (searchable && !isEmpty(searchString)) {
      visibleOptions = treeSearchFilter(options, searchString, optionsById, optionsTreeLookup);
    }
    visibleOptions = isEmpty(visibleOptions) ? [emptyListOption] : visibleOptions;

    if (isLoading) {
      visibleOptions = [isLoadingOption];
    }

    const onCheck = (optionIds: string[]) => {
      if (optionIds.includes(EMPTY_LIST_OPTION_ID)) {
        return;
      }
      onChange(optionIds);
    };

    return (
      <Tree
        selected={selectedOptionIds}
        options={visibleOptions}
        expandedKeys={expandedKeys}
        onCheck={onCheck}
        onExpand={onExpand}
        groups={groups}
        checkable={!isEmptyList(visibleOptions)}
      />
    );
  };

  const onToggle = (
    source: string,
    inputTextRef: MutableRefObject<HTMLInputElement>,
    isDropped: boolean,
  ) => {
    if (searchable && source === TOGGLE_SOURCES.control) {
      inputTextRef.current.focus();
    }
    if (isDropped) {
      const expandedKeysSelected = getExpandedKeys(selectedOptionIds, optionsTreeLookup);
      setExpandedKeys(expandedKeysSelected);
    }
  };

  const onFocusHandler = (_: any, event: FocusEvent<HTMLInputElement>) => onFocus(event);
  const onBlurHandler = () => onBlur(selectedOptionIds);

  return (
    <SelectBase
      id={id}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      onToggle={onToggle}
      disabled={disabled}
      searchable={searchable}
      renderSelectedOptions={renderSelectedOptions}
      renderDropdownOverlay={renderDropdownOverlay}
      searchString={searchString}
      setSearchString={onSearchChange}
      hasError={hasError}
      isLoading={isLoading}
    />
  );
};

export default SelectCheckableTree;
