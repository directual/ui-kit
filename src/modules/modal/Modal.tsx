import React from 'react';
import BaseModal from './base';


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
  /** Show modal */
  show: boolean;
  /** modal header */
  header: string;
  /** Buttons elements array */
  buttons: Array<React.ReactNode>;
  /** on Shadow click */
  onClick?: () => void;
  // /** Modal Tabs */
  // tabs?: Array<Column & { tabName: string }>;
  /** Fix 3 column */
  fixColumn?: boolean;
}
class Modal extends React.Component<Props> {
  render() {
    return (
      <BaseModal {...this.props} type="default" />
    );
  }
}

export default Modal;
