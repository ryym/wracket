import * as React from 'react';
import {withRipple, RippleProps} from './ripple';

// https://material.io/develop/web/components/buttons/icon-buttons/

export interface Props extends RippleProps {
  readonly content: string;
  readonly label: string;
  readonly onClick?: () => void;
}

export class _IconButton extends React.Component<Props> {
  private readonly button: React.RefObject<any>;

  constructor(props: Props) {
    super(props);
    this.button = React.createRef();
  }

  componentDidMount() {
    this.props.initRipple(this.createRippleAdapter());
  }

  private createRippleAdapter() {
    const {button} = this;
    return this.props.createRippleAdapter(() => ({
      isUnbounded: () => true,
      isSurfaceActive: () => false,
      computeBoundingRect: () => button.current.getBoundingClientRect(),
      registerInteractionHandler: (type, handler) => {
        button.current.addEventListener(type, handler);
      },
      deregisterInteractionHandler: (type, handler) => {
        button.current.removeEventListener(type, handler);
      },
    }));
  }

  render() {
    const {props} = this;
    const rippleProps = {
      ...props.rippleProps,
      className: `mdc-icon-button material-icons ${props.rippleProps.className}`,
    };
    return (
      <button
        {...rippleProps}
        ref={this.button}
        title={props.label}
        aria-label={props.label}
        aria-hidden="true"
        onClick={props.onClick}
      >
        {props.content}
      </button>
    );
  }
}

export const IconButton = withRipple(_IconButton);
