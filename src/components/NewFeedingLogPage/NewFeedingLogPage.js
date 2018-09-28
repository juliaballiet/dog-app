import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import DogDropdown from '../Dropdowns/DogDropdown/DogDropdown';
import FoodDropdown from '../Dropdowns/FoodDropdown/FoodDropdown';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import SubmitAlert from '../SubmitAlert/SubmitAlert';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import '../Dropdowns/Dropdown.css';


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

  handleAmountChange = (event) => {
    let action = {
      type: 'NEW_FEEDING_AMOUNT',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleNewFeedingSubmit = (event) => {
    console.log('in handleNewFeedingSubmit');
    Axios({
      method: 'POST',
      url: '/log/feeding',
      data: this.props.newFeeding
    }).then((response) => {
      console.log('back from /log/feeding with: ', response.data);
    }).catch((error) => {
      console.log('/log/feeding error: ', error);
      alert('handleNewFeedingSubmit error');
    })
  }

  render() {
    return (
      <div>
        <Header />
        <form>
          <DogDropdown actionType="NEW_FEEDING_DOG" />
          <br /><FoodDropdown />
          <br /><TextField className="input" onChange={this.handleDateChange} type="date" />
          <br /><TextField className="input" onChange={this.handleTimeChange} type="time" />
          <br /><Input
            onChange={this.handleAmountChange}
            endAdornment={
              <InputAdornment position="end">cups</InputAdornment>
            }
          />
          <br /><SubmitAlert words="new feeding log added!"
          newEntry={this.handleNewFeedingSubmit}
          buttonText="submit"
          reload="true" />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(NewFeedingLogPage);