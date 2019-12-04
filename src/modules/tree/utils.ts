import {
  TreeOption,
  OptionsLookup,
  ChildrenLookup,
} from './types';

export const createOptionsLookup = (options: TreeOption[]):OptionsLookup => options.reduce((acc: OptionsLookup, option: TreeOption) => {
  acc[option.id] = option;
  return acc;
}, {});

export const createChildrenLookup = (options: TreeOption[]):ChildrenLookup => options.reduce((acc: ChildrenLookup, option: TreeOption) => {
  if (!acc[option.id]) acc[option.id] = [];
  if (!option.parentId) return acc;

  if (!acc[option.parentId]) acc[option.parentId] = [];
  acc[option.parentId] = [...acc[option.parentId], option.id];

  return acc;
}, {});
