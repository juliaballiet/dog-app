import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    activities: state.lists.activities
});

class ActivityDropdown extends Component {
    componentDidMount = () => {
        this.getActivities();
    }

    getActivities = () => {
        console.log('in getActivities');
        Axios({
            method: 'GET',
            url: '/list/activities'
        }).then((response) => {
            console.log('back from server with: ', response.data);
            let action = {
                type: 'ACTIVITIES_LIST',
                payload: response.data
            }
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('getActivities error: ', error);
            alert('getActivities error');
        })
    }

    handleActivityChange = (event) => {
        let action = {
            type: 'NEW_EXERCISE_ACTIVITY',
            payload: event.target.value
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <select onChange={this.handleActivityChange}>
                <option default>select activity</option>
                {this.props.activities.map((activity) => {
                    return(
                        <option key={activity.id} value={activity.id}>{activity.activity}</option>
                    )
                })}
            </select>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ActivityDropdown);