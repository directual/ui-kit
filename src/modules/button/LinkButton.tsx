import React from 'react';
import Button from './Button';
import { ButtonProps } from './types';

type LinkButtonProps = Omit<ButtonProps, 'type'>;

// deprecated
// prefer <Button type="link" /> than <LinkButton />
const LinkButton = (props: LinkButtonProps) => (
  <Button
    {...props}
    type="link"
  />
);

export default LinkButton;
