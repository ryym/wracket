import * as React from 'react';
import RippledIconButton, {IconButtonBase} from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

// https://material.io/develop/web/components/buttons/icon-buttons/

// XXX: Currently creating many rippled elements based on `withRipple`
// significantly slows down the rendering speed. So provides both of
// rippled and non-rippled components for now.

export type Props = {
  readonly content: string;
  readonly label: string;
  readonly className?: string;
  readonly onClick?: () => void;
};

export const IconButton = ({content, ...props}: Props) => {
  return (
    <IconButtonBase title={props.label} {...props}>
      <MaterialIcon icon={content} className="iconButton_icon" />
    </IconButtonBase>
  );
};

export const IconButtonRipple = ({content, ...props}: Props) => {
  return (
    <RippledIconButton title={props.label} {...props}>
      <MaterialIcon icon={content} className="iconButton_icon" />
    </RippledIconButton>
  );
};
