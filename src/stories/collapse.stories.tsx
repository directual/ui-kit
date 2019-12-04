import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Collapse } from '../export';

const story = storiesOf('Collapse', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

story.add('Simple Collapse', () => (
  <div style={{ width: 345, margin: 40 }}>
    <Collapse defaultExpandedKeys={['panel-2']}>
      <Collapse.Panel label="Label" key="panel-0">
        content 0
      </Collapse.Panel>
      <Collapse.Panel label="Label" key="panel-1">
        content 1
      </Collapse.Panel>
      <Collapse.Panel label="Label" key="panel-2">
        <div style={{ lineHeight: 1.74 }}>
          <div>
            Some of the probes NASA has conducted on near flying asteroids have performed some pretty amazing studies of these eccentric celestial bodies. In 1994 the Galileo probe got within 1000 miles of the asteroid Ida and discovered that Ida actually had its own moon.
          </div>
          <div style={{
            marginTop: 16,
          }}
          >
            <span className="Link_14-24">Action</span>
          </div>
        </div>
      </Collapse.Panel>
      <Collapse.Panel label="Label" key="panel-3">
        <div style={{ lineHeight: 1.74 }}>
          <div>
            Some of the probes NASA has conducted on near flying asteroids have performed some pretty amazing studies of these eccentric celestial bodies. In 1994 the Galileo probe got within 1000 miles of the asteroid Ida and discovered that Ida actually had its own moon.
          </div>
          <div style={{
            marginTop: 16,
          }}
          >
            <span className="Link_14-24">Action</span>
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>
  </div>
));
