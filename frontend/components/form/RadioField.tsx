import * as React from 'react';
import {FormField} from './FormField';
import {RippleRadio} from './Radio';

export interface Props {
  readonly id: string;
  readonly name: string;
  readonly value: string;
  readonly label: string;
  readonly rootClass?: string;
  readonly checked?: boolean;
  readonly onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RadioField({label, rootClass, ...props}: Props) {
  return (
    <FormField controlId={props.id} label={label} className={rootClass}>
      {onInitRipple => <RippleRadio {...props} onInitRipple={onInitRipple} />}
    </FormField>
  );
}
