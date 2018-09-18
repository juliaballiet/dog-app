import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
});

class FeedingLog extends Component {
    

  render() {
    return (
      <div>

      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FeedingLog);