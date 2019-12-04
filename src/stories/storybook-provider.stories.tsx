import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { StorybookProvider, useStorybook } from '../export';


const story = storiesOf('Storybook provider', module);

story
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: true,
    },
  });

const AppInnerComponent = () => {
  const { Dates, Numbers } = useStorybook();

  return (
    <p>
      <pre>
        {`
        import { useStorybook } from '../export';

        const AppInnerComponent = () => {
          const { Dates, Numbers } = useStorybook();

          return (
          <p>
              {Dates.getDate(Date.now())}
              <br />
              {Numbers.separate(12345600000)}
              <br />
              {Numbers.cut(12345600000)}
          </p>);
        };`}
      </pre>
      {Dates.getDate(Date.now())}
      <br />
      {Numbers.separate(12345600000)}
      <br />
      {Numbers.cut(12345600000)}
    </p>
  );
};

story.add('Storybook Provider', () => (
  <StorybookProvider localeName="ru">
    <AppInnerComponent />
  </StorybookProvider>
));
