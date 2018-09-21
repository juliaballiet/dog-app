import React, { Component } from 'react';
import { connect } from 'react-redux';

import DogLogNav from '../DogLogNav/DogLogNav';
import ExerciseLog from './ExerciseLog/ExerciseLog';

const mapStateToProps = state => ({
  user: state.user,
});

class ExerciseLogPage extends Component {

  render() {
    return (
      <div>
        <h1>Exercise Log</h1>
        <ExerciseLog id={this.props.id} />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ExerciseLogPage);