import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  dogProfile: state.dogProfile
});

class DogProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  componentDidMount = () => {
    this.getDogProfile();
  }

  getDogProfile = () => {
    console.log('in getDogProfile with: ', this.props.match.params.id);
    Axios({
      method: 'GET',
      url: `/dogs/${this.props.match.params.id}`
    }).then((response) => {
      console.log('back from server with: ', response.data);
      let action = {
        type: 'SET_DOG_PROFILE',
        payload: response.data[0]
      }
      this.props.dispatch(action);
    }).catch((error) => {
      console.log('getDogs error: ', error);
      alert('getDogProfile error');
    })
  }

  handleEditToggle = (event) => {
    console.log('in handleEditToggle');
    this.setState({
      edit: !this.state.edit
    })
  }

  handleNameChange = (event) => {
    let action = {
      type: 'CHANGE_NAME',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleBreedChange = (event) => {
    let action = {
      type: 'CHANGE_BREED',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleWeightChange = (event) => {
    let action = {
      type: 'CHANGE_WEIGHT',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  handleBirthdayChange = (event) => {
    let action = {
      type: 'CHANGE_BIRTHDAY',
      payload: event.target.value
    }
    this.props.dispatch(action);
  }

  render() {
    let content = null;
    let buttonText = '';

    if (this.state.edit) {
      content = (
        <div>
          <p><input onChange={this.handleNameChange} value={this.props.dogProfile.name}/></p>
          <p><input onChange={this.handleBreedChange} value={this.props.dogProfile.breed}/></p>
          <p><input onChange={this.handleWeightChange} value={this.props.dogProfile.weight}/> lbs</p>
          <p>DOB: <input onChange={this.handleBirthdayChange} value={this.props.dogProfile.birthday}/></p>
          <button onClick={this.handleSendEdit}>confirm changes</button>
        </div>
      );
      buttonText = 'cancel';
    } else {
      content = (
        <div>
          <h2>{this.props.dogProfile.name}</h2>
          <p>{this.props.dogProfile.breed}</p>
          <p>{this.props.dogProfile.weight} lbs</p>
          <p>DOB: {this.props.dogProfile.birthday}</p>
        </div>
      );
      buttonText = 'edit';
    }

    return (
      <div>
        {content}
        <button onClick={this.handleEditToggle}>{buttonText}</button>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogProfilePage);