import React, { ReactNode } from 'react';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';


import BaseTree, { TreeNodeCheckedEvent } from './BaseTree';
import Icon from '../icon/index';

import Option from '../list/Option/Option';
import CheckboxOption from '../list/Option/CheckboxOption';
import { createChildrenLookup, createOptionsLookup } from './utils';

import {
  TreeProps,
  TreeState,
  OptionId,
  TreeOption,
  nodeClickFunc,
  OptionsLookup,
  ChildrenLookup,
} from './types';


const { TreeNode } = BaseTree;

class Tree extends React.Component<TreeProps, TreeState> {
  state = {
    halfChecked: [] as string[],
  };

  treeRef: any = {};

  componentDidMount() {
    this.setState({
      halfChecked: get(this.treeRef, 'state.halfCheckedKeys', []),
    });
  }

  setTreeRef = (tree: any) => {
    this.treeRef = tree;
    const {
      setTreeRef,
    } = this.props;
    if (setTreeRef) {
      setTreeRef(tree);
    }
  };

  preventGroupClick = (func?: nodeClickFunc):nodeClickFunc => (event, node) => {
    if (node.props.isGroup) {
      return;
    }
    if (func) {
      func(event, node);
    }
  };

  onCheck = (checkedKeys: string[], e: TreeNodeCheckedEvent) => {
    const {
      onCheck,
    } = this.props;
    if (onCheck) {
      onCheck(checkedKeys, e);
    }
    this.setState({ halfChecked: e.halfCheckedKeys });
  };

  createNodes = (
    option: TreeOption,
    optionsLookup: OptionsLookup,
    childrenLookup: ChildrenLookup,
  ): ReactNode => {
    const {
      icon,
      selected = [],
      checkable,
      selectable,
    } = this.props;

    const optionId = option.id;
    const isSelected = selected.includes(String(optionId)) || selected.includes(Number(optionId));

    let currentOption = (
      <span className="option-wrapper">
        <Option
          key={optionId}
          id={optionId}
          {...option}
          icon={option.icon ? option.icon : icon}
          selected={selectable && isSelected}
          isTreeOption
        />
      </span>
    );

    if (checkable) {
      const {
        halfChecked,
      } = this.state;
      const isIndeterminate = halfChecked.includes(String(optionId));
      currentOption = (
        <span className="option-wrapper">
          <CheckboxOption
            key={option.id}
            {...option}
            checked={isSelected}
            indeterminate={isIndeterminate}
          />
        </span>
      );
    }

    const nodeChildrenIds = childrenLookup[optionId] || [];

    return (
      <TreeNode
        icon={<div className="tree-icon"><Icon type="down" /></div>}
        title={currentOption}
        key={String(optionId)}
        multiline={option.multiline}
      >
        {nodeChildrenIds.map((
          childId: any,
        ) => this.createNodes(optionsLookup[childId], optionsLookup, childrenLookup))}
      </TreeNode>
    );
  };

  createTree = (data: TreeOption[] = []): ReactNode => {
    const {
      groups = [],
      selected = [],
      multiple = false,
      checkable = false,
      selectable = false,
    } = this.props;

    const rootOptions = data.filter((option) => option.parentId === null);
    const optionsLookup = createOptionsLookup(data);
    const childrenLookup = createChildrenLookup(data);
    const groupedRootsEntries = Object.entries(groupBy(rootOptions, 'groupId'));
    const selectedKeys = selected.map(String);
    const {
      onSelect,
      onClick,
      onExpand,
      onDoubleClick,
    } = this.props;
    return (
      <BaseTree
        selectable={selectable}
        checkable={checkable}
        multiple={multiple}
        selected={selected}
        {...this.props}
        selectedKeys={selectedKeys}
        checkedKeys={selectedKeys}
        onClick={this.preventGroupClick(onClick)}
        onSelect={onSelect}
        defaultCheckedKeys={selectedKeys}
        defaultSelectedKeys={selectedKeys}
        onDoubleClick={this.preventGroupClick(onDoubleClick)}
        onExpand={onExpand}
        onCheck={this.onCheck}
        switcherIcon={<Icon type="down" />}
        setTreeRef={this.setTreeRef}
      >
        {
          groupedRootsEntries.map(([groupId, roots]: [OptionId, TreeOption[]]) => {
            const group = groups.find((curGroup) => String(curGroup.id) === String(groupId));

            return (
              [
                group
              // tree node for group name if any
              && (
              <TreeNode
                isGroup
                disabled
                disableCheckbox
                selectable={false}
                title={group.value}
                key={`group_${group.id}`}
                className="option-group-name"
              />
              ),
                ...roots.map((option) => this.createNodes(option, optionsLookup, childrenLookup)),
              ].filter(Boolean)
            );
          })
      }
      </BaseTree>
    );
  };

  render() {
    const { options } = this.props;

    return this.createTree(options);
  }
}

export default Tree;
