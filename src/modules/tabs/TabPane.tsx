import React from 'react';


interface TabPaneProps {
  /** Tab content */
  children: React.ReactNode;
  /** Show text in TabPane's head */
  tab: string | number;
  /** TabPane's key */
  tabKey: string | number;
  /** Class name */
  className?: string;
}

const TabPane = ({ tabKey, className, children }: TabPaneProps) => (
  <div
    key={tabKey}
    className={className || ''}
  >
    {children}
  </div>
);

export default TabPane;
