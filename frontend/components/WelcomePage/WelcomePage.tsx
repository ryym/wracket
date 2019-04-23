import * as React from 'react';

import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';

class MyApp extends React.Component {
  state = {isOpen: true};

  render() {
    return (
      <Dialog open={this.state.isOpen}>
        <DialogTitle>My Dialog</DialogTitle>
        <DialogContent>
          <p>This is a dialog content.</p>
        </DialogContent>
        <DialogFooter>
          <DialogButton action="dismiss" onClick={() => console.log('DSSSS')}>
            Dismiss
          </DialogButton>
          <DialogButton action="accept" isDefault>
            Accept
          </DialogButton>
        </DialogFooter>
      </Dialog>
    );
  }
}

export function WelcomePage() {
  return (
    <div>
      <MyApp />
      <p>This is a Pocket client</p>
    </div>
  );
}
