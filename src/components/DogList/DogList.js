import React, { Component } from 'react';
import { connect } from 'react-redux';
import DogListItem from './DogListItem/DogListItem';
import Axios from 'axios';


// import Nav from '../Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';

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

    render() {
        return (
            <div>
                <ul>
                    {this.props.dogs.map((dog) => {
                        return(
                            <DogListItem key={dog.id} dog={dog} />
                        )
                    })}
                </ul>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogList);