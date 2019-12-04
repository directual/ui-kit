import React, { Component } from 'react';
import Panel from './Panel';
import style from './Collapse.module.scss';
import { CollapseProps, CollapsePanelProps } from './types';

interface CollapseState {
  expandedKeys: {
    [key: string]: boolean,
  };
}

class Collapse extends Component<CollapseProps, CollapseState> {
  source: any;

  constructor(props: CollapseProps) {
    super(props);

    const { defaultExpandedKeys } = this.props;
    const expandedKeys = {};

    if (defaultExpandedKeys && defaultExpandedKeys.length) {
      defaultExpandedKeys.forEach((key) => {
        expandedKeys[key] = true;
      });
    }

    this.state = {
      expandedKeys,
    };
  }

  onExpand = (key: string | number) => ():void => {
    const { expandedKeys } = this.state;

    const isKeyExpanded: boolean = expandedKeys[key];

    this.setState({
      expandedKeys: {
        ...expandedKeys,
        [key]: !isKeyExpanded,
      },
    });
  };

  static Panel: React.FunctionComponent<CollapsePanelProps>;

  render() {
    const { children } = this.props;
    const { expandedKeys } = this.state;

    return (
      <div className={style.collapse}>
        {
          React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              if (child.type !== Panel) return child;
              const key = child.key || index;

              return React.cloneElement(child, {
                keyProp: key,
                isExpanded: expandedKeys[key],
                onExpand: this.onExpand(key),
              });
            }
            return null;
          })
        }
      </div>
    );
  }
}

Collapse.Panel = Panel;


export default Collapse;
