import React, { Component } from 'react';
import { connect } from 'react-redux';

import DogLogNav from '../DogLogNav/DogLogNav';
import FeedingLog from './FeedingLog/FeedingLog';

const mapStateToProps = state => ({
  user: state.user,
});

class FeedingLogPage extends Component {

  render() {
    return (
      <div>
        <h1>Feeding Log</h1>
        <FeedingLog id={this.props.id} />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FeedingLogPage);