import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import ManageFoodListItem from './ManageFoodListItem/ManageFoodListItem';

const mapStateToProps = state => ({
  user: state.user,
  foodList: state.lists.food
});

class ManageFoodList extends Component {
  componentDidMount() {
      this.getFoodList();
  }

  getFoodList = () => {
      console.log('in getFoodList');
      Axios({
          method: 'GET',
          url: '/list/food'
      }).then((response) => {
          console.log('back from /list/food with: ', response.data);
          let action = {
              type: 'FOOD_LIST',
              payload: response.data
          }
          this.props.dispatch(action);
      }).catch((error) => {
          console.log('getFoodList error: ', error);
          alert('getFoodList error');
      })
  }

  render() {
    return (
      <div>
        <h1>List of foods</h1>
        <ul>
            {this.props.foodList.map((food) => {
                return(
                    <ManageFoodListItem key={food.id} food={food} />
                )
            })}
        </ul>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageFoodList);