import * as React from 'react';
import * as classNames from 'classnames';
import MDCLinearProgress from '@material/react-linear-progress';

const cls = require('./LinearProgress.scss');

export interface Props {
  readonly nowLoading?: boolean;
  readonly className?: string;
}

export const LinearProgress = (props: Props) => {
  return (
    <MDCLinearProgress
      className={classNames(cls.root, props.className)}
      indeterminate={props.nowLoading}
      bufferingDots={false}
    />
  );
};
