import React from 'react';
import Button from './Button';
import { ButtonProps } from './types';

type AccentButtonProps = Omit<ButtonProps, 'type'>;

// deprecated
// prefer <Button type="accent" /> than <AccentButton />
const AccentButton = (props: AccentButtonProps) => (
  <Button
    type="accent"
    {...props}
  />
);

export default AccentButton;
