import React, { Component } from 'react';
import './BlockHeader.scss';

type Props = {
  /** Main header text */
  accentText: string,
  /** Secondary text */
  secondaryText?: string,
  /** Icon or IconButton component */
  icon?: React.ReactNode;
};

class BlockHeader extends Component<Props> {
  render() {
    const { secondaryText, accentText, icon } = this.props;
    return (
      <div className="block-header">
        <div className="text-wrapper">
          { secondaryText
            && <p className="text-secondary">{ secondaryText }</p>}
          <p className="text-accent">{ accentText }</p>
        </div>
        <div>
          {icon}
        </div>
      </div>
    );
  }
}

export default BlockHeader;
