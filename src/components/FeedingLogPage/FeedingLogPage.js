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
        <DogLogNav id={this.props.match.params.id} />
        <FeedingLog id={this.props.match.params.id} />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FeedingLogPage);