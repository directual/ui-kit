import React from 'react';


export interface Column {
  /** Columns title */
  title: number | string,
  /** Columns key */
  key: number | string,
  /** Columns width */
  width?: number,
  /** is Columns sortable */
  sortable?: boolean,
  /** Columns className */
  className?: string,
  /** Custom cell render */
  render?: (text: number | string, data: { id: number | string, [key: string]: number | string }, index: number) => React.ReactNode,
}

export interface ColumnsGroup {
  /** Column Group title */
  title: number | string,
  /** Column Group key */
  key: number | string,
  /** Columns of This Column Group */
  columns: Array<string>,
}

export interface TableProps {
  /** Table columns */
  columns: Array<{
    /** Columns title */
    title: number | string,
    /** Columns key */
    key: number | string,
    /** Columns width */
    width?: number,
    /** is Columns sortable */
    sortable?: boolean,
    /** Columns className */
    className?: string,
    /** Custom cell render */
    render?: (text: number | string, data: { id: number | string, [key: string]: number | string }, index: number) => React.ReactNode,
  }>,
  /** Table data */
  dataSource: Array<{ id: number | string, [key: string]: number | string }>,
  /** Row's unique key - better add id */
  rowKey: number | string,
  /** Key of fixed column */
  fixed?: number | string,
  /** Table columns Groups */
  columnsGroups?: Array<{
    /** Column Group title */
    title: number | string,
    /** Column Group key */
    key: number | string,
    /** Columns of This Column Group */
    columns: Array<string>,
  }>,
  /** On sort function - on header click return id of column */
  onSort?: (id: number | string) => void,
  /** key of sorted column */
  sortColumn?: number | string,
  /** sorting order - asc or desc */
  sortOrder?: 'asc' | 'desc' | '',
  /** on select function - return rowKey of row */
  onSelect?: (rowKey: number | string | 'all') => void,
  /** array of rowKeys or 'all' for all */
  selectedRows?: Array<number | string> | 'all',
  /** turn on/off loader */
  isLoading?: boolean,
  /** function that return scrollTop on scroll to table bottom */
  onScrollEnd?: (scrollTop: number) => void,
  /** scroll in tablet */
  scrollTop?: number,
  /** Should render checkbox for rows and columns */
  checkable?: boolean,
}
