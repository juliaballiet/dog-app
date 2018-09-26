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
    activities: state.lists.activities
});

class ActivityDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: '',
        }
    }

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
        this.setState({
            selected: event.target.value
        })
        let action = {
            type: 'NEW_EXERCISE_ACTIVITY',
            payload: event.target.value
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <FormControl>
                <InputLabel htmlFor="select-activity">Select Activity</InputLabel>
                <Select
                    onChange={this.handleActivityChange}
                    className="input"
                    value={this.state.selected}
                    inputProps={{
                        name: 'select-activity',
                        id: 'select-activity'
                    }}
                >
                    {this.props.activities.map((activity) => {
                        return (
                            <MenuItem key={activity.id} value={activity.id}>{activity.activity}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ActivityDropdown);