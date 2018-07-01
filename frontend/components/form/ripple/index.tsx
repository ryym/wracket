/*
 * Forked from https://github.com/material-components/material-components-web-react/blob/a53fc7dc77ffb89bc0e58260752aa3b2540bbfbe/packages/ripple/index.js
 * We changed the `initRipple` to obtain ripple activator.
 */

import * as React from 'react';
import {RippleAdapter, MDCRippleFoundation, util} from '@material/ripple';

export type OnInitRipple = (actv: RippleActivator) => void;

export type RippleInitializer = (adapter: RippleAdapter, onInit?: OnInitRipple) => void;

export type RippleOverrider = (adapter: RippleAdapter) => Partial<RippleAdapter>;

export interface RippleItemProps {
  onMouseDown: (event: any) => void;
  onMouseUp: (event: any) => void;
  onTouchStart: (event: any) => void;
  onTouchEnd: (event: any) => void;
  onKeyDown: (event: any) => void;
  onKeyUp: (event: any) => void;
  className: string;
  style: {};
}

export interface RippleProps {
  initRipple: RippleInitializer;
  createRippleAdapter: (override: RippleOverrider) => RippleAdapter;
  rippleProps: RippleItemProps;
}

export interface RippleActivator {
  activate: () => void;
  deactivate: () => void;
}

export interface WrapperProps {
  unbounded: boolean;
  disabled: boolean;
  style: {};
  className: string;
  onMouseDown: (event: any) => void;
  onMouseUp: (event: any) => void;
  onTouchStart: (event: any) => void;
  onTouchEnd: (event: any) => void;
  onKeyDown: (event: any) => void;
  onKeyUp: (event: any) => void;
}

type FinalWrapperProps<InnerProps extends {}, WP = WrapperProps> = WP &
  Pick<InnerProps, Exclude<keyof InnerProps, keyof RippleProps>> &
  Partial<RippleProps>;

const notImplemented = () => {
  throw new Error('not implemented');
};

export const withRipple = <InnerProps extends RippleProps>(
  WrappedComponent: React.ComponentType<InnerProps>,
) => {
  class RippledComponent extends React.Component<FinalWrapperProps<InnerProps>> {
    static defaultProps = {
      unbounded: false,
      disabled: false,
      style: {},
      className: '',
      onMouseDown: () => {},
      onMouseUp: () => {},
      onTouchStart: () => {},
      onTouchEnd: () => {},
      onKeyDown: () => {},
      onKeyUp: () => {},
    };

    private static wrapperProps = [
      'unbounded',
      'style',
      'className',
      'onMouseDown',
      'onMouseUp',
      'onTouchStart',
      'onTouchEnd',
      'onKeyDown',
      'onKeyUp',
    ];

    private foundation: MDCRippleFoundation | null = null;

    state = {
      classList: new Set(),
      style: {},
    };

    componentDidMount() {
      if (!this.foundation) {
        throw new Error('You must call initRipple');
      }
    }

    componentWillUnmount() {
      if (this.foundation) {
        this.foundation.destroy();
      }
    }

    // XXX: When you click a rippled button and remove it, React warns like this:
    // > Warning: Can't call setState (or forceUpdate) on an unmounted component.
    //   This is a no-op, but it indicates a memory leak in your application.
    //   To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    //   in RippledComponent
    // It seems that the 'removeClass' (or something) is called after the foundation destroyed.
    // But the warning occurs only once. I couldn't find a way to fix this.

    private createRippleAdapter = (override: RippleOverrider): RippleAdapter => {
      const adapter: RippleAdapter = {
        browserSupportsCssVars: () => util.supportsCssVariables(window),
        isUnbounded: () => this.props.unbounded,
        isSurfaceActive: notImplemented,
        isSurfaceDisabled: () => this.props.disabled,
        addClass: className => {
          this.setState({classList: this.state.classList.add(className)});
        },
        removeClass: className => {
          const {classList} = this.state;
          classList.delete(className);
          this.setState({classList});
        },
        registerInteractionHandler: notImplemented,
        deregisterInteractionHandler: notImplemented,
        registerDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.addEventListener(evtType, handler, util.applyPassive()),
        deregisterDocumentInteractionHandler: (evtType, handler) =>
          document.documentElement.removeEventListener(evtType, handler, util.applyPassive()),
        registerResizeHandler: handler => window.addEventListener('resize', handler),
        deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
        updateCssVariable: this.updateCssVariable,
        getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset}),
        computeBoundingRect: notImplemented,
      };

      return {
        ...adapter,
        ...override(adapter),
      };
    };

    private initializeFoundation = (adapter: RippleAdapter, onInitRipple?: OnInitRipple) => {
      this.foundation = new MDCRippleFoundation(adapter);
      this.foundation.init();

      if (onInitRipple) {
        onInitRipple({
          activate: () => this.foundation!.activate(),
          deactivate: () => this.foundation!.deactivate(),
        });
      }
    };

    get classes() {
      const clss = Array.from(this.state.classList);
      if (this.props.className) {
        clss.push(this.props.className);
      }
      return clss.join(' ');
    }

    handleMouseDown = (e: any) => {
      this.props.onMouseDown(e);
      this.activateRipple(e);
    };

    handleMouseUp = (e: any) => {
      this.props.onMouseUp(e);
      this.deactivateRipple(e);
    };

    handleTouchStart = (e: any) => {
      this.props.onTouchStart(e);
      this.activateRipple(e);
    };

    handleTouchEnd = (e: any) => {
      this.props.onTouchEnd(e);
      this.deactivateRipple(e);
    };

    handleKeyDown = (e: any) => {
      this.props.onKeyDown(e);
      this.activateRipple(e);
    };

    handleKeyUp = (e: any) => {
      this.props.onKeyUp(e);
      this.deactivateRipple(e);
    };

    activateRipple = (e: any) => {
      // https://reactjs.org/docs/events.html#event-pooling
      e.persist();
      requestAnimationFrame(() => {
        this.foundation!.activate(e);
      });
    };

    deactivateRipple = (e: any) => {
      this.foundation!.deactivate(e);
    };

    updateCssVariable = (name: string, value: string) => {
      const updatedStyle = Object.assign({}, this.state.style);
      (updatedStyle as any)[name] = value;
      this.setState({style: updatedStyle});
    };

    getMergedStyles = () => {
      const {style: wrappedStyle} = this.props;
      const {style} = this.state;
      return Object.assign({}, style, wrappedStyle);
    };

    render() {
      const excluded = new Set(RippledComponent.wrapperProps);
      const otherProps = Object.keys(this.props).reduce((op: any, p) => {
        if (!excluded.has(p)) {
          op[p] = (this.props as any)[p];
        }
        return op;
      }, {});

      const updatedProps = Object.assign(otherProps, {
        rippleProps: {
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          className: this.classes,
          style: this.getMergedStyles(),
        },
        createRippleAdapter: this.createRippleAdapter,
        initRipple: this.initializeFoundation,
      });

      return <WrappedComponent {...updatedProps} />;
    }
  }

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
  return (RippledComponent as any) as React.ComponentType<
    FinalWrapperProps<InnerProps, Partial<WrapperProps>>
  >;
};
