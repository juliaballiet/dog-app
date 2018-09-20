import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
});

class AddDogForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            breed: '',
            weight: 0,
            birthday: ''
        }
    }

    handleInputChange = (event) => {
        console.log('handleInputChange');
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleAddDogSubmit = (event) => {
        event.preventDefault();
        console.log('in handleAddDogSubmit');
        Axios({
            method: 'POST',
            url: '/dogs',
            data: this.state
        }).then((response) => {
            console.log('back from /dogs post with: ', response.data);
            alert('dog added!');
            this.props.history.push('/dash');
        }).catch((error) => {
            console.log('/dogs post error: ', error);
            alert('handleAddDogSubmit error');
        })
    }

    render() {
        return (
            <form onSubmit={this.handleAddDogSubmit}>
                Name: <input name="name" onChange={this.handleInputChange} />
                <br /> Breed: <input name="breed" onChange={this.handleInputChange} />
                <br /> Weight: <input name="weight" onChange={this.handleInputChange} />
                <br /> Date of Birth: <input name="birthday" type="date" onChange={this.handleInputChange} />
                <input type="submit" />
            </form>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddDogForm);