import {Component} from 'react';

export type Props = Readonly<{
  className?: string;
  raised?: boolean;
  unelevated?: boolean;
  outlined?: boolean;
  icon?: any;
  children?: any;
  disabled?: boolean;
}>;

export default class Button extends Component<Props> {}
