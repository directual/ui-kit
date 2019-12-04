import React, { Component } from 'react';
import Tabs from '../tabs/Tabs';
import TabPane from '../tabs/TabPane';
import './Modal.scss';


interface Column {
  /** Tab name */
  tabName?: string,
  /** Columns number - 1, 2 or 3 */
  columnsNumber?: 1 | 2 | 3;
  /** Column 1 content */
  column1?: React.ReactNode;
  /** Column 2 content */
  column2?: React.ReactNode;
  /** Column 3 content */
  column3?: React.ReactNode;
}

export interface Props extends Column {
  type: 'default' | 'tabs',
  /** Show modal */
  show: boolean;
  /** modal header */
  header: string;
  /** Buttons elements array */
  buttons: Array<React.ReactNode>;
  /** on Shadow click */
  onClick?: () => void;
  /** Modal Tabs */
  tabs?: Array<Column & { tabName: string }>;
  /** Fix 3 column */
  fixColumn?: boolean;
}

interface State {
  winScroll: number;
}

interface SelectProtected {
  scrollNode: HTMLDivElement,
}

class BaseModal extends Component<Props, State> {
  state = {
    winScroll: 0,
  };

  selectProtected: SelectProtected = {
    scrollNode: document.createElement('div'),
  };

  handleScroll = () => {
    const scrollTopNow = this.selectProtected.scrollNode
      ? this.selectProtected.scrollNode.scrollTop
      : 0;

    this.setState({ winScroll: scrollTopNow });
  };

  renderContent = () => {
    const {
      type,
      tabs,
      column1,
      column2,
      column3,
      columnsNumber,
    } = this.props;
    if (type === 'tabs') {
      return (
        <div className="modal-body">
          <div className="modal-tab-wrapper">
            {tabs && (
              <Tabs defaultActiveKey="0">
                {tabs.map((tabPane, index) => (
                  <TabPane tab={tabPane.tabName} tabKey={index}>
                    {
                      this.getColumns(
                        tabPane.columnsNumber ? tabPane.columnsNumber : 2,
                        tabPane.column1 ? tabPane.column1 : null,
                        tabPane.column2 ? tabPane.column2 : null,
                        tabPane.column3 ? tabPane.column3 : null,
                      )
                    }
                  </TabPane>
                ))}
              </Tabs>
            )}
          </div>
        </div>
      );
    }
    return this.getColumns(
      columnsNumber || 2,
      column1 || null,
      column2 || null,
      column3 || null,
    );
  };

  getColumns = (
    columnsNumber: number,
    column1: React.ReactNode | null,
    column2: React.ReactNode | null,
    column3: React.ReactNode | null,
  ): React.ReactNode => {
    const { tabs, fixColumn } = this.props;
    const { winScroll } = this.state;
    const className = tabs ? 'modal-body with-tabs' : 'modal-body no-tabs';
    if (columnsNumber === 1) {
      return (
        <div className={className}>
          <div className="column-big">{column1 || null}</div>
        </div>

      );
    }
    if (columnsNumber === 3) {
      return (
        <div className={className}>
          <div className="column-small-1">{column1 || null}</div>
          <div className="column-small-2">{column2 || null}</div>
          <div className="column-small-3">{column3 || null}</div>
        </div>
      );
    }
    const styles = {
      marginTop: '',
    };
    if (fixColumn && winScroll) {
      styles.marginTop = `${winScroll}px`;
    }
    return (
      <div className={className}>
        <div className="column-middle">{column1 || null}</div>
        <div
          style={styles}
          className={`column-small-3 ${fixColumn ? 'fixed-column' : ''}`}
        >
          {column2 || null}
        </div>
      </div>
    );
  };

  eventStopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  render() {
    const {
      show, onClick, header, buttons = [], tabs,
    } = this.props;
    const { winScroll } = this.state;
    return (
      <>
        {show && (
          <div
            className="modal-wrapper"
            onClick={onClick || (() => {})}
          >
            <div className="modal-shadow-wrapper">
              <div className="modal-shadow" />
            </div>
            <div className="modal-content-wrapper">
              <div className="modal-header-wrapper" onClick={this.eventStopPropagation}>
                <div className={`modal-header ${winScroll ? 'modal-header-scrolled' : ''}`}>
                  <div className="header">{header}</div>
                  <div className="buttons">
                    {buttons.map((item) => item)}
                  </div>
                </div>
              </div>
              <div
                className="modal-content"
                style={tabs ? { overflow: 'unset' } : {}}
                ref={(node) => {
                  if (node) this.selectProtected.scrollNode = node;
                }}
                onScroll={this.handleScroll}
                onClick={this.eventStopPropagation}
              >
                <div className="animation-wrapper">
                  {this.renderContent()}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}


export default BaseModal;
