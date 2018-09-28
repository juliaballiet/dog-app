import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Header from '../Header/Header';
import SubmitAlert from '../SubmitAlert/SubmitAlert';

const mapStateToProps = state => ({
  user: state.user,
});

class AddFoodPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFood: {
        brand: '',
        variety: '',
        type: '',
        amount: 0
      }
    }
  }

  handleInputChange = (event) => {
    console.log('handleInputChange');
    this.setState({
      newFood: {
        ...this.state.newFood,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmitNewFood = (event) => {
    console.log('in handleSubmitNewFood with: ', this.state.newFood);
    Axios({
      method: 'POST',
      url: '/list/food',
      data: this.state.newFood
    }).then((response) => {
      console.log('back from /list/food POST with: ', response.data);
      this.props.history.push('/manage-food');
    }).catch((error) => {
      console.log('handleFoodEdit error: ', error);
      alert('handleFoodEdit error');
    })
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmitNewFood}>
          <h2>Add New Food</h2>
          <p><TextField label="brand" placeholder="Orijen" name="brand" onChange={this.handleInputChange} /></p>
          <p><TextField label="variety" placeholder="Six Fish" name="variety" onChange={this.handleInputChange} /></p>
          <p><TextField label="type of food" name="type" placeholder="kibble" onChange={this.handleInputChange} /></p>
          <SubmitAlert words="food added!"
           newEntry={this.handleSubmitNewFood}
           buttonText="Add Food"
           address="/manage-food"
           history={this.props.history} />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddFoodPage);