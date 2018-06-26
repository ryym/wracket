import {MDCFoundation} from '../base';

export type WindowPageOffset = {
  x: number;
  y: number;
};

export interface RippleAdapter {
  browserSupportsCssVars: () => boolean;
  isUnbounded: () => boolean;
  isSurfaceActive: () => boolean;
  isSurfaceDisabled: () => boolean;
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  registerInteractionHandler: (evtType: string, handler: EventListenerObject) => void;
  deregisterInteractionHandler: (evtType: string, handler: EventListenerObject) => void;
  registerDocumentInteractionHandler: (evtType: string, handler: EventListenerObject) => void;
  deregisterDocumentInteractionHandler: (evtType: string, handler: EventListenerObject) => void;
  registerResizeHandler: (handler: EventListenerObject) => void;
  deregisterResizeHandler: (handler: EventListenerObject) => void;
  updateCssVariable: (name: string, value: any) => void;
  computeBoundingRect: () => ClientRect;
  getWindowPageOffset: () => WindowPageOffset;
}

export class MDCRippleFoundation extends MDCFoundation {
  constructor(adapter: RippleAdapter);
  activate(event?: any): void;
  deactivate(event?: any): void;
}

export const util: any;
