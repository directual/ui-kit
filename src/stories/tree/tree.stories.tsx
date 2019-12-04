// eslint-disable-next-line max-classes-per-file
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tree } from '../../export';


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
        id: 1, value: 'Красные', groupId: 111, parentId: null, icon: 'babai',
      },
      {
        id: 2, value: 'Красные', groupId: 111, parentId: 1, icon: 'clocks',
      },
      {
        id: 3, value: 'Апельсины', groupId: 111, parentId: 2,
      },
      {
        id: 4, value: 'option 4', groupId: 222, parentId: null,
      },
      {
        id: 5, value: 'option 5', groupId: 222, parentId: 4,
      },
      {
        id: 6, value: 'option 6', groupId: 222, parentId: 4,
      },
      {
        id: 7, value: 'option 7', groupId: 222, parentId: 5,
      },
      {
        id: 8, value: 'option 8', groupId: 222, parentId: 5,
      },
      {
        id: 9, value: 'option 9', groupId: 333, parentId: null,
      },
      { id: 10, value: 'option no group 10', parentId: null },
      {
        id: 11, value: 'option no group 11', groupId: 555, parentId: null,
      },
    ],
    groups: [
      { id: 111, value: 'Фрукты' },
      { id: 222, value: 'Group 2' },
      { id: 333, value: 'Group 3' },
    ],
  };

  treeRef = null;

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
        <h1>Tree</h1>

        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{
            width: '400px', margin: '10px', overflow: 'auto', backgroundColor: 'white',
          }}
          >
            <Tree
              selectable
              multiple
              selected={selected}
              options={options}
              groups={groups}
              defaultExpandedKeys={['8']}
                // checkable
                // onCheck={}
              onClick={(e, node) => {
                action('onClick:::')(node);
                this.setExpanded(node);
              }}
              onExpand={(expandedKeys, nodeExpandedEvent) => {
                action('onExpand:::')({
                  expandedKeys,
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
              setTreeRef={(ref) => { this.treeRef = ref; }}
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
        id: 1, value: 'Красные', groupId: 111, parentId: null, icon: 'babai',
      },
      {
        id: 2, value: 'Красные', groupId: 111, parentId: 1, icon: 'clocks',
      },
      {
        id: 3, value: 'Апельсины', groupId: 111, parentId: 2,
      },
      {
        id: 4, value: 'option 4', groupId: 222, parentId: null,
      },
      {
        id: 5, value: 'option 5', groupId: 222, parentId: 4,
      },
      {
        id: 6, value: 'option 6', groupId: 222, parentId: 4,
      },
      {
        id: 7, value: 'option 7', groupId: 222, parentId: 5,
      },
      {
        id: 8, value: 'option 8', groupId: 222, parentId: 5,
      },
      {
        id: 9, value: 'option 9', groupId: 333, parentId: null,
      },
      { id: 10, value: 'option no group 10', parentId: null },
      {
        id: 11, value: 'option no group 11', groupId: 555, parentId: null,
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

const storyTree:any = storiesOf('Tree', module);

storyTree
  .add('Tree', () => (<SimpleTree />), {
    info: {
      inline: true,
      header: true,
    },
});

storyTree
  .add('Checkable', () => (<CheckableTree />), {
    info: {
      inline: true,
      header: true,
    }
});

export default storyTree;
