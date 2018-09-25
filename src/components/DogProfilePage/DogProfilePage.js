import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './DogProfilePage.css';
import Axios from 'axios';
import BackButton from '../BackButton/BackButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


const mapStateToProps = state => ({
  user: state.user,
  dogProfile: state.dogProfile
});

class DogProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      url: `/logs/${this.props.match.params.id}`
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
      console.log('getDogProfile error: ', error);
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
      // payload: {
      //   ...this.props.dogProfile,
      //   [event.target.name]: event.target.value
      // }
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

  handleSendEdit = () => {
    console.log('in handleSendEdit');
    Axios({
      method: 'PUT',
      url: '/dogs',
      data: this.props.dogProfile
    }).then((response) => {
      console.log('back from /dogs put with: ', response.data);
      this.getDogProfile();
      this.setState({
        edit: false
      })
    }).catch((error) => {
      console.log('handleSendEdit error: ', error);
      alert('handleSendEdit error');
    })
  }

  render() {
    let content = null;

    if (this.state.edit) {
      content = (
        <div>
          <img src={this.props.dogProfile.photo_path} />
          <p><TextField onChange={this.handleNameChange} value={this.props.dogProfile.name} /></p>
          <p><TextField onChange={this.handleBreedChange} value={this.props.dogProfile.breed} /></p>
          <p><TextField onChange={this.handleWeightChange} value={this.props.dogProfile.weight}
          InputProps={{
            endAdornment: (
              <InputAdornment variant="filled" position="end">
                lbs
              </InputAdornment>
            ),
          }} /></p>
          <p>DOB: <TextField type="date" onChange={this.handleBirthdayChange} defaultValue={moment(this.props.dogProfile.birthday).format('YYYY-MM-DD')} /></p>
          <Button onClick={this.handleSendEdit}>confirm changes</Button>
          <Button onClick={this.handleEditToggle}>cancel</Button>
        </div>
      );
    } else {
      content = (
        <div>
          <img src={this.props.dogProfile.photo_path} />
            <h2>
              {this.props.dogProfile.name}
              <Icon onClick={this.handleEditToggle} className="edit" style={{ fontSize: 20 }}>edit_icon</Icon>
            </h2>
            <p>{this.props.dogProfile.breed}</p>
            <p>{this.props.dogProfile.weight} lbs</p>
            <p>DOB: {moment(this.props.dogProfile.birthday).format('MMM D YYYY')}</p>
            <Link to={this.state.url}>
              <Button variant="extendedFab" color="primary" >View Logs</Button>
            </Link>
          </div>
          );
        }
    
        return (
      <div>
            <BackButton url="/dash" />
            {content}
          </div>
          );
        }
      }
      
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogProfilePage);