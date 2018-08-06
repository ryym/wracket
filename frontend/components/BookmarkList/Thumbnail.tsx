import * as React from 'react';

export type Props = {
  src: string;
} & {[key: string]: any};

type State = {
  src?: string;
};

// Thumbnail simply wraps img tag to lazy load the src.
export class Thumbnail extends React.PureComponent<Props, State> {
  state: State = {};

  componentDidMount() {
    setTimeout(() => this.setState({src: this.props.src}));
  }

  render() {
    const {state} = this;
    const {src, ...props} = this.props;
    if (state.src == null) {
      return null;
    }
    return <img src={state.src} {...props} />;
  }
}
