import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


import Header from '../Header/Header';
import ManageFoodList from './ManageFoodList/ManageFoodList';

const mapStateToProps = state => ({
  user: state.user,
});

class ManageFoodPage extends Component {
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    return (
      <div>
        <Header />
        <ManageFoodList />
        <br />
        <Link className="link" to='/add-food'>
          <Button variant="extendedFab" color="primary">Add Food</Button>
        </Link>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageFoodPage);