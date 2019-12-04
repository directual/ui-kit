import React, { Component } from 'react';
import styles from './Dropzone.module.scss';

type Props = {
  children: (isDraggingOver: boolean) => React.ReactNode | Array<React.ReactNode>;
  onFilesPick: (files: FileList | null) => void;
  accept: Array<string>;
  multiple?: boolean;
};

type State = {
  isDraggingOver: boolean;
};

class Dropzone extends Component<Props, State> {
  fileInput: any;

  state = {
    isDraggingOver: false,
  };

  constructor(props: Props) {
    super(props);
    this.fileInput = React.createRef();
  }

  preventDefaults = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  onClick = () => {
    this.fileInput.current.click();
  };

  onDragEnter = (evt: React.MouseEvent<HTMLElement>) => {
    this.preventDefaults(evt);
    this.setState({ isDraggingOver: true });
  };

  onDragLeave = (evt: React.MouseEvent<HTMLElement>) => {
    this.preventDefaults(evt);
    this.setState({ isDraggingOver: false });
  };

  onDragOver = (evt: React.MouseEvent<HTMLElement>) => {
    this.preventDefaults(evt);
    this.setState({ isDraggingOver: true });
  };

  onDrop = (evt: React.DragEvent<HTMLDivElement>) => {
    this.preventDefaults(evt);
    this.setState({ isDraggingOver: false });
    const { dataTransfer } = evt;
    const { files } = dataTransfer;
    const { onFilesPick } = this.props;
    onFilesPick(files);
  };

  onFilePick = (evt: React.ChangeEvent<HTMLInputElement & EventTarget>) => {
    const { files } = evt.target;
    const { onFilesPick } = this.props;
    onFilesPick(files);
  };

  render() {
    const {
      accept,
      multiple,
      children,
    } = this.props;
    const { isDraggingOver } = this.state;
    const acceptDescription = accept.join(',');
    return (
      <div
        className={styles.container}
        onClick={this.onClick}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <input
          type="file"
          className={styles.fileInput}
          ref={this.fileInput}
          onChange={this.onFilePick}
          multiple={multiple}
          accept={acceptDescription}
        />
        {children(isDraggingOver)}
      </div>
    );
  }
}

export default Dropzone;
