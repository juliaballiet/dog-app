import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import DogList from '../DogList/DogList';

import { USER_ACTIONS } from '../../redux/actions/userActions';


const mapStateToProps = state => ({
  user: state.user,
});

class DashboardPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1 id="welcome">
            Welcome, { this.props.user.userName }!
          </h1>
          <DogList history={this.props.history} />
        </div>
      );
    }

    return (
      <div>
        <Header />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DashboardPage);

