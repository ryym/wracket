import * as React from 'react';
import {render} from 'react-dom';
import {WelcomePage} from '../components/WelcomePage';

import '../base.scss';

window.addEventListener('DOMContentLoaded', () => {
  render(<WelcomePage />, document.getElementById('welcome-root'));
});
