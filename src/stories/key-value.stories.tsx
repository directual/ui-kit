import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { KeyValue } from '../export';


const story = storiesOf('Key-value', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

const data = [
  {
    key: 'Author',
    value: () => (
      <div>
Estelle Lawson&nbsp;&nbsp;
        <span className="Link_14-24">Details</span>
      </div>
    ),
  },
  {
    key: 'Created',
    value: 'July 12, 2018, 16:54:34.334',
  },
  {
    key: 'Changed',
    value: 'July 12, 2018, 16:54:34.334',
  },
  {
    key: 'Choosing A Quality Cookware Set',
    value: 'Choose wisely',
  },
  {
    key: 'Recipe',
    value: 'You invest a lot of time and money into the steaks for a special occasion and when dinner time comes, they are tough. What happened? How can you cook steaks as tender as your favorite restaurant?',
  },
];


story.add('key-value', () => (
  <KeyValue
    data={data}
    keyColStyle={{ width: 121 }}
    valueColStyle={{ width: 216 }}
  />
));
