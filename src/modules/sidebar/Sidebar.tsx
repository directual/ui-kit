import React, { Component } from 'react';
import style from './Sidebar.module.scss';


interface SidebarProps {
  /** список кнопок навигации
   * render: string, key: string, onAction: () => void, href если надо кнопку отобразить как ссылку
   * */
  navList: Array<React.ReactNode>,
  // onClick: Array<React.ReactNode>,
  // activeTab: string | number,
}

class Sidebar extends Component<SidebarProps> {
  render() {
    const { navList } = this.props;

    return (
      <div className={style.sidebar}>
        <div className={style.groupIconWrapper}>
          { navList.map((item: React.ReactNode) => item)}
        </div>
      </div>
    );
  }
}

export default Sidebar;
