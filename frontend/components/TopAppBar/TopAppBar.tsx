import * as React from 'react';
import MaterialTopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

const cls = require('./TopAppBar_styles.scss');

export interface Props {
  readonly onSyncClick: () => void;
  readonly onToggleSearchPanelClick: () => void;
}

export const TopAppBar = (props: Props) => {
  return (
    <MaterialTopAppBar
      fixed
      className={cls.topAppBar}
      title="Wracket"
      actionItems={[
        // TODO: Use clickable element
        // instead of adding onClick directly to the `i` tag.

        // TODO: Change visual during synchronization.
        <MaterialIcon key="refresh" icon="refresh" onClick={props.onSyncClick} />,

        // TODO: Change color by whether the panel is collapsible or not.
        <MaterialIcon
          key="filter_list"
          icon="filter_list"
          className={cls.searchPanelToggler}
          onClick={props.onToggleSearchPanelClick}
        />,
      ]}
    />
  );
};
