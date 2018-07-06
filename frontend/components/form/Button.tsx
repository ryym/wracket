import * as React from 'react';
import MDCButton, {Props as MDCProps} from '@material/react-button';

export type Props = MDCProps & {
  onClick?: (event: React.MouseEvent<any>) => void;
};

export const Button = (props: Props) => {
  return <MDCButton {...props} />;
};
