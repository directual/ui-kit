import React from 'react';
import CardBase from './CardBase';

class CardDefault extends CardBase {
  withText = () => this.props.text && <p className="card-text">{this.props.text}</p>;

  withTags = () => this.props.tags
    && (
      <div className="tag-container">
        {this.props.tags.map((item) => item)}
      </div>
    );
}

export default CardDefault;
