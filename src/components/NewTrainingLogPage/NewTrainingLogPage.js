import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Header from '../Header/Header';
import DogDropdown from '../Dropdowns/DogDropdown/DogDropdown';
import SkillDropdown from '../Dropdowns/SkillDropdown/SkillDropdown';
import { TextField } from '@material-ui/core';
import SubmitAlert from '../SubmitAlert/SubmitAlert';
import InputAdornment from '@material-ui/core/InputAdornment';

const mapStateToProps = state => ({
  user: state.user,
  newTraining: state.logs.newTraining,
});

class NewTrainingLogPage extends Component {
  handleDateChange = (event) => {
    let action = {
      type: 'NEW_TRAINING_DATE',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleDurationChange = (event) => {
    let action = {
      type: 'NEW_TRAINING_DURATION',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleNotesChange = (event) => {
    let action = {
      type: 'NEW_TRAINING_NOTES',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleNewTrainingSubmit = (event) => {
    console.log('in handleNewTrainingSubmit');
    Axios({
      method: 'POST',
      url: '/log/training',
      data: this.props.newTraining
    }).then((response) => {
      console.log('back from /log/training with: ', response.data);
    }).catch((error) => {
      console.log('/log/training error: ', error);
      alert('handleNewTrainingSubmit error');
    })
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleNewTrainingSubmit}>
          <DogDropdown actionType="NEW_TRAINING_DOG" />
          <SkillDropdown />
          <br /><TextField onChange={this.handleDateChange} type="date" />
          <br />Duration: <TextField onChange={this.handleDurationChange} InputProps={{
            endAdornment: (
              <InputAdornment variant="filled" position="end">
                minutes
              </InputAdornment>
            ),
          }}  />
          <br /> Notes: <TextField onChange={this.handleNotesChange} />
          <br /><br /><SubmitAlert 
            words="new training log added!" 
            newEntry={this.handleNewTrainingSubmit}
            buttonText="submit"
            reload="true" />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(NewTrainingLogPage);