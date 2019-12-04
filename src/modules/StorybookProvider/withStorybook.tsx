import React, { useContext } from 'react';

import { StorybookContext, IStorybookContext } from './StorybookProvider';
import { IDates } from '../../lib/dates/index';
import { INumbers } from '../../lib/numbers/index';


export const withStorybook = <T extends (IDates & INumbers)>(Component: React.ComponentType<T>) => (props: Omit<T, 'Dates' | 'Numbers'>) => (
  <StorybookContext.Consumer>
    { ({ Dates, Numbers }) => (<Component {...props as T} Dates={Dates} Numbers={Numbers} />)}
  </StorybookContext.Consumer>
);

export const useStorybook = ():IStorybookContext => useContext(StorybookContext);
