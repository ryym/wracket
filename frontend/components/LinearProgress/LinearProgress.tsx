import * as React from 'react';
import {MDCLinearProgress} from '@material/linear-progress';

const cls = require('./LinearProgress_styles.scss');

// https://material.io/develop/web/components/linear-progress
// Note that currently we don't use a custom adapter.

export interface Props {
  readonly nowLoading?: boolean;
  readonly className?: string;
}

export class LinearProgress extends React.Component<Props> {
  private root: React.RefObject<any>;
  private mdcComponent: MDCLinearProgress | null;

  constructor(props: any) {
    super(props);
    this.root = React.createRef();
    this.mdcComponent = null;
  }

  componentDidMount() {
    this.mdcComponent = new MDCLinearProgress(this.root.current);
    this.mdcComponent.determinate = !this.props.nowLoading;
  }

  componentDidUpdate() {
    this.mdcComponent!.determinate = !this.props.nowLoading;
  }

  componentWillUnmount() {
    this.mdcComponent!.destroy();
  }

  render() {
    const {props} = this;
    return (
      <div
        ref={this.root}
        role="progressbar"
        className={`mdc-linear-progress ${cls.root} ${props.className || ''}`}
        style={{display: props.nowLoading ? 'block' : 'none'}}
      >
        <div className="mdc-linear-progress__buffer" />
        <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span className="mdc-linear-progress__bar-inner" />
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span className="mdc-linear-progress__bar-inner" />
        </div>
      </div>
    );
  }
}
