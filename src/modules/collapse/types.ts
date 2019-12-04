import React from 'react';


export interface PanelProps {
  /** Unique panel key */
  keyProp: string;
  /** Is expanded */
  isExpanded: boolean;
  /** Action on panel expand */
  onExpand?: () => void;
  /** Expand content */
  children: React.ReactNode;
  /** Panel label showed in panel header */
  label?: string;
}

export interface CollapsePanelProps {
  /** Unique panel key */
  key?: string;
  /** Is expanded */
  isExpanded?: boolean;
  /** Action on panel expand */
  onExpand?: () => void;
  /** Expand content */
  children?: React.ReactNode;
  /** Panel label showed in panel header */
  label?: string;
}

export interface CollapseProps {
  /** Collapse content */
  children: Array<React.ReactNode>;
  /** keys of default expanded panels */
  defaultExpandedKeys?: string[];
  /** keys of expanded panels */
  expandContent?: React.ReactNode;
}
