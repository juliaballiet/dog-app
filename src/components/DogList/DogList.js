import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Card from '../Card/Card';

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
                            <div>
                                <Card key={dog.id} dog={dog} />
                            </div>
                        )
                    })}
                </ul>
                <Button onClick={this.handleAddDog} variant="extendedFab" color="primary">
                    <AddIcon />
                    new dog
                </Button>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogList);