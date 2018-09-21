import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import DogDropdown from '../Dropdowns/DogDropdown/DogDropdown';
import ActivityDropdown from '../Dropdowns/ActivityDropdown/ActivityDropdown';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  newExercise: state.logs.newExercise
});

class NewExerciseLogPage extends Component {
 
  handleDateChange = (event) => {
    let action = {
      type: 'NEW_EXERCISE_DATE',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleDurationChange = (event) => {
    let action = {
      type: 'NEW_EXERCISE_DURATION',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleNotesChange = (event) => {
    let action = {
      type: 'NEW_EXERCISE_NOTES',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleNewExerciseSubmit = (event) => {
    event.preventDefault();
    console.log('in handleNewExerciseSubmit');
    Axios({
      method: 'POST',
      url: '/log/exercise',
      data: this.props.newExercise
    }).then((response) => {
      console.log('back from /log/exercise with: ', response.data);
      alert('new exercise logged!');
      this.props.history.push()
    }).catch((error) => {
      console.log('/log/exercise error: ', error);
      alert('handleNewExerciseSubmit error');
    })
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleNewExerciseSubmit}>
          <DogDropdown actionType="NEW_EXERCISE_DOG" />
          <ActivityDropdown />
          <input onChange={this.handleDateChange} type="date" />
          Duration: <input onChange={this.handleDurationChange} /> minutes
          <br /> Notes: <input onChange={this.handleNotesChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(NewExerciseLogPage);