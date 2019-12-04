import React from 'react';
import IconButton from '../button/IconButton';
import style from './Collapse.module.scss';
import { PanelProps } from './types';


const Panel: React.FunctionComponent<PanelProps> = ({
  keyProp, isExpanded, onExpand, label, children,
}) => {
  const emptyClick = () => {};
  return (
    <div className={style['collapse-panel']} key={keyProp}>
      <div
        className={style['panel-header']}
        onClick={onExpand}
      >
        <IconButton
          className={style['panel-header__collapse-icon']}
          icon={isExpanded ? 'down' : 'forward'}
          onClick={emptyClick}
        />
        <div className={style['panel-header__label']}>
          {label || null}
        </div>
      </div>

      {
      isExpanded
        ? (
          <div className={style['panel-body']}>
            {children}
          </div>
        )
        : null
    }
    </div>
  );
};

export default Panel;
