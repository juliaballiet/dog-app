import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import DogDropdown from '../Dropdowns/DogDropdown/DogDropdown';
import FoodDropdown from '../Dropdowns/FoodDropdown/FoodDropdown';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  newFeeding: state.logs.newFeeding
});

class NewFeedingLogPage extends Component {

  handleDateChange = (event) => {
    let action = {
      type: 'NEW_FEEDING_DATE',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleTimeChange = (event) => {
    let action = {
      type: 'NEW_FEEDING_TIME',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleNewFeedingSubmit = (event) => {
    event.preventDefault();
    console.log('in handleNewFeedingSubmit');
    Axios({
      method: 'POST',
      url: '/log/feeding',
      data: this.props.newFeeding
    }).then((response) => {
      console.log('back from /log/feeding with: ', response.data);
      alert('new feeding logged!');
      this.props.history.push()
    }).catch((error) => {
      console.log('/log/feeding error: ', error);
      alert('handleNewFeedingSubmit error');
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <form onSubmit={this.handleNewFeedingSubmit}>
          <DogDropdown actionType="NEW_FEEDING_DOG" />
          <FoodDropdown />
          <input onChange={this.handleDateChange} type="date" />
          <input onChange={this.handleTimeChange} type="time" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(NewFeedingLogPage);