import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import Header from '../Header/Header';

const mapStateToProps = state => ({
  user: state.user,
});

class AddActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newActivity: {
        activity: '',
        description: '',
      }
    }
  }

  handleInputChange = (event) => {
    console.log('handleInputChange');
    this.setState({
      newActivity: {
        ...this.state.newActivity,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmitNewActivity = (event) => {
    event.preventDefault();
    console.log('in handleSubmitNewActivity with: ', this.state.newActivity);
    Axios({
      method: 'POST',
      url: '/list/activities',
      data: this.state.newActivity
    }).then((response) => {
      console.log('back from /list/activities POST with: ', response.data);
      alert('New Activity added!');
      this.props.history.push('/manage-activities');
    }).catch((error) => {
      console.log('handleSubmitNewActivity error: ', error);
      alert('handleSubmitNewActivity error');
    })
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmitNewActivity}>
          <p><TextField label="activity" name="activity" onChange={this.handleInputChange} /></p>
          <p><TextField label="description" name="description" onChange={this.handleInputChange} /></p>
          <Button type="submit" variant="contained" color="primary">Add Food</Button>
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddActivityPage);