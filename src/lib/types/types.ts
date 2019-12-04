import { ReactNode } from 'react';

export type ColorGroup =
  '1-1' | '1-2' | '1-3' | '1-4' | '1-5' | '1-6' | '1-7' | '1-8' | '1-9' | '1-10'
  | '1-11' | '1-12' | '2-1' | '2-2' | '2-3' | '2-4' | '2-5' | '2-6' | '2-7' | '2-8' | '2-9'
  | '2-10' | '2-11' | '2-12' | '3-1' | '3-2' | '3-3' | '3-4' | '3-5' | '3-6' | '3-7' | '3-8'
  | '3-9' | '3-10' | '3-11' | '3-12';
export type UserColor = 'lightGold' | 'bloodOrange' | 'butterscotch' | 'fadedOrange' | 'dullOrange' | 'maize' | 'brownishOrange' | 'dustyOrange' | 'sienna' | 'brownishRed' | 'milkChocolate' | 'cocoa' | 'lightGreen' | 'paleTeal' | 'lightTeal' | 'seafoamBlue' | 'greyblue' | 'darkSkyBlue' | 'siler' | 'cobalt' | 'windowsBlue' | 'duskBlue' | 'coolBlue' | 'palePeach' | 'midBlue' | 'peachyPink' | 'chumSalmon' | 'rosePink' | 'paleSalmon' | 'warmPink' | 'rosyPink' | 'uglyPurple' | 'purple' | 'darkishPink' | 'warmPurple' | 'darkPurple';

export type DefaultOption = {
  id: number | string;
  value: string;
  selected?: boolean;
  groupId?: number | string;
  className?: string;
  icon?: string | ReactNode;
  multiline?: string;
  [key: string]: any;
};

export type DefaultGroups = {
  id: number | string;
  value: string;
};

export type InputStatus =
'focused'
| 'hovered'
| 'default'
| 'normal'
| 'disabled'
| 'error'
| 'verified'
| 'loading'
| '';

export type locale = 'ru' | 'en';
