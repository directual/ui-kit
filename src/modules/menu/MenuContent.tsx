import React, { Component, ReactNode } from 'react';
import IconButton from '../button/IconButton';

import './Menu.scss';


type Props = {
  /** Menu content (as buttons) */
  content: ReactNode[];
  /** expandContent content */
  expandContent?: ReactNode;
};

type State = {
  expandStatus: 'down' | 'up';
};

class MenuContent extends Component<Props, State> {
  source: any;

  static defaultProps: Pick<Props, 'expandContent'> = {
    expandContent: null,
  };


  constructor(props: Props) {
    super(props);
    this.state = {
      expandStatus: 'down',
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

  renderActions = (): ReactNode => {
    const { content } = this.props;
    return (
      <div className="default-menu-actions-wrapper">
        {content.map((item) => item)}
      </div>
    );
  };

  renderContent = (): ReactNode => {
    let dropdownRender = null;
    const { expandContent } = this.props;
    const { expandStatus } = this.state;

    if (expandContent) {
      dropdownRender = (
        <IconButton className="expand" onClick={this.onExpand} icon={expandStatus} />
      );
    }

    return (
      <div className="menu-container" ref={(source) => { this.source = source; }}>
        { this.renderActions() }
        { dropdownRender }
      </div>
    );
  };

  render() {
    const { content, expandContent } = this.props;
    const { expandStatus } = this.state;
    return (
      <div className="card-menu">
        <div className="upper-border" />
        <div className="menu-container-wrapper">
          {content || expandContent
            ? this.renderContent()
            : null }
        </div>
        { expandStatus === 'up' && expandContent
          ? (
            <div className="expand-content">
              {expandContent}
            </div>
          )
          : null}
      </div>
    );
  }
}

export default MenuContent;
