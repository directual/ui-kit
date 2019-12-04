import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import Button from '../modules/button/Button';
import notify from '../modules/notify/Notify';


const story = storiesOf('Notify', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Example', () => (
  <div>
    <div
      id="project-shadow"
      style={{
        display: 'none',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    />
    <Button
      type="accent"
      onClick={() => notify({
        header: <div>Привет!?</div>,
        message: 'Ну как там дела?',
        withButtons: true,
        // onCancel: () => action('CANCEL'),
        onSubmit: () => {
          const elem = document.getElementById('project-shadow');
          if (elem) {
            elem.style.display = 'none';
          }
          action('SUBMIT');
        },
        onOpen: () => {
          const elem = document.getElementById('project-shadow');
          if (elem) {
            elem.style.display = 'block';
          }
        },
        onCancel: () => {
          const elem = document.getElementById('project-shadow');
          if (elem) {
            elem.style.display = 'none';
          }
        },
      })}
    >
      Submit something
    </Button>
    <br />
    <Button onClick={() => notify({
      type: 'error',
      header: 'Unreadable error',
      message: 'Can not define undefined of null',
      renderButtons: (closeToast) => <Button onClick={() => closeToast()}>Close</Button>,
    })}
    >
      Throw error!
    </Button>
    <br />
    <Button onClick={() => notify({
      type: 'success',
      header: 'Wow, no error!',
      message: 'We are amazed that everything fine',
    })}
    >
      Success
    </Button>
    <br />
    <Button onClick={() => notify({
      type: 'warning',
      header: 'Warning',
      message: 'Almost everything is fine',
    })}
    >
      Warning
    </Button>
  </div>
));
