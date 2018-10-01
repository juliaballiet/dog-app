import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../Menu/Menu';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Menu />
        <h1 className="header__title">Paw Prints</h1>
      </div>
    );
  }
}

export default connect()(Header);
