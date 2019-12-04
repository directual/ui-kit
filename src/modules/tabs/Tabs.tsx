import React from 'react';
import cn from 'classnames';
import style from './Tabs.module.scss';


type TabKey = string | number;

interface TabsProps {
  /** Tabs content */
  children: React.ReactNode,
  /** Current TabPane's key */
  activeKey?: TabKey,
  /** Initial active TabPane's key, if activeKey is not set. */
  defaultActiveKey?: TabKey,
  /** Callback executed when active tab is changed */
  onChange?: (tabKey: TabKey) => void,
}

interface TabsState {
  activeKey?: TabKey,
}

class Tabs extends React.Component<TabsProps, TabsState> {
  constructor(props: TabsProps) {
    super(props);
    const {
      activeKey,
      defaultActiveKey,
    } = this.props;

    let curActiveKey;
    if (activeKey) {
      curActiveKey = activeKey;
    } else if (defaultActiveKey) {
      curActiveKey = defaultActiveKey;
    }

    this.state = {
      activeKey: curActiveKey,
    };
  }

  tabClick = (tabKey: TabKey) => (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.stopPropagation();
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(tabKey);
    } else {
      this.setState({ activeKey: tabKey });
    }
  };

  getTabsData = (children: React.ReactNode) => {
    const { activeKey: activeKeyProp } = this.props;
    const { activeKey: activeKeyState } = this.state;
    const activeKey = activeKeyProp || activeKeyState;
    const tabButtons: Array<{ tab: string, tabKey: string }> = [];
    const activeTab = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        tabButtons.push({ tabKey: child.props.tabKey, tab: child.props.tab });
        if (String(child.props.tabKey) === String(activeKey)) {
          return React.cloneElement(child);
        }
      }
      return null;
    });
    return { tabButtons, activeTab };
  };

  render() {
    const { children, activeKey: activeKeyProp } = this.props;
    const { activeKey: activeKeyState } = this.state;
    const { tabButtons, activeTab } = this.getTabsData(children);
    const activeKey = activeKeyProp || activeKeyState;

    return (
      <div className="str-tabs">
        <div className={cn(style.tabWrapper, 'str-tabs-bar')}>
          <div className="str-tabs-nav-container">
            { tabButtons.map((item) => (
              <button
                className={cn(style.tab, {
                  [style.selected]: String(item.tabKey) === String(activeKey),
                })}
                key={item.tabKey}
                onClick={this.tabClick(item.tabKey)}
                type="button"
              >
                { item.tab }
              </button>
            ))}
          </div>
        </div>
        <div>
          { Array.isArray(activeTab) && activeTab.length ? activeTab[0] : activeTab }
        </div>
      </div>
    );
  }
}


export default Tabs;
