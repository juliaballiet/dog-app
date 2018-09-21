import React, { Component } from 'react';
import { connect } from 'react-redux';
import DogListItem from './DogListItem/DogListItem';
import Axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

const mapStateToProps = state => ({
    user: state.user,
    dogs: state.dogs
});

class DogList extends Component {

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

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleAddDog = (event) => {
        this.props.history.push('/add-dog');
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.dogs.map((dog) => {
                        return (
                            <DogListItem key={dog.id} dog={dog} />
                        )
                    })}
                </ul>
                <Button onClick={this.handleAddDog} variant="contained" color="primary">
                <AddIcon />
        <Icon>add</Icon>
                </Button>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogList);