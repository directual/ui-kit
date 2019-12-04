import React, { FocusEvent, useMemo, useState } from 'react';
import keyBy from 'lodash/keyBy';
import isEmpty from 'lodash/isEmpty';
import SelectBase, { EMPTY_LIST_OPTION_ID } from '../SelectBase/SelectBase';
import { TreeOptionsById, SelectTreeProps } from '../types';
import { InputStatus } from '../../../lib/types/types';
import Tree from '../../tree/Tree';
import { ITreeNode, TreeNodeExpandedEvent } from '../../tree/BaseTree';
import SelectSimpleOption from '../shared/SelectSimpleOption';
import {
  getSelectedOptionValue,
  getOptionId,
  isLeaf,
  getExpandedKeys,
  treeSearchFilter,
  emptyListOption,
  calculateOptionsLookup,
  getExpandedKeysForSearch,
  setExpanded,
  isLoadingOption,
  isEmptyList,
} from '../helpers';

const SelectTree = ({
  id,
  options = [],
  groups = [],
  icon = '',
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  disabled = false,
  searchable = false,
  hasError = false,
  isLoading = false,
  placeholder = '',
  selectedOptionId = null,
  isLeavesOnlySelectable = false,
}: SelectTreeProps) => {
  const optionsById = useMemo<TreeOptionsById>(() => keyBy(options, (o) => o.id), [options]);
  const optionsTreeLookup = useMemo(() => calculateOptionsLookup(
    options, optionsById, true,
  ), [options]);
  const [searchString, setSearchString] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<Array<string>>([]);
  const selectedOptionValue = getSelectedOptionValue(optionsById, selectedOptionId);

  const onSearchChange = (newSearchString: string) => {
    const expandedSearchKeys = getExpandedKeysForSearch(options, newSearchString, optionsTreeLookup);
    setExpandedKeys(expandedSearchKeys);
    setSearchString(newSearchString);
  };

  const renderSelectedOption = (currentStatus: InputStatus) => (
    <SelectSimpleOption
      icon={icon}
      placeholder={placeholder}
      selectedOptionId={selectedOptionId}
      selectedOptionValue={selectedOptionValue}
      searchable={searchable}
      currentStatus={currentStatus}
      searchString={searchString}
    />
  );

  const renderDropdownOverlay = (setDropped: (isDropped: boolean) => void) => {
    const onClick = (_: any, node: ITreeNode) => {
      const optionId = getOptionId(node);
      if (optionId === EMPTY_LIST_OPTION_ID) {
        return;
      }
      if (isLeaf(node) || !isLeavesOnlySelectable) {
        setDropped(false);
        setSearchString('');
        onChange(optionId);
      } else {
        setExpanded(node, expandedKeys, setExpandedKeys);
      }
    };

    const onExpand = (_: any, nodeExpandedEvent: TreeNodeExpandedEvent) => setExpanded(nodeExpandedEvent.node, expandedKeys, setExpandedKeys);

    let visibleOptions = options;
    if (searchable && !isEmpty(searchString)) {
      visibleOptions = treeSearchFilter(options, searchString, optionsById, optionsTreeLookup);
    }
    visibleOptions = isEmpty(visibleOptions) ? [emptyListOption] : visibleOptions;

    if (isLoading) {
      visibleOptions = [isLoadingOption];
    }

    return (
      <Tree
        options={visibleOptions}
        groups={groups}
        selected={selectedOptionId !== null ? [selectedOptionId] : []}
        icon={isEmptyList(visibleOptions) || isLoading ? '' : icon}
        onClick={onClick}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        selectable
      />
    );
  };

  const onFocusHandler = (_: any, evt: FocusEvent<HTMLInputElement>) => onFocus(evt);
  const onBlurHandler = () => onBlur(selectedOptionId);

  const onToggle = (_:any, $:any, isDropped: boolean) => {
    if (isDropped) {
      const optionIdsToExpand = selectedOptionId ? [selectedOptionId] : [];
      const expandedKeysSelected = getExpandedKeys(optionIdsToExpand, optionsTreeLookup);
      setExpandedKeys(expandedKeysSelected);
    }
  };

  return (
    <SelectBase
      id={id}
      icon={icon}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      disabled={disabled}
      searchable={searchable}
      renderSelectedOptions={renderSelectedOption}
      renderDropdownOverlay={renderDropdownOverlay}
      onToggle={onToggle}
      searchString={searchString}
      setSearchString={onSearchChange}
      hasError={hasError}
      isLoading={isLoading}
    />
  );
};

export default SelectTree;
