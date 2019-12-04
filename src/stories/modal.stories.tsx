// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Modal, ModalTabs, Button } from '../export';


const story = storiesOf('Modal', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

interface Props {
}

interface State {
  show: boolean;
}

class Container extends React.Component<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    show: false,
  };

  render() {
    const { show } = this.state;
    return (
      <div style={{ width: '90vw', backgroundColor: '#ed5f5f' }}>
        <button
          onClick={() => {
            this.setState({ show: true });
          }}
          type="button"
        >
          open modal
        </button>

        <Modal
          show={show}
          header="Create brand New World"
          onClick={() => {
            this.setState({ show: false });
          }}
          buttons={[
            <Button type="accent" key="1111">Create</Button>,
            <Button
              onClick={() => {
                this.setState({ show: false });
              }}
              key="2222"
            >
              Cancel
            </Button>,
          ]}
          columnsNumber={2}
          fixColumn
          column1={(
            <>
              <p>
                [Verse 1]
                Conversion, software version 7.0
                Looking at life, through the eyes of a tire hub
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
                <br />
                [Verse 2]
                More wood for their fires, loud neighbors
                Flashlight reveries caught in the headlights of a truck
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
              </p>
              <p>
                [Verse 1]
                Conversion, software version 7.0
                Looking at life, through the eyes of a tire hub
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
                <br />
                [Verse 2]
                More wood for their fires, loud neighbors
                Flashlight reveries caught in the headlights of a truck
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
              </p>
              <p>
                [Verse 1]
                Conversion, software version 7.0
                Looking at life, through the eyes of a tire hub
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
                <br />
                [Verse 2]
                More wood for their fires, loud neighbors
                Flashlight reveries caught in the headlights of a truck
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
              </p>
            </>
          )}
          column2={(
            <>
              <p>
                [Verse 1]
                Conversion, software version 7.0
                Looking at life, through the eyes of a tire hub
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
                <br />
                [Verse 2]
                More wood for their fires, loud neighbors
                Flashlight reveries caught in the headlights of a truck
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
              </p>
              <p>
                [Verse 1]
                Conversion, software version 7.0
                Looking at life, through the eyes of a tire hub
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
                <br />
                [Verse 2]
                More wood for their fires, loud neighbors
                Flashlight reveries caught in the headlights of a truck
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
              </p>
              <p>
                [Verse 1]
                Conversion, software version 7.0
                Looking at life, through the eyes of a tire hub
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
                <br />
                [Verse 2]
                More wood for their fires, loud neighbors
                Flashlight reveries caught in the headlights of a truck
                Eating seeds as a pastime activity
                The toxicity of our city, of our city
                <br />
                [Chorus]
                You, what do you own the world?
                How do you own disorder, disorder?
                Now, somewhere between the sacred silence
                Sacred silence and sleep
                Somewhere between the sacred silence and sleep
                Disorder, disorder, disorder
              </p>
            </>
          )}
        />
      </div>
    );
  }
}

story.add('Modal Example', () => (
  <Container />
));

story.add('Modal', () => (
  <div>
    <Modal
      show={false}
      header="Hello"
      buttons={[
        <Button type="accent" key="1111">Create</Button>,
        <Button key="2222">Cancel</Button>,
      ]}
      onClick={() => {
      }}
      columnsNumber={2}
      column1={(<p>[Verse 1]</p>)}
      column2={(<p>[Verse 1]</p>)}
    />
  </div>
));

class ContainerColumn extends React.Component<Props, State> {
  state = {
    show: false,
  };

