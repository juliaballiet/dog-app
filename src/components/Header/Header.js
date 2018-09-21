import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../Menu/Menu';

class Header extends Component {
  render() {
    return (
      <div>
        <Menu />
        <h1>Dog App</h1>
      </div>
    );
  }
}

export default connect()(Header);
