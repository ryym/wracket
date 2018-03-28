import React from 'react';
import {render} from 'react-dom';
import {WelcomePage} from '../components/WelcomePage';

window.addEventListener('DOMContentLoaded', () => {
  render(<WelcomePage />, document.getElementById('welcome-root'));
});