  render() {
    const { show } = this.state;
    return (
      <div style={{ width: '90vw', backgroundColor: '#ed5f5f' }}>
        <button
          onClick={() => {
            this.setState({ show: true });
          }}
          type="button"
        >
          open modal
        </button>

        <Modal
          show={show}
          header="Create brand New World"
          onClick={() => {
            this.setState({ show: false });
          }}
          buttons={[
            <Button type="accent" key="1111">Create</Button>,
            <Button
              onClick={() => {
                this.setState({ show: false });
              }}
              key="2222"
            >
              Cancel
            </Button>,
          ]}
          columnsNumber={1}
          fixColumn
          column1={(
            <>
              <p>
                [Verse 1]
                Conversion, software version 7.0
                <br />
                Looking at life, through the eyes of a tire hub
                <br />
                Eating seeds as a pastime activity
                <br />
                The toxicity of our city, of our city
                <br />
                [Chorus]
                <br />
                You, what do you own the world?
                <br />
                How do you own disorder, disorder?
                <br />
                Now, somewhere between the sacred silence
                <br />
                Sacred silence and sleep
                <br />
                Somewhere between the sacred silence and sleep
                <br />
                Disorder, disorder, disorder
                <br />
                [Verse 2]
                <br />
                More wood for their fires, loud neighbors
                <br />
                Flashlight reveries caught in the headlights of a truck
                <br />
                Eating seeds as a pastime activity
                <br />
                The toxicity of our city, of our city
                <br />
                [Chorus]
                <br />
                You, what do you own the world?
                <br />
                How do you own disorder, disorder?
                <br />
                Now, somewhere between the sacred silence
                <br />
                Sacred silence and sleep
                <br />
                Somewhere between the sacred silence and sleep
                <br />
                Disorder, disorder, disorder
              </p>
              <p>
                [Verse 1]
                Conversion, software version 7.0
                <br />
                Looking at life, through the eyes of a tire hub
                <br />
                Eating seeds as a pastime activity
                <br />
                The toxicity of our city, of our city
                <br />
                [Chorus]
                <br />
                You, what do you own the world?
                <br />
                How do you own disorder, disorder?
                <br />
                Now, somewhere between the sacred silence
                <br />
                Sacred silence and sleep
                <br />
                Somewhere between the sacred silence and sleep
                <br />
                Disorder, disorder, disorder
                <br />
                [Verse 2]
                <br />
                More wood for their fires, loud neighbors
                <br />
                Flashlight reveries caught in the headlights of a truck
                <br />
                Eating seeds as a pastime activity
                <br />
                The toxicity of our city, of our city
                <br />
                [Chorus]
                <br />
                You, what do you own the world?
                <br />
                How do you own disorder, disorder?
                <br />
                Now, somewhere between the sacred silence
                <br />
                Sacred silence and sleep
                <br />
                Somewhere between the sacred silence and sleep
                <br />
                Disorder, disorder, disorder
              </p>
              <p>
                [Verse 1]
                <br />
                Conversion, software version 7.0
                <br />
                Looking at life, through the eyes of a tire hub
                <br />
                Eating seeds as a pastime activity
                <br />
                The toxicity of our city, of our city
                <br />
                [Chorus]
                <br />
                You, what do you own the world?
                <br />
                How do you own disorder, disorder?
                <br />
                Now, somewhere between the sacred silence
                <br />
                Sacred silence and sleep
                <br />
                Somewhere between the sacred silence and sleep
                <br />
                Disorder, disorder, disorder
                <br />
                [Verse 2]
                More wood for their fires, loud neighbors
                <br />
                Flashlight reveries caught in the headlights of a truck
                <br />
                Eating seeds as a pastime activity
                <br />
                The toxicity of our city, of our city
                <br />
                <br />
                [Chorus]
                You, what do you own the world?
                <br />
                How do you own disorder, disorder?
                <br />
                Now, somewhere between the sacred silence
                <br />
                Sacred silence and sleep
                <br />
                Somewhere between the sacred silence and sleep
                <br />
                Disorder, disorder, disorder
              </p>
            </>
          )}
        />
      </div>
    );
  }
}

class ContainerTabs extends React.Component<Props, State> {
  state = {
    show: false,
  };

  render() {
    const { show } = this.state;
    return (
      <div style={{ width: '90vw', backgroundColor: '#ed5f5f' }}>
        <button
          onClick={() => {
            this.setState({ show: true });
          }}
          type="button"
        >
          open modal
        </button>
        <ModalTabs
          show={show}
          header="Create brand New World"
          onClick={() => {
            this.setState({ show: false });
          }}
          buttons={[
            <Button type="accent" key="1111">Create</Button>,
            <Button
              onClick={() => {
                this.setState({ show: false });
              }}
              key="2222"
            >
              Cancel
            </Button>,
          ]}
          tabs={[
            {
              tabName: 'First tab',
              columnsNumber: 3,
              column1: (
                <>
                  <p>
                    [Verse 1]
                    Conversion, software version 7.0
                    Looking at life, through the eyes of a tire hub
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                    [Verse 1]
                    Conversion, software version 7.0
                    Looking at life, through the eyes of a tire hub
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                  </p>
                </>
              ),
              column2: (
                <>
                  <p>
                    [Verse 2]
                    More wood for their fires, loud neighbors
                    Flashlight reveries caught in the headlights of a truck
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                    [Verse 1]
                    Conversion, software version 7.0
                    Looking at life, through the eyes of a tire hub
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                  </p>
                </>
              ),
              column3: (
                <>
                  <p>
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Verse 1]
                    Conversion, software version 7.0
                    Looking at life, through the eyes of a tire hub
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                    [Chorus]
                    You, what do you own the world?
                    How do you own disorder, disorder?
                    Now, somewhere between the sacred silence
                    Sacred silence and sleep
                    Somewhere between the sacred silence and sleep
                    Disorder, disorder, disorder
                  </p>
                </>
              ),
            },
            {
              tabName: 'Second tab',
              columnsNumber: 1,
              column1: (
                <>
                  <p>
                    [Verse 1]
                    Conversion, software version 7.0
                    Looking at life, through the eyes of a tire hub
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                    [Verse 1]
                    Conversion, software version 7.0
                    Looking at life, through the eyes of a tire hub
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                    [Verse 1]
                    Conversion, software version 7.0
                    Looking at life, through the eyes of a tire hub
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                  </p>
                </>
              ),
            },
            {
              tabName: 'Third tab',
              columnsNumber: 2,
              column1: (
                <>
                  <p>
                    [Verse 1]
                    Conversion, software version 7.0
                    Looking at life, through the eyes of a tire hub
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                  </p>
                </>
              ),
              column2: (
                <>
                  <p>
                    [Verse 2]
                    More wood for their fires, loud neighbors
                    Flashlight reveries caught in the headlights of a truck
                    Eating seeds as a pastime activity
                    The toxicity of our city, of our city
                  </p>
                </>
              ),
            },
          ]}
        />
      </div>
    );
  }
}

story.add('Modal Tabs Example', () => (
  <ContainerTabs />
));

story.add('Modal with 1 column', () => (
  <ContainerColumn />
));

story.add('Modal Tabs', () => (
  <div>
    <ModalTabs
      show={false}
      header="Hello"
      buttons={[
        <Button type="accent" key="1111">Create</Button>,
        <Button key="2222">Cancel</Button>,
      ]}
    />
  </div>
));
