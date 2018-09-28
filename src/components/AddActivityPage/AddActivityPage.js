import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { TextField } from '@material-ui/core';
import Header from '../Header/Header';
import SubmitAlert from '../SubmitAlert/SubmitAlert';

const mapStateToProps = state => ({
  user: state.user,
});

class AddActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newActivity: {
        name: '',
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
    console.log('in handleSubmitNewActivity with: ', this.state.newActivity);
    Axios({
      method: 'POST',
      url: '/list/activities',
      data: this.state.newActivity
    }).then((response) => {
      console.log('back from /list/activities POST with: ', response.data);
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
          <p><TextField label="name" name="name" onChange={this.handleInputChange} /></p>
          <p><TextField label="description" name="description" onChange={this.handleInputChange} /></p>
          <SubmitAlert words="activity added!"
           newEntry={this.handleSubmitNewActivity}
           buttonText="Add Activity"
           address="/manage-activities"
           history={this.props.history} />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddActivityPage);