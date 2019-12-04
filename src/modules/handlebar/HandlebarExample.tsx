/* eslint-disable jsx-a11y/mouse-events-have-key-events, jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import SidePanelResizable from '../side-panel/SidePanelResizable';
import Icon from '../icon';
import Handlebar from './Handlebar';

interface HandlebarExampleState {
  handlePressed: boolean,
  isMouseOverHandle: boolean,
}

interface HandlebarExampleProps {}

class HandlebarExample extends Component<HandlebarExampleProps, HandlebarExampleState> {
  state = {
    handlePressed: false,
    isMouseOverHandle: false,
  };

  render() {
    const { handlePressed, isMouseOverHandle } = this.state;
    return (
      <div style={{
        height: '800px',
        width: '90%',
        position: 'relative',
        border: '1px solid rgb(238, 238, 238)',
        backgroundColor: 'rgb(250, 250, 250)',
      }}
      >
        <SidePanelResizable
          initWidth={400}
          minWidth={400}
          maxWidth={800}
          onDragStart={() => {
            this.setState({ handlePressed: true });
          }}
          onDragEnd={() => {
            this.setState({ handlePressed: false });
          }}
          icon={(
            <Icon type="close" style={{ height: '32px', width: '32px' }} />
          )}
          handle={(
            <Handlebar
              isPressed={handlePressed}
              isVisible={isMouseOverHandle}
              onMouseOver={() => {
                this.setState({ isMouseOverHandle: true });
              }}
              onMouseOut={() => {
                this.setState({ isMouseOverHandle: false });
              }}
            />
          )}
        >
          <h2 style={{ marginTop: '5px', marginBottom: '5px' }}>Resizable panel</h2>
          <p>Hover over left panel border to resize</p>
          <p>Hover over left panel border to resize</p>
          <p>Hover over left panel border to resize</p>
          <p>Hover over left panel border to resize</p>
          <p>Hover over left panel border to resize</p>
        </SidePanelResizable>
      </div>
    );
  }
}

export default HandlebarExample;
