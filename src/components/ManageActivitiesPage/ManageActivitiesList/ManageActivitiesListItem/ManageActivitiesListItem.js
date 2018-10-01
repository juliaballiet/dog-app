import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const mapStateToProps = state => ({
    user: state.user,
});

class ManageActivitiesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            edittedActivity: {
                name: this.props.activity.name,
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
        // let buttonText = '';

        if (this.state.edit) {
            content = (
                <div>
                    <h4><TextField name="name" label="name" onChange={this.handleInputChange} value={this.state.edittedActivity.name} />
                    <TextField name="description" label="description" onChange={this.handleInputChange} value={this.state.edittedActivity.description} /></h4>
                    <Button onClick={this.handleActivityEdit} variant="contained" color="primary">confirm edit</Button>
                    <br /><br /><Button
                    value={this.props.activity.id}
                    onClick={this.handleToggleEdit}
                    variant="contained"
                    color="primary">cancel</Button>
                </div>
            );
        } else {
            content = (
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{this.props.activity.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {this.props.activity.description}
                            <br /><br /><Button
                    value={this.props.activity.id}
                    onClick={this.handleToggleEdit}
                    variant="contained"
                    color="primary">edit</Button>
          </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageActivitiesListItem);