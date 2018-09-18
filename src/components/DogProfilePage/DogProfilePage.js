import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
});

class DogProfilePage extends Component {
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
        type: 'DOG_PROFILE',
        payload: response.data
      }
      this.props.dispatch(action);
    }).catch((error) => {
      console.log('getDogs error: ', error);
      alert('getDogProfile error');
    })
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    return (
      <div>
        <h2><Link to={this.state.url}>
          {this.props.dog.name}
        </Link></h2>
        <p>{this.props.dog.breed}</p>
        <p>{this.props.dog.weight} lbs</p>
        <p>DOB: {this.props.dog.birthday}</p>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogProfilePage);