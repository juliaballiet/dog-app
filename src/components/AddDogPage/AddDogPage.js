import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddDogForm from './AddDogForm/AddDogForm';
import Nav from '../Nav/Nav';

const mapStateToProps = state => ({
  user: state.user,
});

class AddDogPage extends Component {
  

  render() {
    return (
      <div>
        <Nav />
        <AddDogForm />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddDogPage);