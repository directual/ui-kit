import React, { ReactNode, ReactNodeArray, createContext } from 'react';
import Dates, { IDates } from '../../lib/dates/index';
import { locale } from '../../lib/types/types';
import Numbers, { INumbers } from '../../lib/numbers/index';


interface IProvider {
  children: ReactNode | ReactNodeArray,
  localeName: locale,
}

export interface IStorybookContext {
  Dates: IDates,
  Numbers: INumbers,
}

export const StorybookContext = createContext<IStorybookContext>({
  Dates,
  Numbers,
});

export const StorybookProvider = ({ children, localeName }: IProvider) => {
  Dates.locale = localeName;
  Numbers.locale = localeName;

  return (
    <StorybookContext.Provider
      value={{ Dates, Numbers }}
    >
      {children}
    </StorybookContext.Provider>
  );
};
