import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

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
    event.preventDefault();
    console.log('in handleSubmitNewFood with: ', this.state.newFood);
    Axios({
      method: 'POST',
      url: '/list/food',
      data: this.state.newFood
    }).then((response) => {
      console.log('back from /list/food POST with: ', response.data);
      alert('New food added!');
      this.props.history.push('/manage-food');
    }).catch((error) => {
      console.log('handleFoodEdit error: ', error);
      alert('handleFoodEdit error');
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitNewFood}>
          <p>Brand: <input name="brand" onChange={this.handleInputChange} /></p>
          <p>Variety: <input name="variety" onChange={this.handleInputChange} /></p>
          <p>Type of Food: <input name="type" onChange={this.handleInputChange} /></p>
          <p>Amount per Feeding: <input name="amount" onChange={this.handleInputChange} /> Cups</p>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddFoodPage);