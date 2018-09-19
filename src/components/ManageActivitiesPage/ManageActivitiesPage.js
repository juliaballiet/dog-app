import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../Nav/Nav';
import ManageActivitiesList from './ManageActivitiesList/ManageActivitiesList';

const mapStateToProps = state => ({
  user: state.user,
});

class ManageActivitiesPage extends Component {
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <ManageActivitiesList />
        <Link to='/add-activity'><button>Add Activity</button></Link>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageActivitiesPage);