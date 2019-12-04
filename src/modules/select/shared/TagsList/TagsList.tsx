import React, { useRef, useEffect } from 'react';
import get from 'lodash/get';
import Tag from '../../../tag/Tag';
import styles from './tags-list.module.scss';
import { TagsListProps } from '../../types';
import { usePrevious } from '../../../../lib/helpers';


const TagsList = ({
  tags = [], onHeightChange = () => {
  },
}: TagsListProps) => {
  const tagsListContainerRef = useRef(null);

  const prevTags = usePrevious(tags);
  useEffect(() => {
    if (prevTags !== tags) {
      const listContainerFullHeight = get(tagsListContainerRef, 'current.scrollHeight');
      onHeightChange(listContainerFullHeight);
    }
  });

  return (
    <div className={styles['tags-container']} ref={tagsListContainerRef}>
      {tags.map(({
        value = '',
        onClick = () => {
        },
        onClose = () => {
        },
        closeable = true,
        disabled = false,
      }) => (
        <div className={styles['tags-item']}>
          <Tag
            closeable={closeable}
            onClick={onClick}
            onClose={onClose}
            disabled={disabled}
          >
            {value}
          </Tag>
        </div>
      ))}
    </div>
  );
};

export default TagsList;
