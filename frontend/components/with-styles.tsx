import * as React from 'react';
import {Styles} from './types';

// https://qiita.com/cotttpan/items/999fe07d079298c35e0c
// DiffKey<'a' | 'b' | 'c', 'b'> => 'a' | 'c'
type DiffKey<T extends string, U extends string> = ({[P in T]: P} &
  {[P in U]: never} & {[x: string]: never})[T];

type Omit<T, K extends keyof T> = Pick<T, DiffKey<keyof T, K>>;

export interface PropsWithStyles<S extends Styles = Styles> {
  styles?: S;
}

export type WithoutStyles<P extends PropsWithStyles> = Omit<P, 'styles'>;

/*
 * Inject 'styles' object to a given component.
 */
export const withStyles = <S extends Styles = Styles>(styles: S) => {
  return <P extends PropsWithStyles<S>>(
    Comp: React.ComponentType<P>,
  ): React.ComponentType<WithoutStyles<P>> => {
    const Wrapped = function ComponentWithStyles(props: WithoutStyles<P>) {
      return <Comp {...props} styles={styles} />;
    };
    const componentName = Comp.displayName || Comp.name;
    return Object.assign(Wrapped, {displayName: `WithStyles(${componentName})`});
  };
};
