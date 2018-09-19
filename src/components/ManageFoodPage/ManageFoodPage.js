import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../Nav/Nav';
import ManageFoodList from './ManageFoodList/ManageFoodList';

const mapStateToProps = state => ({
  user: state.user,
});

class ManageFoodPage extends Component {
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <ManageFoodList />
        <Link to='/add-food'><button>Add Food</button></Link>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageFoodPage);