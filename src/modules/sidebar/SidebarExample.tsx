/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import IconButton from '../button/IconButton';
import './Sidebar.scss';


class SidebarExample extends Component<{}, {activeTab: string | number}> {
  state = {
    activeTab: '0',
  };

  changeNavMode = () => {
    this.setState({ activeTab: '0' });
  };

  changeNavItem = (itemNumber: string) => () => {
    this.setState({ activeTab: itemNumber });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div style={{ width: 120, height: '1000px', backgroundColor: '#F1CFF8' }}>
        <Sidebar
          navList={[
            <a target="_blank" href="#">
              <IconButton
                onClick={this.changeNavItem('6')}
                icon="grater"
                key="6"
                className={`${activeTab === '6' ? 'str-active-nav' : ''}`}
              />
            </a>,
            <IconButton
              onClick={this.changeNavItem('0')}
              icon="clip"
              key="0"
              className={`${activeTab === '0' ? 'str-active-nav' : ''}`}
            />,
            <IconButton
              onClick={this.changeNavItem('1')}
              icon="clocks"
              key="1"
              className={`${activeTab === '1' ? 'str-active-nav' : ''}`}
            />,
            <IconButton
              onClick={this.changeNavItem('2')}
              icon="configure"
              key="2"
              className={`${activeTab === '2' ? 'str-active-nav' : ''}`}
            />,
            <IconButton
              onClick={this.changeNavItem('3')}
              icon="user"
              key="3"
              className={`${activeTab === '3' ? 'str-active-nav' : ''}`}
            />,
            <IconButton
              onClick={this.changeNavItem('4')}
              icon="version"
              key="4"
              className={`${activeTab === '4' ? 'str-active-nav' : ''}`}
            />,
            <IconButton
              onClick={this.changeNavItem('5')}
              icon="shield"
              key="5"
              className={`${activeTab === '5' ? 'str-active-nav' : ''}`}
            />,
          ]}
        />
      </div>
    );
  }
}


export default SidebarExample;
