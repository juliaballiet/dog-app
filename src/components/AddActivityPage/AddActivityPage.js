import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

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
        <form onSubmit={this.handleSubmitNewActivity}>
          <p>Activity: <input name="activity" onChange={this.handleInputChange} /></p>
          <p>Description: <input name="description" onChange={this.handleInputChange} /></p>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddActivityPage);