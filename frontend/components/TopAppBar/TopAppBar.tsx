import * as React from 'react';
import MaterialTopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

export const TopAppBar = () => {
  return (
    <div>
      <MaterialTopAppBar
        title="Wracket"
        actionItems={[<MaterialIcon key="more" icon="more_vert" />]}
      />
    </div>
  );
};
