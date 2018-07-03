import * as React from 'react';
import * as classNames from 'classnames';
import {MDCFormFieldFoundation} from '@material/form-field';
import {RippleActivator, OnInitRipple} from './ripple';

export interface Props {
  readonly controlId: string;
  readonly label: string;
  readonly className?: string;
  readonly children: (init: OnInitRipple) => void;
}

export class FormField extends React.Component<Props> {
  private readonly label: React.RefObject<any>;
  private foundation: MDCFormFieldFoundation | null;
  private rippleActivator: RippleActivator | null;

  constructor(props: Props) {
    super(props);
    this.label = React.createRef();
    this.foundation = null;
    this.rippleActivator = null;
  }

  componentDidMount() {
    if (this.rippleActivator == null) {
      throw new Error('ripple does not be initialized');
    }

    const {rippleActivator} = this;
    this.foundation = new MDCFormFieldFoundation({
      registerInteractionHandler: (type, handler) =>
        this.label.current.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) =>
        this.label.current.removeEventListener(type, handler),
      activateInputRipple: () => rippleActivator.activate(),
      deactivateInputRipple: () => rippleActivator.deactivate(),
    });
    this.foundation.init();
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }

  onInitRipple = (activator: RippleActivator) => {
    this.rippleActivator = activator;
  };

  render() {
    const {controlId, label, children: renderControl} = this.props;
    return (
      <div className={classNames('mdc-form-field', this.props.className)}>
        {renderControl(this.onInitRipple)}
        <label htmlFor={controlId} ref={this.label}>
          {label}
        </label>
      </div>
    );
  }
}
