/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { Table, Icon } from '../export';
import { Column, ColumnsGroup } from '../modules/table/types';


const story = storiesOf('Table', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

interface ContainerState {
  dataSource: Array<{ id: number | string, [key: string]: number | string }>,
  selectedRows: Array<number | string> | 'all',
  rowKey: number | string,
  sortColumn: number | string,
  sortOrder?: 'asc' | 'desc' | '',
  isLoading: boolean,
  scrollTop: number,
  columnsGroups: Array<ColumnsGroup>,
  columns: Array<Column>,
}

class Container extends React.Component<{}, ContainerState> {
  timer = setTimeout(() => {
  }, 0);

  constructor(props: {}) {
    super(props);
    const dataSource = [];
    for (let i = 1; i <= 50; i += 1) {
      dataSource.push(
        {
          id: `${i}`,
          name: `${i} aaaa aaa aaa`,
          age: Math.floor(Math.random() * 100),
          city: 'Moscow',
          aaaa: 'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa ',
          bbbb: 'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb ',
          cccc: 'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc ',
          dddd: 'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd ',
        },
      );
    }
    this.state = {
      columnsGroups: [
        {
          title: 'main',
          key: 'main',
          columns: ['name', 'aaaa'],
        },
        {
          title: 'second custom group',
          key: 'second',
          columns: ['id', 'age', 'bbbb'],
        },
      ],
      columns: [
        {
          title: 'id',
          key: 'id',
          width: 100,
          sortable: true,
          render: (text, row, index) => (
            <>
              <span style={{ width: '32px', height: '32px' }}><Icon type="bug" /></span>
              <a style={{ color: '#1890FF', cursor: 'pointer', marginRight: '5px' }}>{`${text} id `}</a>
              <span>
                {row.age}
                {' '}
                age
                {' '}
                {index}
                {' '}
                index
              </span>
            </>
          ),
        },
        {
          title: 'name',
          key: 'name',
          width: 200,
          sortable: true,
        },
        {
          title: 'age',
          key: 'age',
          width: 250,
          sortable: true,
          render: (text, row, index) => (
            <>
              <span style={{ width: '32px', height: '32px' }}><Icon type="unplug" /></span>
              <span style={{ color: '#1890FF', cursor: 'pointer', marginRight: '5px' }}>{text}</span>
            </>
          ),
        },
        {
          title: 'city',
          key: 'city',
          width: 200,
        },
        {
          title: 'aaaa',
          key: 'aaaa',
          width: 200,
        },
        {
          title: 'bbbb',
          key: 'bbbb',
          width: 200,
        },
        {
          title: 'cccc',
          key: 'cccc',
          width: 200,
        },
        {
          title: 'dddd',
          key: 'dddd',
          width: 200,
        },
      ],
      dataSource,
      selectedRows: [],
      rowKey: 'id',
      sortColumn: '',
      sortOrder: '',
      isLoading: false,
      scrollTop: 0,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({ scrollTop: 200 });
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onSelect = (id: number | string) => {
    let { selectedRows } = this.state;

    if (id === 'all') {
      if (selectedRows === 'all') {
        selectedRows = [];
      } else {
        selectedRows = 'all';
      }
    } else if (id && selectedRows === 'all') {
      selectedRows = [];
      this.state.dataSource.forEach((data) => {
        if (data[this.state.rowKey] !== id) {
          Array.isArray(selectedRows) && selectedRows.push(data[this.state.rowKey]);
        }
      });
    } else if (id && Array.isArray(selectedRows) && selectedRows.some((rowId: number | string) => rowId === id)) {
      // @ts-ignore
      selectedRows = this.removeA(selectedRows, id);
    } else if (id && Array.isArray(selectedRows)) {
      selectedRows.push(id);
    }
    if (selectedRows.length === this.state.dataSource.length) {
      selectedRows = 'all';
    }
    this.setState({ selectedRows });
  };

  onSort = (key: number | string) => {
    const { sortColumn, sortOrder } = this.state;
    let { dataSource } = this.state;
    if (!sortColumn || sortColumn !== key || sortOrder === '') {
      dataSource = dataSource.sort((a, b) => Number(a[key]) - Number(b[key]));
      this.setState({ sortColumn: key, sortOrder: 'asc', dataSource });
    } else if (sortColumn && sortOrder === 'asc') {
      dataSource = dataSource.sort((a, b) => Number(b[key]) - Number(a[key]));
      this.setState({ sortOrder: 'desc', dataSource });
    } else if (sortColumn && sortOrder === 'desc') {
      dataSource = dataSource.sort((a, b) => Number(a.id) - Number(b.id));
      this.setState({ sortColumn: '', sortOrder: '', dataSource });
    }
  };

  onScrollEnd = (scrollTop: number) => {
    const { dataSource, isLoading } = this.state;
    const dataLength = dataSource.length + 1;
    if (!isLoading) {
      this.setState({ isLoading: true });

      this.timer = setTimeout(() => {
        for (let i = dataLength; i <= dataLength + 30; i += 1) {
          dataSource.push(
            {
              id: `${i}`,
              name: `${i} aaaa aaa aaa`,
              age: Math.floor(Math.random() * 100),
              city: 'Moscow',
              aaaa: 'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa ',
              bbbb: 'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb ',
              cccc: 'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc ',
              dddd: 'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd ',
            },
          );
        }
        this.setState({ isLoading: false, dataSource, scrollTop });
      }, 2000);
    }
  };

  // @ts-ignore
  removeA(arr) {
    let what;
    const a = arguments;
    let L = a.length;
    let ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }

  render() {
    const {
      columns,
      dataSource,
      columnsGroups,
      rowKey,
      selectedRows,
      sortColumn,
      sortOrder,
      isLoading,
      scrollTop,
    } = this.state;
    return (
      <div style={{ width: '800px', height: '600px' }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          columnsGroups={columnsGroups}
          rowKey={rowKey}
          fixed="id"
          checkable
          onSelect={(id) => this.onSelect(id)}
          selectedRows={selectedRows}
          onSort={(id) => this.onSort(id)}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          isLoading={isLoading}
          onScrollEnd={this.onScrollEnd}
          scrollTop={scrollTop}
        />
      </div>
    );
  }
}

story.add('Table', () => (
  <Table
    columns={[
      {
        title: 'id',
        key: 'id',
        width: 200,
        sortable: true,
      },
      {
        title: 'name',
        key: 'name',
        width: 200,
        sortable: false,
      },
    ]}
    dataSource={[
      {
        id: '1',
        name: 'Лалала',
      },
      {
        id: '2',
        name: 'Лололо',
      },
    ]}
    rowKey="id"
  />
));

story.add('Table Example', () => (
  <Container />
));
