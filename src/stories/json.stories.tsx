/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { KeyValue, TextArea, Tree } from '../export';


const story = storiesOf('JSON', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; const
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

interface State {
  value?: string,
}

class Container extends React.Component<{}, State> {
  placeholder: string = 'Подсказка';

  state = {
    value: '{"id":5178850,"uuid":"01d1c9e9-0b88-40cd-830f-a09e1ef8111d","dateCreated":"2019-05-14T12:14:01Z","dateChanged":"2019-08-05T12:37:53Z","name":"event","sysName":"jqmxuzz3-jaoi-pyce-fd6f-8fbhyyxwm99t","objectIn":"123123","filterIn":"NEW","dateStart":null,"status":"START","counterIn":31,"counterOut":31}',
  };

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ value: event.target.value });
  };

  getValue = () => {
    const { value } = this.state;
    try {
      const parsed = JSON.parse(value);
      const arr = Object.keys(parsed).map((key) => ({
        key,
        value: JSON.stringify(parsed[key]),
      }));
      return arr;
    } catch (e) {
      return [];
    }
  };

  render() {
    return (
      <div>
        <div>
в Инпуте объект в формате JSON который пришел строкой, он преобразуется в данные для компонента
          ключ-значение
        </div>
        <div style={{ width: '400px', margin: '10px' }}>
          <TextArea
            value={this.state.value}
            onChange={this.onChange}
            rows={7}
          />
        </div>
        <KeyValue
          data={this.getValue()}
          keyColStyle={{ width: 121 }}
          valueColStyle={{ width: 450 }}
        />
      </div>

    );
  }
}

story.add('json list', () => (
  <Container />
));

type TreeState = {
  value: string,
  selected: (number | string)[];
  expandedKeys: string[];
};

class ContainerTree extends React.Component<{}, TreeState> {
  state = {
    selected: [],
    expandedKeys: [] as string[],
    groups: [
      { id: 1, value: 'JSON' },
    ],
    value: '{"result":{"list":[{"id":5178850,"uuid":"01d1c9e9-0b88-40cd-830f-a09e1ef8111d","dateCreated":"2019-05-14T12:14:01Z","dateChanged":"2019-08-05T12:37:53Z","name":"event","sysName":"jqmxuzz3-jaoi-pyce-fd6f-8fbhyyxwm99t","objectIn":"123123","filterIn":"NEW","dateStart":null,"status":"START","counterIn":31,"counterOut":31},{"id":5176949,"uuid":"e87a1afb-c166-4d49-acd3-634cffe121a8","dateCreated":"2019-04-26T12:49:08Z","dateChanged":"2019-07-31T08:16:46Z","name":"546456","sysName":"dcd9ae20-601c-4983-b263-49e07e08e1eb","objectIn":"HttpRequest","filterIn":"NEW","dateStart":null,"status":"START","counterIn":0,"counterOut":0},{"id":5176944,"uuid":"23ccdd99-0dc5-4c5f-ae32-b57feb5b110e","dateCreated":"2019-04-26T12:19:23Z","dateChanged":"2019-07-31T08:16:46Z","name":"1234","sysName":"0ct96fz3-cct9-9f20-c4hm-9tlawowwwnj0","objectIn":"123123","filterIn":"NEW","dateStart":null,"status":"START","counterIn":13,"counterOut":13},{"id":5176939,"uuid":"84a891dd-b373-4a16-9732-0ff109edffc0","dateCreated":"2019-04-26T12:09:45Z","dateChanged":"2019-04-26T12:11:39Z","name":"12341","sysName":"2q3wlrws-2cxq-fygk-o2i6-5mh1n5qgfdni","objectIn":"123123","filterIn":"NEW","dateStart":null,"status":"START","counterIn":13,"counterOut":13}],"filter":"0","structure":[],"pageInfo":{"currentPage":0,"pageSize":0,"totalPage":0,"tableSize":0,"currentPageSize":0},"structFilters":[],"status":"OK"}}', // '{"111":[{"id":"hohoho","name":"haha" },{"id":"hehe","name":"huhu"}],"222":{"pain":"nooo"}}',
  };

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ value: event.target.value });
  };

  setExpanded = (node: any) => {
    const nodeKey = node.props.eventKey || '';
    console.log(nodeKey);

    if (!nodeKey) return;
    const { expandedKeys } = this.state;

    if (expandedKeys.includes(nodeKey)) {
      this.setState({
        expandedKeys: expandedKeys.filter((key) => key !== nodeKey),
      });
    } else {
      this.setState({
        expandedKeys: [...expandedKeys, nodeKey],
      });
    }
  };

  getValue = () => {
    const { value } = this.state;
    const options: Array<{ id: number, value: string }> = [];
    try {
      const parsed = JSON.parse(value);
      this.convertJson(parsed, options);
      return options;
    } catch (e) {
      return [{
        id: 1, value: 'Красные', groupId: 1, parentId: null,
      }];
    }
  };

  convertJson = (parsed: {[key: string]: any} | Array<{[key: string]: any}>, options: Array<{ id?: number | string | null, value?: string, groupId?: string | number, parentId?: string | number | null }>, parent: string | number | null = null) => {
    try {
      if (typeof parsed === 'object' && parsed !== null && parsed !== undefined) {
        Object.keys(parsed).forEach((key) => {
          const id = uuidv4();
          options.push({
            id,
            value: key,
            groupId: 1,
            parentId: parent,
          });
          if (typeof parsed[key] === 'object' && parsed[key] !== null && parsed[key] !== undefined) {
            this.convertJson(parsed[key], options, id);
          } else {
            options.push({
              id: uuidv4(),
              value: parsed[key],
              groupId: 1,
              parentId: id,
            });
          }
        });
      } else {
        options.push({
          value: parsed,
          groupId: 1,
          parentId: parent,
        });
      }
    } catch (e) {
      console.log('error: ', e);
    }
  };

  render() {
    const { value, selected, groups } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '400px', margin: '10px' }}>
          <TextArea
            value={value}
            onChange={this.onChange}
            rows={7}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{
            width: '240px', height: '600px', margin: '10px', overflow: 'scroll',
          }}
          >
            <div style={{ position: 'static' }}>
              <Tree
                selected={selected}
                options={this.getValue()}
                groups={groups}
                onClick={(e, node) => {
                  action('onClick:::')(node);
                }}
                onDoubleClick={(e, node) => {
                  action('doubleClick:::')(node);
                }}
                onSelect={(selectedKeys, e) => {
                  action('onSelect:::')({
                    selectedKeys,
                    NodeSelectEvent: e,
                  });

                  this.setState({ selected: selectedKeys.map(Number) });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

story.add('json tree', () => (
  <ContainerTree />
));
