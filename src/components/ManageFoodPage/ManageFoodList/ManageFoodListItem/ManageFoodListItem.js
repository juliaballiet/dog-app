import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
});

class ManageFoodListItem extends Component {

  render() {
    return (
      <li>
          <h4>{this.props.food.brand} {this.props.food.variety}</h4>
          {this.props.food.type} -- {this.props.food.amount} cups
      </li>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageFoodListItem);