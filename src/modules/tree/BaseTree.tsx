import React, { ReactNode, ReactElement, SyntheticEvent } from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import cn from 'classnames';
import Icon from '../icon';
import './Tree.scss';


export interface TreeNodeAttribute {
  eventKey: string;
  prefixCls: string;
  className: string;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  halfChecked: boolean;
  children: ReactNode;
  title: ReactNode;
  pos: string;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  isLeaf: boolean;
  selectable: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
}

export interface TreeNodeProps {
  className?: string;
  checkable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  title?: string | ReactNode;
  key?: string;
  eventKey?: string;
  isLeaf?: boolean;
  checked?: boolean;
  expanded?: boolean;
  loading?: boolean;
  selected?: boolean;
  selectable?: boolean;
  icon?: ((treeNode: TreeNodeAttribute) => ReactNode) | ReactNode;
  children?: ReactNode;
  [customProp: string]: any;
}

export interface ITreeNode extends React.Component<TreeNodeProps, {}> {}

export interface TreeNodeBaseEvent {
  node: ITreeNode;
  nativeEvent: MouseEvent;
}

export interface TreeNodeCheckedEvent extends TreeNodeBaseEvent {
  event: 'check';
  checked?: boolean;
  halfCheckedKeys: string[],
  checkedNodes?: ITreeNode[];
}

export interface TreeNodeSelectedEvent extends TreeNodeBaseEvent {
  event: 'select';
  selected?: boolean;
  selectedNodes?: ITreeNode[];
}

export interface TreeNodeExpandedEvent extends TreeNodeBaseEvent {
  expanded?: boolean;
}

export interface TreeNodeMouseEvent {
  node: ITreeNode;
  event: SyntheticEvent<HTMLElement>;
}

export interface TreeNodeDragEnterEvent extends TreeNodeMouseEvent {
  expandedKeys: string[];
}

export interface TreeNodeDropEvent {
  node: ITreeNode;
  dragNode: ITreeNode;
  dragNodesKeys: string[];
  dropPosition: number;
  dropToGap?: boolean;
  event: SyntheticEvent<HTMLElement>;
}

export interface TreeNodeNormal {
  title?: ReactNode;
  key: string;
  isLeaf?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  children?: TreeNodeNormal[];
}

export interface TreeProps {
  showLine?: boolean;
  className?: string;
  multiple?: boolean;
  autoExpandParent?: boolean;
  checkStrictly?: boolean;
  checkable?: boolean;
  disabled?: boolean;
  defaultExpandAll?: boolean;
  defaultExpandParent?: boolean;
  defaultExpandedKeys?: string[];
  expandedKeys?: string[];
  checkedKeys?: string[] | { checked: string[]; halfChecked: string[] };
  defaultCheckedKeys?: string[];
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  selectable?: boolean;
  // onExpand?: (expandedKeys: string[], info: TreeNodeExpandedEvent) => void | PromiseLike<void>;
  onExpand?: (expandedKeys: string[], info: TreeNodeExpandedEvent) => void | any;
  onCheck?: (
    checkedKeys: string[] | { checked: string[]; halfChecked: string[] },
    e: TreeNodeCheckedEvent,
  ) => void;
  onSelect?: (selectedKeys: string[], e: TreeNodeSelectedEvent) => void;
  onClick?: (e: SyntheticEvent<HTMLElement>, node: ITreeNode) => void;
  onDoubleClick?: (e: SyntheticEvent<HTMLElement>, node: ITreeNode) => void;
  filterTreeNode?: (node: ITreeNode) => boolean;
  // loadData?: (node: ITreeNode) => PromiseLike<void>;
  loadData?: (node: ITreeNode) => any;
  loadedKeys?: string[];
  onLoad?: (loadedKeys: string[], info: { event: 'load'; node: ITreeNode }) => void;
  onRightClick?: (options: TreeNodeMouseEvent) => void;
  draggable?: boolean;
  onDragStart?: (options: TreeNodeMouseEvent) => void;
  onDragEnter?: (options: TreeNodeDragEnterEvent) => void;
  onDragOver?: (options: TreeNodeMouseEvent) => void;
  onDragLeave?: (options: TreeNodeMouseEvent) => void;
  onDragEnd?: (options: TreeNodeMouseEvent) => void;
  onDrop?: (options: TreeNodeDropEvent) => void;
  style?: React.CSSProperties;
  showIcon?: boolean;
  icon?: ((nodeProps: TreeNodeAttribute) => ReactNode) | ReactNode;
  switcherIcon?: any;
  prefixCls?: string;
  children?: ReactNode;
  blockNode?: boolean;
  treeData?: Array<TreeNodeNormal>;
  selected?: (string | number)[];
  setTreeRef?: (tree: any) => any;
}

class Tree extends React.Component<TreeProps, any> {
  tree: any;

  static defaultProps = {
    checkable: false,
    showIcon: false,
    selected: [],
    blockNode: false,
  };

  static TreeNode: React.ComponentType<TreeNodeProps> = TreeNode;

  renderSwitcherIcon = (
    prefixCls: string,
    nodeProps: TreeNodeProps,
    switcherIcon?: ReactElement<any>,
  ) => {
    const {
      loading,
      expanded,
      isLeaf,
      multiline,
    } = nodeProps;
    const { showLine, checkable } = this.props;
    if (loading) {
      return <Icon type="loading" className={`${prefixCls}-switcher-loading-icon`} />;
    }

    if (showLine) {
      if (isLeaf) {
        return <Icon type="file" className={`${prefixCls}-switcher-line-icon`} />;
      }
      return (
        <Icon
          type={expanded ? 'minus-square' : 'plus-square'}
          className={`${prefixCls}-switcher-line-icon`}
        />
      );
    }

    const switcherCls = [
      `${prefixCls}-switcher-icon`,
      multiline && !checkable ? 'multiline-switcher-icon' : '',
    ].join(' ');

    if (isLeaf) {
      return null;
    }
    if (switcherIcon) {
      const switcherOriginCls = switcherIcon.props.className || '';
      return React.cloneElement(switcherIcon, {
        className: cn(switcherOriginCls, switcherCls),
      });
    }
    return <Icon type="caret-down" className={switcherCls} />;
  };


  render() {
    const {
      prefixCls = 'directual-tree',
      className,
      showIcon,
      switcherIcon,
      blockNode,
      children,
      checkable,
      setTreeRef,
    } = this.props;

    return (
      // @ts-ignore
      <RcTree
        ref={setTreeRef}
        {...this.props}
        prefixCls={prefixCls}
        className={cn(className, {
          [`${prefixCls}-icon-hide`]: !showIcon,
          [`${prefixCls}-block-node`]: blockNode,
        })}
        checkable={checkable}
        // @ts-ignore
        switcherIcon={(
          nodeProps: TreeNodeProps,
        ) => this.renderSwitcherIcon(prefixCls, nodeProps, switcherIcon)}
      >
        {children}
      </RcTree>
    );
  }
}

export default Tree;
