import * as React from 'react';
import * as classNames from 'classnames';
import {withRipple, RippleProps} from './ripple';

// https://material.io/develop/web/components/buttons/icon-buttons/

// XXX: Currently creating many rippled elements based on `withRipple`
// significantly slows down the rendering speed. So provides both of
// rippled and non-rippled components for now.

export type Props = {
  readonly content: string;
  readonly label: string;
  readonly className?: string;
  readonly onClick?: () => void;
};

type BaseProps = Props & Partial<RippleProps>;

class IconButtonBase extends React.PureComponent<BaseProps> {
  private readonly button: React.RefObject<any>;

  constructor(props: BaseProps) {
    super(props);
    this.button = React.createRef();
  }

  componentDidMount() {
    if (this.props.initRipple) {
      this.props.initRipple(this.createRippleAdapter());
    }
  }

  private createRippleAdapter() {
    const {button} = this;
    return this.props.createRippleAdapter!(() => ({
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
    const baseClasses = 'mdc-icon-button material-icons';
    const rippleProps = props.rippleProps
      ? {
          ...props.rippleProps,
          className: classNames(baseClasses, 'material-icons', props.rippleProps.className),
        }
      : {className: classNames(baseClasses, props.className)};
    return (
      <button
        type="button"
        {...rippleProps}
        ref={this.button}
        title={props.label}
        aria-label={props.label}
        onClick={props.onClick}
      >
        {props.content}
      </button>
    );
  }
}

export function IconButton(props: Props) {
  return <IconButtonBase {...props} />;
}

function _IconButtonRipple(props: Props & RippleProps) {
  return <IconButtonBase {...props} />;
}

export const IconButtonRipple = withRipple(_IconButtonRipple);
