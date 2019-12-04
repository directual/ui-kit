// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { action } from '@storybook/addon-actions';

import { Tree } from '../../export';
import storyTree from './tree.stories';

type Props = {};

type State = {
  selected: (number | string)[];
  expandedKeys: string[];
  options: Array<{ id: number, value: string }>;
};

class SimpleTree extends React.Component<Props, State> {
  placeholder: string = 'Выберите из списка';

  state = {
    selected: [1],
    expandedKeys: [] as string[],
    options: [
      {
        id: 1, value: 'Красные', groupId: 111, parentId: null, icon: 'babai', multiline: 'Chop suey',
      },
      {
        id: 2, value: 'Красные', groupId: 111, parentId: 1, icon: 'clocks', multiline: 'Chop suey',
      },
      {
        id: 3, value: 'Апельсины', groupId: 111, parentId: 2, multiline: 'Chop suey',
      },
      {
        id: 4, value: 'option 4', groupId: 222, parentId: null, multiline: 'Chop suey',
      },
      {
        id: 5, value: 'option 5', groupId: 222, parentId: 4, multiline: 'Chop suey',
      },
      {
        id: 6, value: 'option 6', groupId: 222, parentId: 4, multiline: 'Chop suey',
      },
      {
        id: 7, value: 'option 7', groupId: 222, parentId: 5, multiline: 'Chop suey',
      },
      {
        id: 8, value: 'option 8', groupId: 222, parentId: 5, multiline: 'Chop suey',
      },
      {
        id: 9, value: 'option 9', groupId: 333, parentId: null, multiline: 'Chop suey',
      },
      {
        id: 10, value: 'option no group 10', parentId: null, multiline: 'Chop suey',
      },
      {
        id: 11, value: 'option no group 11', groupId: 555, parentId: null, multiline: 'Father!',
      },
    ],
    groups: [
      { id: 111, value: 'Фрукты' },
      { id: 222, value: 'Group 2' },
      { id: 333, value: 'Group 3' },
    ],
  };

  setExpanded = (node: any) => {
    const nodeKey = node.props.eventKey || '';

    if (!nodeKey) return;
    const { expandedKeys } = this.state;

    if (expandedKeys.includes(nodeKey)) {
      this.setState({
        expandedKeys: expandedKeys.filter((key) => key !== nodeKey),
      });
    } else {
      this.setState({
        expandedKeys: [...expandedKeys, nodeKey],
      });
    }
  };

  render() {
    const {
      selected,
      options,
      groups,
      expandedKeys,
    } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Tree</h1>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '800px', margin: '10px' }}>
            <Tree
              selectable
              multiple
              selected={selected}
              options={options}
              groups={groups}
                // checkable
                // onCheck={}
              onClick={(e, node) => {
                action('onClick:::')(node);
                this.setExpanded(node);
              }}
              onExpand={(expKeys, nodeExpandedEvent) => {
                action('onExpand:::')({
                  expKeys,
                  NodeExpandedEvent: nodeExpandedEvent,
                });
                this.setExpanded(nodeExpandedEvent.node);
              }}
              onDoubleClick={(e, node) => {
                action('doubleClick:::')(node);
              }}
              onSelect={(selectedKeys, e) => {
                action('onSelect:::')({
                  selectedKeys,
                  NodeSelectEvent: e,
                });

                this.setState({ selected: selectedKeys.map(Number) });
              }}
              expandedKeys={expandedKeys}
            />
          </div>
        </div>
      </div>
    );
  }
}
class CheckableTree extends React.Component<Props, State> {
  placeholder: string = 'Выберите из списка';

  state = {
    selected: [1, 8],
    expandedKeys: [] as string[],
    options: [
      {
        id: 1, value: 'Красные', groupId: 111, parentId: null, icon: 'babai', multiline: 'Chop suey',
      },
      {
        id: 2, value: 'Красные', groupId: 111, parentId: 1, icon: 'clocks', multiline: 'Chop suey',
      },
      {
        id: 3, value: 'Апельсины', groupId: 111, parentId: 2, multiline: 'Chop suey',
      },
      {
        id: 4, value: 'option 4', groupId: 222, parentId: null, multiline: 'Chop suey',
      },
      {
        id: 5, value: 'option 5', groupId: 222, parentId: 4, multiline: 'Chop suey',
      },
      {
        id: 6, value: 'option 6', groupId: 222, parentId: 4, multiline: 'Chop suey',
      },
      {
        id: 7, value: 'option 7', groupId: 222, parentId: 5, multiline: 'Chop suey',
      },
      {
        id: 8, value: 'option 8', groupId: 222, parentId: 5, multiline: 'Chop suey',
      },
      {
        id: 9, value: 'option 9', groupId: 333, parentId: null, multiline: 'Chop suey',
      },
      {
        id: 10, value: 'option no group 10', parentId: null, multiline: 'Chop suey',
      },
      {
        id: 11, value: 'option no group 11', groupId: 555, parentId: null, multiline: 'Chop suey',
      },
    ],
    groups: [
      { id: 111, value: 'Фрукты' },
      { id: 222, value: 'Group 2' },
      { id: 333, value: 'Group 3' },
    ],
  };

  setExpanded = (node: any) => {
    const nodeKey = node.props.eventKey || '';

    if (!nodeKey) return;
    const { expandedKeys } = this.state;

    if (expandedKeys.includes(nodeKey)) {
      this.setState({
        expandedKeys: expandedKeys.filter((key) => key !== nodeKey),
      });
    } else {
      this.setState({
        expandedKeys: [...expandedKeys, nodeKey],
      });
    }
  };

  render() {
    const {
      selected,
      options,
      groups,
    } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Tree Checkable</h1>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '800px', margin: '10px' }}>
            <Tree
              checkable
              selected={selected}
              options={options}
              defaultExpandedKeys={['4', '5']}
              groups={groups}
              onCheck={(checkedKeys: string[], e) => {
                action('onCheck:::')({
                  checkedKeys,
                  NodeCheckEvent: e,
                });

                this.setState({ selected: checkedKeys.map(Number) });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

storyTree.add('Tree Multiline', () => (<SimpleTree />));
storyTree.add('Checkable Multiline', () => (<CheckableTree />));
