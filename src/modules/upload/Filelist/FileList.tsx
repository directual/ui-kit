/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import cn from 'classnames';
import styles from './Filelist.module.scss';
import Icon from '../../icon';
import Spinner from '../../loader/Spinner';
import { ListProps, ItemProps } from '../types';

const UNABLE_TO_UPLOAD_TEXT = 'Unable to upload file ';
const TRY_AGAIN_TEXT = 'Try again';
const NOT_SUPPORTED_TEXT = 'File format not supported.';

const fileStatuses = {
  loading: 'loading',
  loaded: 'loaded',
  error: 'error',
  notSupported: 'notSupported',
};

const renderStatusIcon = (status: string) => {
  if (status === fileStatuses.loading) {
    return <span className={styles.spinner}><Spinner /></span>;
  }
  return <Icon className={cn(styles.progressIcon, styles[status])} type="clip" />;
};

const renderErrorInfo = (status: string, accept: Array<string>, onTryAgain: () => void) => {
  if (status === fileStatuses.error) {
    return (
      <div className={styles.comment}>
        {UNABLE_TO_UPLOAD_TEXT}
        <span className={styles.tryAgain} onClick={onTryAgain}>
          {TRY_AGAIN_TEXT}
        </span>
      </div>
    );
  }
  if (status === fileStatuses.notSupported) {
    const supportedExtensions = accept
      .map((ext) => ext.substr(1).toUpperCase())
      .join(', ');
    return (
      <div className={styles.comment}>
        {`${NOT_SUPPORTED_TEXT} Use ${supportedExtensions}`}
      </div>
    );
  }
  return null;
};

const FileItem = ({
  name, status, onCancel, onTryAgain, accept,
}: ItemProps) => (
  <li className={styles.item}>
    <div className={styles.mainInfo}>
      <span className={styles.status}>{renderStatusIcon(status)}</span>
      <span className={styles.fileName}>{name}</span>
      <Icon className={styles.cancelIcon} type="close" onClick={onCancel} />
    </div>
    {renderErrorInfo(status, accept, onTryAgain)}
  </li>
);

const FileList = ({
  files, onCancel, onTryAgain, accept,
}: ListProps) => (
  <ul className={styles.list}>
    {files.map(({ id, name, status }) => (
      <FileItem
        key={id}
        name={name}
        status={status}
        accept={accept}
        onCancel={() => onCancel(id)}
        onTryAgain={() => onTryAgain(id)}
      />
    ))}
  </ul>
);

export { fileStatuses };
export default FileList;
