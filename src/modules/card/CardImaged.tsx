import React from 'react';
import get from 'lodash/get';
import CardBase from './CardBase';
import Icon from '../icon/index';

import { getIconsList } from '../icon/svgCollection';
import { colors, getRandomColor } from '../../lib/styles/colors';

const iconsList = getIconsList();

class CardImaged extends CardBase {
  withImage = () => {
    const { image, header } = this.props;

    let name = '';
    if (header) {
      name = header.split(' ').map((word) => word[0]).join('');
    }

    const color = get(image, 'color', '');
    const validColor = colors[color] || getRandomColor();

    if (!image || (image && !image.url && !image.icon && color)) {
      return (
        <div className="card-image-wrapper">
          <div className="border-bug-fix" />
          <div className="card-image" style={{ backgroundColor: validColor.hex }}>
            <span className="card-short-name">
              {name}
            </span>
          </div>
        </div>
      );
    }

    if (image.url) {
      return (
        <div className="card-image-wrapper">
          <div className="border-bug-fix" />
          <div
            className="card-image"
            style={{
              backgroundImage: `url("${image.url}")`,
              // отображаем цвет при загрузке, чтобы не было мерцания
              backgroundColor: getRandomColor().hex,
            }}
          />
        </div>
      );
    }

    if (image.icon && image.color) {
      const validIcon = iconsList.some((icon: any) => icon === image.icon)
        ? image.icon
        : iconsList[Math.floor(Math.random() * iconsList.length)];
      return (
        <div className="card-image-wrapper">
          <div className="border-bug-fix" />
          <div className="card-image" style={{ backgroundColor: validColor.hex }}>
            <span className="card-icon">
              <Icon className="card-icon-inner" type={validIcon} />
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  withTags = () => this.props.tags
      && (
      <div className="tag-container">
        {this.props.tags.map((item) => item)}
      </div>
      );
}

export default CardImaged;
