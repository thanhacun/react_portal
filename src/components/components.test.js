import React from 'react';
import ReactDOM from 'react-dom';
//import { shallow } from 'enzyme';
import Welcome from './Welcome';
import Menu from './Menu';

it ('Renders Welcome without crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Welcome />, div);
  //shallow (<SocialButton />);
});

it ('Renders Menu without crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Menu />, div);
});
