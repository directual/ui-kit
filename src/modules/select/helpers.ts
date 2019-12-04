import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import get from 'lodash/get';
import { ITreeNode } from '../tree/BaseTree';
import { OptionInterface } from '../list/types';
import { TreeOption } from '../tree/types';
import styles from './SelectBase/select-base.module.scss';
import { EMPTY_LIST_OPTION_ID } from './SelectBase/SelectBase';
import { TreeOptionsById, UniversalOptionById } from './types';

export const getSelectedOptionValue = (
  optionsById: UniversalOptionById,
  selectedOptionId: number | string | null,
) => {
  const selectedOption = !isNull(selectedOptionId) ? optionsById[selectedOptionId] : null;
  return selectedOption ? selectedOption.value : '';
};

export const isLeaf = (node: ITreeNode): boolean => isEmpty(node.props.children);
export const getOptionId = (node: ITreeNode): string => node.props.eventKey || '';

/**
 * Return option ids array for nodes from option (not including) to root
 * @param option
 * @param optionsById
 */
export const getOptionParentsIds = (
  option: TreeOption,
  optionsById: TreeOptionsById = {},
): string[] => {
  const chain = [];
  let curOption = option;
  while (curOption && curOption.parentId) {
    curOption = optionsById[curOption.parentId];
    if (curOption) {
      chain.push(String(curOption.id));
    }
  }
  return chain;
};

/**
 * Recursively traverse down from option node to it's leaves and add nodes
 * to resultChildrenIds array throughout the way
 */
export const getOptionChildrenIds = (
  option: TreeOption,
  options: Array<TreeOption>,
):string[] => {
  const resultChildrenIds: Array<string> = [];
  const childrenOptions = options.filter(({ parentId }) => String(parentId) === String(option.id));
  childrenOptions.forEach((childOption) => {
    resultChildrenIds.push(String(childOption.id));
    const childrenIds = getOptionChildrenIds(childOption, options);
    childrenIds.forEach((childId) => resultChildrenIds.push(String(childId)));
  });
  return resultChildrenIds;
};

/**
 * Get all expanded keys (up to root) for every option in optionIds array
 * @param optionIds
 * @param optionsTreeLookup
 */
export const getExpandedKeys = (
  optionIds: Array<number | string>,
  optionsTreeLookup: object,
): Array<string> => {
  if (isEmpty(optionIds)) {
    return [];
  }
  const expandedKeys: Array<string> = optionIds.reduce((acc, id) => {
    const parentChainIds = get(optionsTreeLookup, `[${String(id)}].parentChainIds`, []);
    return [...acc, ...parentChainIds];
  }, []);
  return uniq(expandedKeys);
};

/**
 * Filter plain list according to search string
 * @param options
 * @param searchString
 */
export const plainSearchFilter = (
  options: Array<OptionInterface>,
  searchString: string,
): Array<OptionInterface> => options.filter(
  ({ value }) => String(value).toLowerCase().includes(searchString.toLowerCase()),
);

/**
 * Filter options in tree according to search string
 * @param options
 * @param searchString
 * @param optionsById
 * @param optionsTreeLookup
 */
export const treeSearchFilter = (
  options: Array<TreeOption>,
  searchString: string,
  optionsById: TreeOptionsById,
  optionsTreeLookup: object,
): Array<TreeOption> => {
  const plainFilteredOptions = plainSearchFilter(options, searchString);
  const visibleOptionIds: Array<string> = plainFilteredOptions.reduce((acc, { id }) => {
    const relatedOptions = get(optionsTreeLookup, `[${String(id)}].all`, []);
    return [...acc, ...relatedOptions];
  }, []);
  return uniq(visibleOptionIds).map((id) => optionsById[id]);
};

/**
 * Calculate parent and children node ids for tree
 * HEAVY OPERATION
 * @param options
 * @param optionsById
 * @param parentsOnly - do not process children nodes
 */
export const calculateOptionsLookup = (
  options: Array<TreeOption>,
  optionsById: TreeOptionsById,
  parentsOnly?: boolean,
) => {
  const lookup = {};
  options.forEach((option) => {
    const parentChainIds = getOptionParentsIds(option, optionsById);
    const childNodeIds = parentsOnly ? [] : getOptionChildrenIds(option, options);
    lookup[option.id] = {
      parentChainIds,
      childNodeIds,
      all: [String(option.id), ...parentChainIds, ...childNodeIds],
    };
  });
  return lookup;
};

/**
 * Get expanded keys in tree according to search string
 * @param options
 * @param searchString
 * @param optionsTreeLookup
 */
export const getExpandedKeysForSearch = (
  options: Array<TreeOption>,
  searchString: string,
  optionsTreeLookup: object,
): string[] => {
  if (isEmpty(searchString)) {
    return [];
  }
  const filteredOptionIds = plainSearchFilter(options, searchString).map(({ id }) => id);
  return getExpandedKeys(filteredOptionIds, optionsTreeLookup);
};

export const setExpanded = (
  node: ITreeNode,
  expandedKeys: string[],
  setExpandedKeys: (updated: string[]) => void,
) => {
  const optionId = getOptionId(node);
  if (!optionId) {
    return;
  }
  if (expandedKeys.includes(optionId)) {
    setExpandedKeys(expandedKeys.filter((key) => key !== optionId));
  } else {
    setExpandedKeys([...expandedKeys, optionId]);
  }
};

export const isEmptyList = (options: OptionInterface[]) => get(options, '[0].id', null) === EMPTY_LIST_OPTION_ID;


// TODO добавить локализацию
export const emptyListOption = {
  id: EMPTY_LIST_OPTION_ID,
  value: 'Список пуст',
  className: styles['empty-list-option'],
  parentId: null,
};

export const isLoadingOption = {
  id: EMPTY_LIST_OPTION_ID,
  value: 'Данные загружаются...',
  className: styles['empty-list-option'],
  parentId: null,
};
