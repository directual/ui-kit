import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Tabs, TabPane } from '../export';


const story = storiesOf('Tabs', module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: true } });

story.add('Regular Tabs', () => (
  <Tabs
    defaultActiveKey="2"
  >
    <TabPane tab="Вкладка 1" tabKey="1">Frontend</TabPane>
    <TabPane tab="Вкладка 2" tabKey="2">
      <div>Backend</div>
      <div>12341234</div>
      <div>asdfafsd</div>
      <div>zxcvzxcv</div>
      <div>gfyhdy</div>
    </TabPane>
    <TabPane tab="Вкладка 3" tabKey="3">Dev Ops</TabPane>
  </Tabs>
));

class Example extends Component<{}, { activeKey: string | number }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeKey: 1,
    };
  }

  changeTab = (tabKey: string | number) => {
    this.setState({ activeKey: tabKey });
  };

  render() {
    const { activeKey } = this.state;
    return (
      <>
        <button onClick={() => this.changeTab(3)} type="button">To 3 tab</button>
        <Tabs
          activeKey={activeKey}
          onChange={this.changeTab}
        >
          <TabPane tab="Вкладка 1" tabKey="1">Frontend</TabPane>
          <TabPane tab="Вкладка 2" tabKey="2">
            <div>Backend</div>
            <div>12341234</div>
            <div>asdfafsd</div>
            <div>zxcvzxcv</div>
            <div>gfyhdy</div>
          </TabPane>
          <TabPane tab="Вкладка 3" tabKey="3">Dev Ops</TabPane>
        </Tabs>
      </>
    );
  }
}

story.add('Example Tabs', () => (
  <Example />
));
