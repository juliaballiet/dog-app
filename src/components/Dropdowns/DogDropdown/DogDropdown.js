import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    dogs: state.dogs
});

class DogDropdown extends Component {
    componentDidMount = () => {
        this.getDogs();
    }

    getDogs = () => {
        console.log('in getDogs');
        Axios({
            method: 'GET',
            url: '/dogs'
        }).then((response) => {
            console.log('back from server with: ', response.data);
            let action = {
                type: 'DOGS_LIST',
                payload: response.data
            }
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('getDogs error: ', error);
            alert('getDogs error');
        })
    }

    handleDogChange = (event) => {
        let action = {
            type: this.props.actionType,
            payload: event.target.value
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <select onChange={this.handleDogChange}>
                <option default>select dog</option>
                {this.props.dogs.map((dog) => {
                    return (
                        <option key={dog.id} value={dog.id}>{dog.name}</option>
                    )
                })}
            </select>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogDropdown);