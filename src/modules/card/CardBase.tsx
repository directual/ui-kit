import React, { Component, ReactNode } from 'react';
import cn from 'classnames';
import Badge from '../badge/Badge';
import { UserColor } from '../../lib/types/types';

import './Card.scss';

export type CardProps = {
  /** Header text */
  header: string;
  /** Header commentText */
  headerComment?: string;
  /** Main text */
  text?: string;
  /** Card image */
  image?: {
    url?: string,
    color?: UserColor,
    icon?: string,
  };
  /** Card badge counter */
  count?: number;
  /** Array of Tag elements */
  tags?: ReactNode[];
  /** CardMenu component or custom JSX element */
  menu?: ReactNode;
  /** Card wrapper className */
  className?: string;
};

type State = {
  fixBadge: boolean;
};

class CardBase extends Component<CardProps, State> {
  badgeRef: any = null;

  headerRef: any = null;

  state = {
    fixBadge: false,
  };

  componentDidMount(): void {
    const { fixBadge } = this.state;
    if (!fixBadge && this.hasBadgeOverflow) {
      this.setState({ fixBadge: true });
    }
  }

  get hasBadgeOverflow() {
    return (
      this.badgeRef
      && this.headerRef
      && this.badgeRef.offsetTop > this.headerRef.offsetHeight
    );
  }

  withImage = ():ReactNode => null;

  withText = ():ReactNode => null;

  withTags = ():ReactNode => null;

  render() {
    const {
      className,
      header,
      count,
      menu,
      headerComment,
    } = this.props;
    const { fixBadge } = this.state;
    return (
      <div className={cn('card-default', className)}>
        { this.withImage() }
        <div className="card-content-wrapper">
          <div ref={(node) => { this.headerRef = node; }} className="card-header">
            <span className="line-clamp">{header}</span>
            {
              count
              && (
              <div
                ref={(node) => { this.badgeRef = node; }}
                className={cn(
                  'badge-wrapper',
                  { 'badge-fixed': fixBadge },
                )}
              >
                <Badge className="card-badge" count={count} />
              </div>
              )
            }
          </div>
          {
            headerComment
            && <p className="header-comment">{headerComment}</p>
          }
          {this.withText()}
          {this.withTags()}
        </div>

        {menu}
      </div>
    );
  }
}

export default CardBase;
