import React, { Component } from 'react';
import './index.scss';
import Color from './color';
import { ColorGroup } from '../../lib/types/types';


class ColorPalette extends Component<{}> {
  colors: Array<Array<Color>> = [
    [
      new Color('bg-color-black', 'black', '34 / 34 / 34', '#222222'),
      new Color('bg-color-gray', 'gray', '34 / 34 / 34', '#222222'),
      new Color('bg-color-white', 'white', '255 / 255 / 255', '#FFFFFF'),
    ],
    [
      new Color('bg-color-accent', 'accent', '24 / 144 / 255', '#1890FF'),
      new Color('bg-color-secondary', 'secondary', '13 / 45 / 83', '#0D2D53'),
    ],
    [
      new Color('bg-color-green', 'green', '34 / 34 / 34', '#26BE99'),
      new Color('bg-color-orange', 'orange', '34 / 34 / 34', '#ECA910'),
      new Color('bg-color-red', 'red', '237 / 34 / 34', '#ED5F5F'),
    ],
  ];

  bodyColorGroups: Array<Array<ColorGroup>> = [
    ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9', '1-10', '1-11', '1-12'],
    ['2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '2-8', '2-9', '2-10', '2-11', '2-12'],
    ['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '3-8', '3-9', '3-10', '3-11', '3-12'],
  ];


  renderGroup = (group: Array<Color>) => (
    <div className="default-colors">
      {
          group.map((groupBlock) => (
            <div className="block">
              <div className={`color-preview ${groupBlock.className}`} />
              <div className="color-title color-gray">
                <div>{groupBlock.title}</div>
                <div>{groupBlock.rgb}</div>
              </div>
              <div className="color-black">{groupBlock.hex}</div>
            </div>
          ))
        }
    </div>
  );

  renderBodyColors = (group: Array<string>) => (
    <div className="body-group">
      {group.map((item) => (
        <div className={`item ${`bg-color-group-${item}`}`} />
      ))}
    </div>
  );

  renderCardColors = (group: Array<string>) => (
    <div className="body-group">
      {group.map((item) => (
        <div className={`card-item ${`card-${item}`}`}>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );

  render() {
    return (
      <div>
        Сумчатый кенгуру
        <div>Default colors</div>
        <div>
          {this.colors.map(this.renderGroup)}
        </div>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Цвет фона, класс пишется как 'bg-color-group-' плюс цифры (см. ниже)
        <div>
          {this.bodyColorGroups.map(this.renderBodyColors)}
        </div>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Цвет фона с текстом, класс пишется как 'card-' плюс цифры
        <div>
          {this.bodyColorGroups.map(this.renderCardColors)}
        </div>
      </div>
    );
  }
}

export default ColorPalette;
