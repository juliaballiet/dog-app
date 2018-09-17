import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Nav from '../Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class DogListItem extends Component {
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    return (
      <div>
        <h1>DOG LIST</h1>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogListItem);