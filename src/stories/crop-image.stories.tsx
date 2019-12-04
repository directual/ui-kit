import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CropImage } from '../export';


const story = storiesOf('Crop image', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Crop image', () => (
  <div style={{ width: '600px' }}>
    <CropImage
      header="Обложка проекта (jpg, jpeg до 3МБ)"
      onOk={(base64: string) => console.log(base64)}
      accept={['.jpg', '.jpeg']}
      locale={{
        ok: 'Применить',
        cancel: 'Отменить',
        refresh: 'Сбросить и загрузить другое изображение',
      }}
    />
  </div>
));
