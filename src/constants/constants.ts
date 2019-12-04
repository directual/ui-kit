import { InputStatus } from '../lib/types/types';

type InputStatusKeys =
  'DEFAULT'
  | 'FOCUSED'
  | 'HOVERED'
  | 'VERIFIED'
  | 'DISABLED';

export const INPUT_STATUS: { [key in InputStatusKeys]: InputStatus} = {
  DEFAULT: 'default',
  FOCUSED: 'focused',
  HOVERED: 'hovered',
  VERIFIED: 'verified',
  DISABLED: 'disabled',
};

type KeyNames = 'keyDown' | 'space' | 'enter' | 'esc';

export const KEY_CODES: { [key in KeyNames]: number} = {
  keyDown: 40,
  space: 32,
  enter: 13,
  esc: 27,
};
