import * as React from 'react';
import {connect} from 'react-redux';
import {TopAppBar} from './';
import {State} from '../../state';
import {Dispatch} from '../../store';
import {syncBookmarks, toggleSearchPanelCollapsibility} from '../../store/actions';
import {isSearchPanelCollapsible} from '../../store/selectors';

// Instead of creating ConnectedTopAppBar,
// we can connect TopAppBar directly using `mergeDispatchToProps`.
// But it makes statically typing props hard.

export interface Props {
  readonly searchPanelCollapsible: boolean;
  readonly nowLoading: boolean;
}
export type AllProps = Props & {dispatch: Dispatch};

export const _ConnectedTopAppBar = ({dispatch, ...props}: AllProps) => {
  return (
    <TopAppBar
      nowLoading={props.nowLoading}
      onSyncClick={() => {
        dispatch(syncBookmarks());
      }}
      onToggleSearchPanelClick={() => {
        dispatch(toggleSearchPanelCollapsibility(!props.searchPanelCollapsible));
      }}
    />
  );
};

export const ConnectedTopAppBar = connect((state: State): Props => ({
  searchPanelCollapsible: isSearchPanelCollapsible(state),
  nowLoading: state.bookmarks.nowLoading,
}))(_ConnectedTopAppBar);
