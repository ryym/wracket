import {MDCFoundation} from '../base';

export interface MDCFormFieldAdapter {
  registerInteractionHandler: (type: string, handler: EventListenerObject) => void;
  deregisterInteractionHandler: (type: string, handler: EventListenerObject) => void;
  activateInputRipple: () => void;
  deactivateInputRipple: () => void;
}

export class MDCFormFieldFoundation extends MDCFoundation {
  constructor(adapter: MDCFormFieldAdapter);
}
