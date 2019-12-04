import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { FileUpload } from '../export';
import { fileStatuses } from '../modules/upload/Filelist/FileList';


const story = storiesOf('Upload', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('File upload', () => (
  <div style={{ width: '312px' }}>
    <FileUpload
      multiple
      accept={['.xml', '.xls']}
      onFilesPick={action('Files were picked/dropped')}
      files={[
        { id: '1', name: 'file.pdf', status: fileStatuses.loading },
        { id: '2', name: 'myfilefilefile.docx', status: fileStatuses.error },
        { id: '3', name: 'myfile_with_longname_name.pdf', status: fileStatuses.loading },
        { id: '4', name: 'not_supported_file_name_2.exe', status: fileStatuses.notSupported },
        { id: '5', name: 'longname_longname_longname_longname_', status: fileStatuses.loaded },
      ]}
      onCancel={action('cancel file upload')}
      onTryAgain={action('try again after error')}
    />
  </div>
));
