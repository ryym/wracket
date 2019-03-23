import * as React from 'react';
import MDCButton, {ButtonProps} from '@material/react-button';

// https://github.com/material-components/material-components-web-react/tree/rc0.12.0/packages/button
type MDCProps = Pick<ButtonProps<HTMLButtonElement>, 'outlined'>;

export type Props = MDCProps & {
  onClick?: (event: React.MouseEvent<any>) => void;
};

export const Button = (props: Props) => {
  return <MDCButton {...props} />;
};
