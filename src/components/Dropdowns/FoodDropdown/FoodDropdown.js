import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import '../Dropdown.css';

const mapStateToProps = state => ({
    user: state.user,
    food: state.lists.food
});

class FoodDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
        }
    }

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
        this.setState({
            selected: event.target.value,
        })
        let action = {
            type: 'NEW_FEEDING_FOOD',
            payload: event.target.value
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <FormControl>
                <InputLabel htmlFor="select-food">Select Food</InputLabel>
                <Select
                    onChange={this.handleFoodChange}
                    value={this.state.selected}
                    className="input"
                    inputProps={{
                        name: 'select-food',
                        id: 'select-food'
                    }}
                >
                    {this.props.food.map((food) => {
                        return (
                            <MenuItem key={food.id} value={food.id}>{food.brand} {food.variety}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FoodDropdown);