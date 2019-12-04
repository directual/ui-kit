import React, { useState } from 'react';
import { CheckableListInterface } from './types';
import List from './List';


const CheckableList = ({
  defaultValues = [],
  options = [],
  onChange = () => {},
  icon = null,
  groups = [],
}: CheckableListInterface) => {
  const [selectedIds, setSelectedIds] = useState(defaultValues);

  const onChangeHandler = (selectedId: string | number) => {
    let newSelectedValue;
    if (selectedIds.includes(selectedId)) {
      newSelectedValue = selectedIds.filter((id: string | number) => String(id) !== String(selectedId));
    } else {
      newSelectedValue = [...selectedIds, selectedId];
    }
    onChange(newSelectedValue);
    setSelectedIds(newSelectedValue);
  };

  return (
    <List
      checkable
      selected={selectedIds}
      groups={groups}
      options={options}
      onChange={onChangeHandler}
      icon={icon}
    />
  );
};


export default CheckableList;
