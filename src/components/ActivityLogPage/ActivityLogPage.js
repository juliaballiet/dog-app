import React, { Component } from 'react';
import { connect } from 'react-redux';

import DogLogNav from '../DogLogNav/DogLogNav';
import ActivityLog from './ActivityLog/ActivityLog';
const mapStateToProps = state => ({
  user: state.user,
});

class ActivityLogPage extends Component {

  render() {
    return (
      <div>
        <DogLogNav id={this.props.match.params.id} />
        <ActivityLog id={this.props.match.params.id} />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ActivityLogPage);