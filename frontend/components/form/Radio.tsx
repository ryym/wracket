import * as React from 'react';
import {withRipple, RippleProps, OnInitRipple} from './ripple';

export interface Props extends RippleProps {
  readonly onInitRipple: OnInitRipple;
  readonly name: string;
  readonly id?: string;
  readonly value: string;
  readonly className?: string;
  readonly checked?: boolean;
  readonly onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Radio extends React.Component<Props> {
  private readonly root: React.RefObject<any>;
  private readonly radio: React.RefObject<any>;

  constructor(props: Props) {
    super(props);
    this.root = React.createRef();
    this.radio = React.createRef();
  }

  componentDidMount() {
    const {root, radio} = this;

    const adapter = this.props.createRippleAdapter(() => ({
      isUnbounded: () => true,
      isSurfaceActive: () => false,
      computeBoundingRect: () => root.current.getBoundingClientRect(),
      registerInteractionHandler: (type, handler) => radio.current.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) =>
        radio.current.removeEventListener(type, handler),
    }));
    this.props.initRipple(adapter, this.props.onInitRipple);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange != null) {
      this.props.onChange(this.props.value, event);
    }
  };

  render() {
    const {props} = this;
    const rippleProps = {
      ...props.rippleProps,
      className: `mdc-radio ${props.rippleProps.className}`,
    };
    return (
      <div className="mdc-form-field">
        <div ref={this.root} {...rippleProps}>
          <input
            className="mdc-radio__native-control"
            type="radio"
            id={props.id}
            name={props.name}
            ref={this.radio}
            onChange={this.handleChange}
            checked={props.checked}
          />
          <div className="mdc-radio__background">
            <div className="mdc-radio__outer-circle" />
            <div className="mdc-radio__inner-circle" />
          </div>
        </div>
      </div>
    );
  }
}

export const RippleRadio = withRipple(Radio);
