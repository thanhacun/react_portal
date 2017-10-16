import React, { Component } from 'react';
import SocialLogin from 'react-social-login';

import config from '../config/auth';

const Button = ({ children, triggerLogin, ...props }) => (
  <button onClick={triggerLogin} {...props}>
    { children }
  </button>
);

const RawSocialButton = SocialLogin(Button);

// add appId to the component based on the value of provider
// to keep social buttons simple (no need to repeat appId )
class SocialButton extends Component {
  render(){
    const newProps = {
      appId: config.appId[this.props.provider]
    }

    return (
      <RawSocialButton { ...this.props } { ...newProps}>
        { this.props.children }
      </RawSocialButton>
    );
  }
}

export default SocialButton;
