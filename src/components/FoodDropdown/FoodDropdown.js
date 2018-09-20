import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    food: state.lists.food
});

class FoodDropdown extends Component {
    componentDidMount = () => {
        this.getFood();
    }

    getFood = () => {
        console.log('in getFood');
        Axios({
            method: 'GET',
            url: '/list/food'
        }).then((response) => {
            console.log('back from server with: ', response.data);
            let action = {
                type: 'FOOD_LIST',
                payload: response.data
            }
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('getFood error: ', error);
            alert('getFood error');
        })
    }

    handleFoodChange = (event) => {
        let action = {
            type: 'NEW_FEEDING_FOOD',
            payload: event.target.value
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <select onChange={this.handleFoodChange}>
                <option default>select food</option>
                {this.props.food.map((food) => {
                    return(
                        <option key={food.id} value={food.id}>{food.brand} {food.variety}</option>
                    )
                })}
            </select>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FoodDropdown);