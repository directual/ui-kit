/* eslint-disable react/no-unused-state */
import React, { Component, ReactNode } from 'react';
import IconButton from '../button/IconButton';

import './Menu.scss';
import { DefaultOption } from '../../lib/types/types';

const ICON_WIDTH = 48;

type MenuIconProps = {
  /** Actios to icon buttons render */
  actions: Array<DefaultOption>;
  /** onClick handler */
  onClick: (id: string | number) => string | number | void;
  /** Element to dropdown render */
  dropdown?: ReactNode;
  /** Element to expand content render */
  expandContent?: ReactNode;
};

type MenuIconState = {
  expandStatus: 'down' | 'up';
  rerender: boolean;
};

class MenuIcon extends Component<MenuIconProps, MenuIconState> {
  source: any;

  static defaultProps: Pick<MenuIconProps, 'dropdown' | 'expandContent'> = {
    dropdown: null,
    expandContent: null,
  };

  constructor(props: MenuIconProps) {
    super(props);
    this.state = {
      expandStatus: 'down',
      rerender: false,
    };
    this.source = null;
  }

  onExpand = () => {
    const { expandStatus } = this.state;
    if (expandStatus === 'down') {
      this.setState({ expandStatus: 'up' });
    } else {
      this.setState({ expandStatus: 'down' });
    }
  };

  renderActions = () : Array<ReactNode> => {
    let width = 0;
    const renderIcons: ReactNode[] = [];
    const { actions, onClick } = this.props;
    actions.forEach((icon) => {
      if ((width + ICON_WIDTH * 2) <= this.source.scrollWidth) {
        width += ICON_WIDTH;
        renderIcons.push(
          <IconButton
            key={icon.id}
            onClick={() => onClick(icon.id)}
            icon={icon.iconType}
          />,
        );
      }
    });

    return renderIcons.map((item) => item);
  };

  onClick = (set: Set<string | number>) => {
    const value = set.values().next().value || '';
    const { onClick } = this.props;
    onClick(value);
  };

  renderContent = (): ReactNode => {
    const { actions, dropdown, expandContent } = this.props;
    const { expandStatus } = this.state;

    if (this.source === null) {
      this.setState({ rerender: true });
    }

    const showDropdown = this.source
      && actions.length
      && this.source.scrollWidth <= (actions.length * ICON_WIDTH + ICON_WIDTH * 2);

    let dropdownRender = null;

    // TODO: replace by normal Select
    if (showDropdown) {
      dropdownRender = (
        <div className="expand" />
      );
    }

    if (dropdown) {
      dropdownRender = (
        <div className="expand">
          {dropdown}
        </div>
      );
    }

    if (expandContent) {
      dropdownRender = (
        <IconButton
          className="expand"
          onClick={this.onExpand}
          icon={expandStatus}
        />
      );
    }

    return (
      <div className="menu-container" ref={(source) => { this.source = source; }}>
        { this.source && this.renderActions() }
        { dropdownRender }
      </div>
    );
  };

  render() {
    const { actions, dropdown, expandContent } = this.props;
    const { expandStatus } = this.state;

    return (
      <div className="card-menu">
        <div className="upper-border" />
        <div className="menu-container-wrapper">
          {
            actions || dropdown || expandContent
              ? this.renderContent()
              : null
          }
        </div>
        { expandStatus === 'up' && expandContent
          ? (
            <div className="expand-content">
              { expandContent }
            </div>
          )
          : null }
      </div>
    );
  }
}


export default MenuIcon;
