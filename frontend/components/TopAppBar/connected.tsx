import * as React from 'react';
import {connect} from 'react-redux';
import {TopAppBar} from './';
import {State} from '../../state';
import {Dispatch} from '../../store';
import {toggleSearchPanelCollapsibility} from '../../store/actions';
import {isSearchPanelCollapsible} from '../../store/selectors';

// Instead of creating ConnectedTopAppBar,
// we can connect TopAppBar directly using `mergeDispatchToProps`.
// But it makes statically typing props hard.

export interface Props {
  readonly searchPanelCollapsible: boolean;
}
export type AllProps = Props & {dispatch: Dispatch};

export const _ConnectedTopAppBar = ({dispatch, ...props}: AllProps) => {
  return (
    <TopAppBar
      onToggleSearchPanelClick={() => {
        dispatch(toggleSearchPanelCollapsibility(!props.searchPanelCollapsible));
      }}
    />
  );
};

export const ConnectedTopAppBar = connect((state: State): Props => ({
  searchPanelCollapsible: isSearchPanelCollapsible(state),
}))(_ConnectedTopAppBar);
