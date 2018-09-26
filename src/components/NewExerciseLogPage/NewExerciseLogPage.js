import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import DogDropdown from '../Dropdowns/DogDropdown/DogDropdown';
import ActivityDropdown from '../Dropdowns/ActivityDropdown/ActivityDropdown';
import Axios from 'axios';
import { TextField } from '@material-ui/core';
import SubmitAlert from '../SubmitAlert/SubmitAlert';
import InputAdornment from '@material-ui/core/InputAdornment';



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
    console.log('in handleNewExerciseSubmit');
    Axios({
      method: 'POST',
      url: '/log/exercise',
      data: this.props.newExercise
    }).then((response) => {
      console.log('back from /log/exercise with: ', response.data);
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
          <br /><ActivityDropdown />
          <br /><TextField onChange={this.handleDateChange} type="date" />
          <br />Duration: <TextField onChange={this.handleDurationChange} InputProps={{
            endAdornment: (
              <InputAdornment variant="filled" position="end">
                minutes
              </InputAdornment>
            ),
          }}  />
          <br /> Notes: <TextField onChange={this.handleNotesChange} />
          <br /><SubmitAlert word="exercise" newEntry={this.handleNewExerciseSubmit} />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(NewExerciseLogPage);