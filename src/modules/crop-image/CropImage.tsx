/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import Button from '../button/Button';
import Icon from '../icon/index';
import FileUpload from '../upload/FileUpload';

import 'react-image-crop/dist/ReactCrop.css';
import { fileStatuses } from '../upload/Filelist/FileList';
import { File } from '../upload/types';
import style from './CropImage.module.scss';


interface Crop {
  unit: '%' | 'px',
  width: number,
  height: number,
  x: number,
  y: number,
}

interface Props {
  /** onOk handler return image in base64 */
  onOk: (arg: string) => void;
  /** array of accepted formats of files */
  accept: Array<string>;
  /** header string */
  header?: string,
  /** text for buttons */
  locale?: {
    ok?: string,
    cancel?: string,
    refresh?: string,
  }
}

interface State {
  files: Array<File>,
  fileName: string,
  src?: string | ArrayBuffer | null,
  croppedImageUrl: string,
  crop: Crop,
  refresh: boolean,
}


interface SelectProtected {
  canvas: HTMLCanvasElement,
  imageRef: HTMLImageElement,
  fileUrl: string,
}

class CropImage extends Component<Props, State> {
  selectProtected: SelectProtected = {
    imageRef: document.createElement('img'),
    canvas: document.createElement('canvas'),
    fileUrl: '',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      files: [],
      fileName: '',
      src: '',
      croppedImageUrl: '',
      crop: {
        unit: '%',
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      refresh: false,
    };
  }

  componentDidMount(): void {
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value(callback: (arg: Blob) => {}, type: string, quality: string) {
          const canvas = this;
          setTimeout(() => {
            const binStr = atob(canvas.toDataURL(type, quality).split(',')[1]);
            const len = binStr.length;
            const arr = new Uint8Array(len);

            for (let i = 0; i < len; i += 1) {
              arr[i] = binStr.charCodeAt(i);
            }

            callback(new Blob([arr], { type: type || 'image/png' }));
          });
        },
      });
    }
  }

  onImageLoaded = (image: HTMLImageElement) => {
    this.selectProtected.imageRef = image;
  };

  onCropComplete = (crop: Crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop: Crop) => {
    this.setState({ crop });
  };

  getCroppedImg(image: HTMLImageElement, crop: Crop, fileName: string): Promise<string> {
    if (!this.selectProtected.canvas || !this.isCanvasSupported()) {
      throw new Error('Your browser doesn\'t support canvas ');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    this.selectProtected.canvas.width = crop.width;
    this.selectProtected.canvas.height = crop.height;
    const ctx = this.selectProtected.canvas.getContext('2d');

    // @ts-ignore
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      this.selectProtected.canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          reject();
        }
        // @ts-ignore
        blob.name = fileName;
        window.URL.revokeObjectURL(this.selectProtected.fileUrl);
        this.selectProtected.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.selectProtected.fileUrl);
      }, 'image/jpeg');
    });
  }

  getCroppedBase64(image: HTMLImageElement, crop: Crop): string {
    if (!this.selectProtected.canvas || !this.isCanvasSupported()) throw new Error('Your browser doesn\'t support canvas ');

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    this.selectProtected.canvas.width = crop.width;
    this.selectProtected.canvas.height = crop.height;
    const ctx = this.selectProtected.canvas.getContext('2d');

    // @ts-ignore
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
    return this.selectProtected.canvas.toDataURL('image/jpeg');
  }

  isCanvasSupported = () => !!(this.selectProtected.canvas
    && this.selectProtected.canvas.getContext
    && this.selectProtected.canvas.getContext('2d')
  );

  onCancel = () => {
    this.setState({
      files: [],
      src: '',
      croppedImageUrl: '',
      crop: {
        unit: '%',
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      refresh: false,
    });
  };

  onOk = () => {
    if (this.selectProtected.imageRef) {
      const { onOk = () => {} } = this.props;
      const { croppedImageUrl, crop } = this.state;
      const imageBase64 = this.getCroppedBase64(this.selectProtected.imageRef, crop);
      onOk(imageBase64);
      this.setState({
        refresh: true,
        crop: {
          unit: '%',
          width: 0,
          height: 0,
          x: 0,
          y: 0,
        },
        src: croppedImageUrl,
      });
    }
  };

  onFileUploadCancel = (id: string) => {
    const { files } = this.state;
    const index = files.findIndex((file) => file.id === id);
    let newFiles = [];
    if (index !== -1) {
      newFiles = files.slice(0, index);
      this.setState({ files: newFiles });
    }
  };

  onFilesPick = (files: FileList): void => {
    if (files && files.length > 0) {
      const file = files[0];
      const type = file.type.split('/')[0];
      const format = `.${file.type.split('/')[1]}`;
      const reader = new FileReader();
      const { accept } = this.props;
      reader.addEventListener('load', () => {
        if (type === 'image' && accept.some((item) => item === format)) {
          this.setState({
            src: reader.result,
            fileName: file.name || 'newFile.jpeg',
          });
        } else {
          this.setState({ files: [{ id: '1', name: file.name, status: fileStatuses.notSupported }] });
        }
      });
      reader.readAsDataURL(file);
    }
  };

  async makeClientCrop(crop: Crop) {
    const { fileName } = this.state;
    if (this.selectProtected.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.selectProtected.imageRef,
        crop,
        fileName,
      );
      this.setState({ croppedImageUrl });
    }
  }

  render() {
    const {
      crop, croppedImageUrl, src, files, refresh,
    } = this.state;
    const { locale, accept, header } = this.props;
    return (
      <>
        <canvas
          style={{ height: '0px', width: '0px' }}
          ref={(node) => {
            if (node) this.selectProtected.canvas = node;
          }}
        />
        {header && <div className={style.header}>{header}</div>}
        {!src && (
          <FileUpload
            accept={accept}
            onFilesPick={this.onFilesPick}
            files={files}
            onCancel={this.onFileUploadCancel}
            onTryAgain={() => {
            }}
          />
        )}
        {src && (
          <ReactCrop
            src={typeof src === 'string' ? src : ''}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && !refresh && (
          <div className={style.buttonContainer}>
            <Button className={style.okButton} onClick={this.onOk} icon={<Icon className="className" type="done" />}>
              {(locale && locale.ok) || 'Применить'}
            </Button>
            <Button onClick={this.onCancel}>{(locale && locale.cancel) || 'Отменить'}</Button>
          </div>
        )}
        {refresh
        && (
          <div className={style.refresh} onClick={this.onCancel}>
            {(locale && locale.refresh) || 'Сбросить и загрузить другое изображение'}
          </div>
        )}
      </>
    );
  }
}


export default CropImage;
