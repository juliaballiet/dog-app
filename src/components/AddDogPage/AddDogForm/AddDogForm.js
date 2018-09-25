import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Datepicker from '../../Datepicker/Datepicker';
import Button from '@material-ui/core/Button';

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
            <form>
                <FormControl>
                    <InputLabel htmlFor="name-simple">Name</InputLabel>
                    <Input id="name-simple" value={this.state.name} onChange={this.handleInputChange} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="name-helper">Breed</InputLabel>
                    <Input id="name-helper" value={this.state.name} onChange={this.handleInputChange} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="name-disabled">Weight</InputLabel>
                    <Input id="name-disabled" value={this.state.name} onChange={this.handleInputChange} />
                </FormControl>
                <Datepicker label="birthday" />
                <Button onClick={this.handleAddDogSubmit} variant="contained" color="primary">Add Dog</Button>
            </form>

            // <form onSubmit={this.handleAddDogSubmit}>
            //     Name: <input name="name" onChange={this.handleInputChange} />
            //     <br /> Breed: <input name="breed" onChange={this.handleInputChange} />
            //     <br /> Weight: <input name="weight" onChange={this.handleInputChange} />
            //     <br /> Date of Birth: <input name="birthday" type="date" onChange={this.handleInputChange} />
            //     <input type="submit" />
            // </form>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddDogForm);