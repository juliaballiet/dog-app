import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
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
            birthday: '2018/10/01'
        }
    }

    handleInputChange = (event) => {
        console.log('handleInputChange', event.target.value);
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
                    <Input name="name" value={this.state.name} onChange={this.handleInputChange} />
                </FormControl>
                <br /> <FormControl>
                    <InputLabel htmlFor="name-helper">Breed</InputLabel>
                    <Input name="breed" value={this.state.breed} onChange={this.handleInputChange} />
                </FormControl>
                <br /> <FormControl>
                    <InputLabel htmlFor="name-disabled">Weight</InputLabel>
                    <Input name="weight" value={this.state.weight} onChange={this.handleInputChange} />
                <br /> </FormControl>
                <br /> <TextField type="date" label="birthday" name="birthday" value={this.state.birthday} onChange={this.handleInputChange} />
                <br /> <br /> <Button className="button" onClick={this.handleAddDogSubmit} variant="extendedFab" color="primary">Add Dog</Button>
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