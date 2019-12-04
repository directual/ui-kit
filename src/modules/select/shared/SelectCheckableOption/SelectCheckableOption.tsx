import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { STATUS_FOCUSED } from '../../SelectBase/SelectBase';
import styles from './select-checkable.module.scss';
import TagsList from '../TagsList/TagsList';
import { SelectCheckableOptionProps } from '../../types';

const SelectCheckableOption = ({
  showHint,
  setShowHint,
  placeholder,
  searchable,
  disabled,
  isDropped,
  currentStatus,
  searchString,
  selectedOptionIds,
  optionsById,
  onChangeHandler = () => {},
  closeable,
}: SelectCheckableOptionProps) => {
  const showSelectedOption = (searchable && !isDropped && currentStatus !== STATUS_FOCUSED)
    || !searchable;
  const showPlaceholder = isEmpty(selectedOptionIds) && isEmpty(searchString);
  const tags = selectedOptionIds.map((optionId) => {
    const option = optionsById[optionId] || {};
    return ({
      value: String(option.value),
      onClose: () => onChangeHandler(optionId),
      disabled,
      closeable,
    });
  });

  const onHeightChange = (newHeight: number) => {
    const ONE_LINE_HEIGHT = 35;
    const showHintUpdated = newHeight > ONE_LINE_HEIGHT;
    setShowHint(showHintUpdated);
  };

  return (
    <>
      {showPlaceholder && (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
      {showSelectedOption && (
        <span className={styles.options}>
          <TagsList tags={tags} onHeightChange={onHeightChange} />
        </span>
      )}
      {((searchable && isDropped) || showHint) && (
        <span className={styles['total-options-hint']}>
          {`...total ${selectedOptionIds.length}`}
        </span>
      )}
    </>
  );
};

export default SelectCheckableOption;
