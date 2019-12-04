import React from 'react';
import cn from 'classnames';
import styles from './FileUpload.module.scss';
import Icon from '../icon/index';
import Dropzone from './Dropzone/Dropzone';
import UploadFileList from './Filelist/FileList';
import { File } from './types';

const UPLOAD_TEXT = 'Click or drag file to this area to upload';

type Props = {
  /** Handle when files picked/dropped */
  onFilesPick: (files: FileList | null) => void;
  /** Files that are shown in list below drop zone */
  files: Array<File>,
  /** Handle cancel on item close icon */
  onCancel: (arg: string) => void,
  /** Handle try again click when error happens */
  onTryAgain: (arg: string) => void,
  /** Allow to pick/drop multiple files */
  multiple?: boolean,
  /** Array of allowed extensions */
  accept?: Array<string>,
};

const FileUpload = ({
  onFilesPick, multiple, files, onCancel, onTryAgain, accept = [],
}: Props) => (
  <div className={styles.uploadWrapper}>
    <Dropzone
      onFilesPick={onFilesPick}
      multiple={multiple}
      accept={accept}
    >
      {(isDraggingOver) => (
        <div className={cn(styles.dragzone, {
          [styles.isDragging]: isDraggingOver,
        })}
        >
          <Icon type="import" className={styles.icon} />
          <p className={styles.text}>{UPLOAD_TEXT}</p>
        </div>
      )}
    </Dropzone>
    <UploadFileList
      files={files}
      onCancel={onCancel}
      onTryAgain={onTryAgain}
      accept={accept}
    />
  </div>
);

export default FileUpload;
