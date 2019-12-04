import { SyntheticEvent } from 'react';
import { TreeProps as BaseTreeProps, ITreeNode } from './BaseTree';


export type OptionId = string | number;

export interface OptionsLookup {
  [optionId: string]: TreeOption;
}

export interface ChildrenLookup {
  [optionId: string]: OptionId[];
}

export interface TreeOption {
  id: OptionId;
  value: any;
  groupId?: OptionId;
  parentId?: OptionId | null;
  icon?: string;
  multiline?: string | number;
}

export interface TreeGroupOption {
  id: OptionId;
  value: any;
}

export type nodeClickFunc = (e: SyntheticEvent<HTMLElement>, node: ITreeNode) => void;

export type TreeProps = {
  className?: string,
  options: TreeOption[],
  selected: OptionId[],
  groups?: TreeGroupOption[],
  icon?: string,
  checkable?: boolean,
  selectable?: boolean,
  multiple?: boolean,
  expandedKeys?: string[],
  defaultExpandedKeys?: string[],
  setTreeRef?: (tree: any) => void,
} & Pick<
BaseTreeProps,
'onClick' | 'onExpand' | 'onDoubleClick' | 'onSelect' | 'onCheck'
>;

export interface TreeState {
  halfChecked: OptionId[];
}
