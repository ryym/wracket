import * as React from 'react';
import {IconButton} from './IconButton';

// Though MDC provides IconButtonToggle, it manages its toggle-state by itself.
// But we should control component states only by props as possible.
// And we can create the almost same functionality easily by wrapping IconButton.

export type IconItem = Readonly<{
  content: string;
  label: string;
}>;

export interface Props {
  readonly on: boolean;
  readonly iconOn: IconItem;
  readonly iconOff: IconItem;
  readonly className?: string;
  readonly onClick?: (on: boolean) => void;
}

export class IconButtonToggle extends React.Component<Props> {
  static defaultProps = {
    onClick: () => {},
  };

  enabledIcon(): IconItem {
    const {props} = this;
    return props.on ? props.iconOn : props.iconOff;
  }

  render() {
    const {props} = this;
    const icon = this.enabledIcon();
    return (
      <IconButton
        className={props.className}
        content={icon.content}
        label={icon.label}
        onClick={() => props.onClick!(props.on)}
      />
    );
  }
}
