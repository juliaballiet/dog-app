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
    dogs: state.dogs,
});

class DogDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        }
    }

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
        this.setState({
            selected: event.target.value
        })
        let action = {
            type: this.props.actionType,
            payload: event.target.value
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <FormControl>
                <InputLabel htmlFor="select-dog">Select Dog</InputLabel>
                <Select
                    onChange={this.handleDogChange}
                    className="input"
                    value={this.state.selected}
                    inputProps={{
                        name: 'select-dog',
                        id: 'select-dog'
                    }}
                >
                    {this.props.dogs.map((dog) => {
                        return (
                            <MenuItem key={dog.id} value={dog.id}>{dog.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogDropdown);