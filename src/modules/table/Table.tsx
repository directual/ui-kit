import React, { Component } from 'react';
import Icon from '../icon/index';
import Checkbox from '../checkbox/Checkbox';
import Spinner from '../loader/Spinner';
import { Column, ColumnsGroup, TableProps } from './types';
import style from './Table.module.scss';


interface State {
  startHideIndex: number,
  endHideIndex: number,
  enableShadow: boolean,
}

interface SelectProtected {
  scrollNode: HTMLDivElement,
  startBuffer: HTMLTableRowElement,
  endBuffer: HTMLTableRowElement,
}

const cellHeight = 40;
const rowBufferCount = 20;

class Table extends Component<TableProps, State> {
  ticking = false;

  selectProtected: SelectProtected = {
    scrollNode: document.createElement('div'),
    startBuffer: document.createElement('tr'),
    endBuffer: document.createElement('tr'),
  };

  lastScrollTop = 0;

  constructor(props: TableProps) {
    super(props);
    this.state = {
      startHideIndex: 0,
      endHideIndex: 50,
      enableShadow: false,

    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps: TableProps): void {
    const { scrollTop } = this.props;
    if (this.selectProtected.scrollNode && scrollTop && scrollTop !== prevProps.scrollTop) {
      this.selectProtected.scrollNode.scrollTop = scrollTop;
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onSelect = (rowKey: number | string | 'all') => () => {
    const { onSelect } = this.props;
    if (onSelect) {
      this.onSort(rowKey);
    }
  };

  onSort = (rowKey: number | string) => (): void => {
    const { onSort } = this.props;
    if (onSort) {
      onSort(rowKey);
    }
  };

  handleScroll = () => {
    const {
      enableShadow,
      startHideIndex,
      endHideIndex,
    } = this.state;
    const {
      onScrollEnd,
    } = this.props;
    const scrollTopNow = this.selectProtected.scrollNode
      ? this.selectProtected.scrollNode.scrollTop
      : 0;
    if (!enableShadow
      && this.selectProtected.scrollNode
      && this.selectProtected.scrollNode.scrollLeft > 0) {
      this.setState({ enableShadow: true });
    } else if (enableShadow
      && this.selectProtected.scrollNode
      && this.selectProtected.scrollNode.scrollLeft === 0) {
      this.setState({ enableShadow: false });
    }

    if (this.selectProtected.scrollNode
      && scrollTopNow === (
        this.selectProtected.scrollNode.scrollHeight - this.selectProtected.scrollNode.clientHeight
      )) {
      if (onScrollEnd) {
        onScrollEnd(scrollTopNow);
      }
    }
    const raf = window.requestAnimationFrame;

    if (!this.ticking) {
      raf(() => {
        const windowHeight = document.documentElement ? document.documentElement.clientHeight : 0;
        const hideStartIndex = Math.floor(scrollTopNow / cellHeight) - rowBufferCount;
        const hideEndIndex = Math.floor(scrollTopNow / cellHeight)
          + Math.floor(windowHeight / cellHeight) + rowBufferCount;
        if (this.calcAbsDiff(hideStartIndex, startHideIndex) > (rowBufferCount / 2)
          || this.calcAbsDiff(hideEndIndex, endHideIndex) > (rowBufferCount / 2)) {
          this.infiniteScroll(scrollTopNow, hideStartIndex, hideEndIndex);
        }
        this.ticking = false;
      });
      this.ticking = true;
    }

    this.lastScrollTop = scrollTopNow;
  };

  emptyFunction = () => {};

  infiniteScroll = (scrollTopNow: number, startIndex: number, endIndex: number) => {
    const { dataSource } = this.props;
    const dataLength = dataSource.length;
    let hideStartIndex = startIndex;
    const hideEndIndex = endIndex;
    let endBufferIndex = dataLength - hideEndIndex;
    if (dataLength - hideEndIndex < 0) {
      endBufferIndex = 0;
    }
    // scroll down
    if (scrollTopNow > this.lastScrollTop) {
      if (hideStartIndex > 0) {
        this.selectProtected.startBuffer.style.height = `${hideStartIndex * cellHeight}px`;
        this.selectProtected.endBuffer.style.height = `${endBufferIndex * cellHeight}px`;
        this.setState({ startHideIndex: hideStartIndex, endHideIndex: hideEndIndex });
      }
    // scroll up
    } else {
      if (hideStartIndex < 0) {
        hideStartIndex = 0;
      }
      this.selectProtected.startBuffer.style.height = `${hideStartIndex * cellHeight}px`;
      this.selectProtected.endBuffer.style.height = `${endBufferIndex * cellHeight}px`;
      this.setState({ startHideIndex: hideStartIndex, endHideIndex: hideEndIndex });
    }
  };

  calcAbsDiff = (num1: number, num2: number) => ((num1 > num2) ? num1 - num2 : num2 - num1);

  renderRowCheckbox = (
    data: { id: number | string, [key: string]: number | string },
    col: Column,
    index: number,
    selectedRowKeys: { [key: string]: boolean },
  ) => {
    const {
      rowKey, selectedRows, fixed, checkable,
    } = this.props;
    const { enableShadow } = this.state;

    return (
      <td
        className={[
          col.className ? col.className : '',
          fixed ? style['fixed-column'] : '',
        ].join(' ')}
        key={`${data.id}_${col.key}`}
      >
        <div className={style['color-wrapper']}>
          <span className={style['checkbox-wrapper']}>
            {
              checkable
              && (
              <Checkbox
                onChange={this.onSelect(data[rowKey])}
                className={style['table-checkbox']}
                checked={selectedRows === 'all' || selectedRowKeys[data[rowKey]]}
              />
              )
            }
            <span className={style['cell-text']}>
              { this.renderColCell(col, data, index) }
            </span>
          </span>
        </div>
        {fixed && enableShadow && <div className={style['table-shadow']} />}
      </td>
    );
  };

  renderColCell = (
    col: Column,
    data: { id: number | string, [key: string]: number | string },
    index: number,
  ) => {
    if (!col.key || !data) return null;

    if (col.render && typeof col.render === 'function') {
      return col.render(data[col.key], data, index);
    }
    return data[col.key];
  };

  renderHeaderCheckbox = (col: Column) => {
    const {
      sortColumn, selectedRows, columnsGroups, fixed, checkable,
    } = this.props;
    const { enableShadow } = this.state;
    return (
      <td
        key={`td_${col.key}`}
        className={[
          col.className ? col.className : '',
          columnsGroups ? style['additional-margin'] : '',
          fixed ? style['fixed-column-header'] : '',
        ].join(' ')}
      >
        <div
          className={[
            style['color-wrapper'],
            col.sortable ? style['sortable-cell'] : '',
            sortColumn === col.key ? style['accent-cell'] : '',
          ].join(' ')}
        >
          <div className={style['cell-wrapper']}>

            {
            checkable
            && (
            <span className={style['checkbox-wrapper']}>
              <Checkbox
                checked={selectedRows && selectedRows === 'all'}
                indeterminate={selectedRows !== undefined && selectedRows.length !== 0 && selectedRows !== 'all'}
                onChange={this.onSelect('all')}
                className={style['table-checkbox']}
              />
            </span>
            )
          }
            <div
              className={[style['cell-with-icon'], style['cell-text']].join(' ')}
              onClick={col.sortable ? this.onSort(col.key) : this.emptyFunction}
            >
              <span>{col.title}</span>
              { col.sortable && this.renderSortIcon(col) }
            </div>
          </div>
        </div>
        {fixed && enableShadow && <div className={style['table-shadow']} />}
      </td>
    );
  };

  renderSortIcon = (col: Column) => {
    const { sortColumn, sortOrder } = this.props;
    return (
      <span className={style['col-sort-icon']}>
        { sortColumn === col.key && sortOrder === 'asc' && <Icon type="up" /> }
        { sortColumn === col.key && sortOrder === 'desc' && <Icon type="down" /> }
      </span>
    );
  };

  renderMainHeaderCell = (group: ColumnsGroup, fixedFlag: boolean) => {
    const { sortColumn, sortOrder } = this.props;
    const { enableShadow } = this.state;
    return (
      <td
        key={`mainGroup_${group.key}`}
        colSpan={fixedFlag ? 1 : group.columns.length}
        className={[
          fixedFlag ? style['fixed-column-header'] : '',
        ].join(' ')}
      >
        <div
          className={[
            style['color-wrapper'],
            // TODO будет время - переписать на lookup проверку
            group.columns.some((col) => col === sortColumn) && sortOrder ? style['accent-cell'] : '',
          ].join(' ')}
        >
          <span className={style['cell-text']}>{group.title}</span>
        </div>
        {fixedFlag && enableShadow && <div className={style['table-shadow']} />}
      </td>
    );
  };

  render() {
    const {
      fixed, columnsGroups, columns, dataSource, rowKey, selectedRows, sortColumn, isLoading,
    } = this.props;
    const { startHideIndex, endHideIndex } = this.state;
    const selectedRowKeys = {};
    if (Array.isArray(selectedRows) && selectedRows.length > 0) {
      selectedRows.forEach((item) => {
        selectedRowKeys[item] = true;
      });
    }

    let groupItemsLength = 0;
    let sortedColumns = columns;

    if (columnsGroups) {
      sortedColumns = [];
      columnsGroups.forEach((group) => {
        groupItemsLength += group.columns.length;
        group.columns.forEach((col) => {
          const column = columns.find((item) => item.key === col);
          if (column) {
            sortedColumns.push(column);
          }
        });
      });

      columns.forEach((col) => {
        if (!sortedColumns.some((sortCol) => sortCol.key === col.key)) {
          sortedColumns.push(col);
        }
      });
    }

    let fixedCol: Column = {
      title: '',
      key: '',
    };
    let fixedColGroup = null;
    if (fixed && columns.some((col) => col.key === fixed)) {
      fixedCol = columns.find((col) => col.key === fixed) || fixedCol;
      if (fixedCol.key && columnsGroups) {
        columnsGroups.forEach((group) => {
          if (group.columns.some((col) => col === fixedCol.key)) {
            fixedColGroup = group;
          }
        });
      }
    }

    return (
      <div
        onScroll={this.handleScroll}
        ref={(node) => { if (node) this.selectProtected.scrollNode = node; }}
        className={style['tables-wrapper']}
      >
        <table className={style.table}>
          <colgroup>
            { sortedColumns && sortedColumns.map((col) => (
              <col
                key={`col_${col.key}`}
                style={{ width: col.width ? `${col.width}px` : '', minWidth: col.width ? `${col.width}px` : '' }}
              />
            ))}
          </colgroup>
          <thead className={style.header}>
            {columnsGroups
              && (
              <tr className={style['main-header-row']}>
                {fixedColGroup !== null
                  && fixedColGroup !== undefined
                  && this.renderMainHeaderCell(fixedColGroup, true)}
                { columnsGroups.map((group) => this.renderMainHeaderCell(group, false)) }
                { groupItemsLength < columns.length
                  && <td key="empty-col" colSpan={columns.length - groupItemsLength} className={style.headerCell} />}
              </tr>
              )}
            <tr className={style['header-row']}>
              { fixedCol && this.renderHeaderCheckbox(fixedCol) }
              { sortedColumns && sortedColumns.map((col, index) => {
                if (index === 0 && !fixed) return this.renderHeaderCheckbox(col);
                if (col.key === fixed) return null;
                return (
                  <td
                    key={`td_${col.key}`}
                    colSpan={1}
                    className={[
                      col.className ? col.className : '',
                      columnsGroups ? style['additional-margin'] : '',
                    ].join(' ')}
                  >
                    <div
                      className={[
                        style['color-wrapper'],
                        col.sortable ? style['sortable-cell'] : '',
                        sortColumn === col.key ? style['accent-cell'] : '',
                      ].join(' ')}
                    >
                      <div onClick={col.sortable ? this.onSort(col.key) : this.emptyFunction} className={style['cell-wrapper']}>
                        <span className={style['cell-text']}>{col.title}</span>
                        { col.sortable && this.renderSortIcon(col) }
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody className={style['table-body']}>
            <tr className={style['start-buffer']} ref={(node) => { if (node) this.selectProtected.startBuffer = node; }} />
            {/* TODO будет время - посмотреть что можно объединить что бы уменьшить рендер */}
            { dataSource.map((data, index) => {
              if (index < startHideIndex || index > endHideIndex) return null;
              return (
                <tr
                  key={`tr_${data.id}`}
                  className={[
                    style.row,
                    selectedRows === 'all' || selectedRowKeys[data[rowKey]] ? style['row-checked'] : '',
                  ].join(' ')}
                >
                  { fixedCol !== undefined
                    && fixedCol !== null
                    ? this.renderRowCheckbox(data, fixedCol, index, selectedRowKeys) : null }
                  { sortedColumns.map((col, colIndex) => {
                    if (colIndex === 0 && !fixed) {
                      return this.renderRowCheckbox(data, col, index, selectedRowKeys);
                    }
                    if (col.key === fixed) {
                      return null;
                    }
                    return (
                      <td className={col.className ? col.className : ''} key={`${data.id}_${col.key}`}>
                        <div className={style['color-wrapper']}>
                          <span className={style['cell-text']}>
                            { this.renderColCell(col, data, index) }
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className={style['start-buffer']} ref={(node) => { if (node) this.selectProtected.endBuffer = node; }} />
          </tbody>
        </table>
        { isLoading
          ? (
            <>
              <div className={style['table-loader']}><Spinner size="big" /></div>
            </>
          )
          : <div className={style['table-loader']} />}
      </div>
    );
  }
}

export default Table;
