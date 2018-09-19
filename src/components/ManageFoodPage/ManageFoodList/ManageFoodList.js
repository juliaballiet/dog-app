import React, { Component } from 'react';
import { connect } from 'react-redux';

// import ManageFoodListItem from './ManageFoodListItem/ManageFoodListItem';

const mapStateToProps = state => ({
  user: state.user,
});

class ManageFoodList extends Component {
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    return (
      <div>
        <h1>List of foods</h1>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageFoodList);