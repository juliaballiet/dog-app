import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Nav from '../Nav/Nav';
import DogDropdown from '../Dropdowns/DogDropdown/DogDropdown';

const mapStateToProps = state => ({
  user: state.user,
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
    event.preventDefault();
    console.log('in handleNewTrainingSubmit');
    Axios({
      method: 'POST',
      url: '/log/training',
      data: this.props.newExercise
    }).then((response) => {
      console.log('back from /log/training with: ', response.data);
      alert('new exercise logged!');
      this.props.history.push()
    }).catch((error) => {
      console.log('/log/training error: ', error);
      alert('handleNewTrainingSubmit error');
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <form onSubmit={this.handleNewTrainingSubmit}>
          <DogDropdown actionType="NEW_TRAINING_DOG" />
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
export default connect(mapStateToProps)(NewTrainingLogPage);