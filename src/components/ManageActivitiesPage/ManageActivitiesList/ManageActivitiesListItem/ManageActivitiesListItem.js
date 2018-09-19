import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
});

class ManageActivitiesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            edittedActivity: {
                activity: this.props.activity.activity,
                description: this.props.activity.description,
                id: this.props.activity.id
            }
        }
    }

    handleToggleEdit = (event) => {
        console.log('in handleEditToggle');
        this.setState({
            edit: !this.state.edit
        })
    }

    handleInputChange = (event) => {
        console.log('handleInputChange');
        this.setState({
            edittedActivity: {
                ...this.state.edittedActivity,
                [event.target.name]: event.target.value
            }
        })
    }

    handleActivityEdit = () => {
        console.log('in handleActivityEdit: ', this.state.edittedActivity);
        Axios({
            method: 'PUT',
            url: '/list/activities',
            data: this.state.edittedActivity
        }).then((response) => {
            console.log('back from /list/activities PUT with: ', response.data);
            this.handleToggleEdit();
            this.props.getActivitiesList();
        }).catch((error) => {
            console.log('handleActivityEdit error: ', error);
            alert('handleActivityEdit error');
        })
    }

    render() {
        let content = null;
        let buttonText = '';

        if (this.state.edit) {
            content = (
                <div>
                    <h4><input name="activity" onChange={this.handleInputChange} value={this.state.edittedActivity.activity} /></h4>
                    <p><input name="description" onChange={this.handleInputChange} value={this.state.edittedActivity.description} /></p>
                    <button onClick={this.handleActivityEdit}>confirm edit</button>
                </div>
            );
            buttonText = 'cancel'
        } else {
            content = (
                <div>
                    <h4>{this.props.activity.activity}</h4>
                    <p>{this.props.activity.description}</p>
                </div>
            );
            buttonText = 'edit'
        }

        return (
            <li>
                {content}
                <br /> <button value={this.props.activity.id} onClick={this.handleToggleEdit}>{buttonText}</button>
            </li>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageActivitiesListItem);