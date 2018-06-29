import * as React from 'react';
import MaterialTopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

const cls = require('./TopAppBar_styles.scss');

export const TopAppBar = () => {
  return (
    <MaterialTopAppBar
      fixed
      className={cls.topAppBar}
      title="Wracket"
      actionItems={[<MaterialIcon key="more" icon="more_vert" />]}
    />
  );
};
