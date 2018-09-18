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
        <DogLogNav id={this.props.match.params.id} />
        <ExerciseLog id={this.props.match.params.id} />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ExerciseLogPage);