import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddDogForm from './AddDogForm/AddDogForm';
import Header from '../Header/Header';

const mapStateToProps = state => ({
  user: state.user,
});

class AddDogPage extends Component {
  

  render() {
    return (
      <div>
        <Header />
        <AddDogForm history={this.props.history} />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddDogPage);