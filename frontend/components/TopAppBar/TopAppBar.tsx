import * as React from 'react';
import MaterialTopAppBar from '@material/react-top-app-bar';
import {IconButtonRipple as IconButton} from '../form/IconButton';
import {LinearProgress} from '../LinearProgress';

const cls = require('./TopAppBar_styles.scss');

export interface Props {
  readonly onSyncClick: () => void;
  readonly onToggleSearchPanelClick: () => void;
  readonly nowLoading?: boolean;
}

export const TopAppBar = (props: Props) => {
  return (
    <div>
      <MaterialTopAppBar
        fixed
        className={cls.topAppBar}
        title="Wracket"
        actionItems={[
          // TODO: Change visual during synchronization.
          <IconButton
            key="refresh"
            content="refresh"
            label="Refresh bookmark list"
            onClick={props.onSyncClick}
          />,

          // TODO: Change color by whether the panel is collapsible or not.
          <IconButton
            key="filter_list"
            content="filter_list"
            label="Open or close search panel"
            className={cls.searchPanelToggler}
            onClick={props.onToggleSearchPanelClick}
          />,
        ]}
      />
      <LinearProgress className={cls.progressBar} nowLoading={props.nowLoading} />
    </div>
  );
};
