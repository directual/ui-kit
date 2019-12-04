// TODO пофиксить, тут мяско
/* eslint-disable */
import React, { Component } from 'react';
import Checkbox from './Checkbox';

const plainOptions = ['Frontend', 'Backend', 'Dev Ops'];
const defaultCheckedList = ['Frontend'];

// @ts-ignore
function removeA(arr) {
  let what; const a = arguments; let L = a.length; let
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

type State = {
  plainOptions: Array<string>;
  checkedList: Array<string>;
  indeterminate: boolean;
  checkAll: boolean;
};

class CheckboxExample extends Component<{}, State> {
  state = {
    plainOptions: ['Frontend', 'Backend', 'Dev Ops'],
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  onChange = (checkedItem: string) => () => {
    let { checkedList } = this.state;
    if (checkedList.some((checked) => checked === checkedItem)) {
      // @ts-ignore
      checkedList = removeA(checkedList, checkedItem);
    } else {
      checkedList.push(checkedItem);
    }
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === this.state.plainOptions.length,
    });
  };

  onCheckAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      checkedList: e.target.checked ? [...this.state.plainOptions] : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    return (
      <div>
        <div>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <div style={{ marginLeft: '22px' }}>
          { this.state.plainOptions.map((item) => (
            <Checkbox
              key={item}
              onChange={this.onChange(item)}
              checked={this.state.checkedList.some((checked) => checked === item)}
            >
              {item}
            </Checkbox>
          ))}
        </div>
      </div>
    );
  }
}

export default CheckboxExample;
