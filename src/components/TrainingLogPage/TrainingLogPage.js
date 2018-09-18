import React, { Component } from 'react';
import { connect } from 'react-redux';

import DogLogNav from '../DogLogNav/DogLogNav';
import TrainingLog from './TrainingLog/TrainingLog';

const mapStateToProps = state => ({
  user: state.user,
});

class TrainingLogPage extends Component {
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    return (
      <div>
        <DogLogNav id={this.props.match.params.id} />
        <TrainingLog id={this.props.match.params.id} />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TrainingLogPage);