import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
});

class ManageFoodListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            edittedFood: {
                brand: this.props.food.brand,
                variety: this.props.food.variety,
                type: this.props.food.type,
                amount: this.props.food.amount,
                id: this.props.food.id
            }
        }
    }

    handleToggleEdit = (event) => {
        console.log('in handleEditToggle');
        this.setState({
            edit: !this.state.edit
        })
    }

    handleInputChange = (event) => {
        console.log('handleInputChange');
        this.setState({
            edittedFood: {
                ...this.state.edittedFood,
                [event.target.name]: event.target.value
            }
        })
    }

    handleFoodEdit = () => {
        console.log('in handleFoodEdit: ', this.state.edittedFood);
        Axios({
            method: 'PUT',
            url: '/list/food',
            data: this.state.edittedFood
        }).then((response) => {
            console.log('back from /list/food PUT with: ', response.data);
            this.handleToggleEdit();
            this.props.getFoodList();
        }).catch((error) => {
            console.log('handleFoodEdit error: ', error);
            alert('handleFoodEdit error');
        })
    }

    render() {
        let content = null;
        let buttonText = '';

        if (this.state.edit) {
            content = (
                <div>
                    <h4><input name="brand" onChange={this.handleInputChange} value={this.state.edittedFood.brand} /> 
                    <input name="variety" onChange={this.handleInputChange} value={this.state.edittedFood.variety} /></h4>
                    <p><input name="type" onChange={this.handleInputChange} value={this.state.edittedFood.type} /> -- 
                    <input name="amount" onChange={this.handleInputChange} value={this.state.edittedFood.amount} /> cups</p>
                    <button onClick={this.handleFoodEdit}>confirm edit</button>
                </div>
            );
            buttonText = 'cancel'
        } else {
            content = (
                <div>
                    <h4>{this.props.food.brand} {this.props.food.variety}</h4>
                    <p>{this.props.food.type} -- {this.props.food.amount} cups</p>
                </div>
            );
            buttonText = 'edit'
        }

        return (
            <li>
                {content}
                <br /> <button value={this.props.food.id} onClick={this.handleToggleEdit}>{buttonText}</button>
            </li>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageFoodListItem);