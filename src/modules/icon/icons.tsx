import React from 'react';
import Icon from './index';

import { getSvgCollection } from './svgCollection';

const svgCollection = getSvgCollection();


class Icons extends React.Component<{}> {
  render() {
    const style = {
      height: '32px',
      width: '32px',
      color: '#eca910',
      marginRight: '25px',
      marginBottom: '4px',
    };
    const className = 'hey ho';
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        {
          Object.keys(svgCollection).map((key, index) => (
            <React.Fragment key={key}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
                <div style={{ width: '32px', height: '32px', marginRight: '5px' }}>
                  <Icon
                    style={style}
                    className={className}
                    type={key}
                  />
                </div>
                <span>{key}</span>
              </div>
            </React.Fragment>
          ))
        }
      </div>
    );
  }
}

export default Icons;
