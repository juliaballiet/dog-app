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

class ManageSkillsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            edittedSkill: {
                name: this.props.skill.name,
                description: this.props.skill.description,
                id: this.props.skill.id
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
            edittedSkill: {
                ...this.state.edittedSkill,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSkillEdit = () => {
        console.log('in handleSkillEdit: ', this.state.edittedSkill);
        Axios({
            method: 'PUT',
            url: '/list/skills',
            data: this.state.edittedSkill
        }).then((response) => {
            console.log('back from /list/skills PUT with: ', response.data);
            this.handleToggleEdit();
            this.props.getSkillsList();
        }).catch((error) => {
            console.log('handleSkillEdit error: ', error);
            alert('handleSkillEdit error');
        })
    }

    render() {
        let content = null;

        if (this.state.edit) {
            content = (
                <div>
                    <h4><TextField name="name" label="name" onChange={this.handleInputChange} value={this.state.edittedSkill.name} />
                    <TextField name="description" label="description" onChange={this.handleInputChange} value={this.state.edittedSkill.description} /></h4>
                    <Button onClick={this.handleSkillEdit} variant="contained" color="primary">confirm edit</Button>
                    <br /><Button
                    value={this.props.skill.id}
                    onClick={this.handleToggleEdit}
                    variant="contained"
                    color="primary">cancel</Button>
                </div>
            );
        } else {
            content = (
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{this.props.skill.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {this.props.skill.description}
                            <br /><br /><Button
                    value={this.props.skill.id}
                    onClick={this.handleToggleEdit}
                    variant="contained"
                    color="primary">edit</Button>
          </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            );
        }

        // if (this.state.edit) {
        //     content = (
        //         <div>
        //             <h4><input name="name" onChange={this.handleInputChange} value={this.state.edittedSkill.name} /></h4>
        //             <p><input name="description" onChange={this.handleInputChange} value={this.state.edittedSkill.description} /></p>
        //             <button onClick={this.handleSkillEdit}>confirm edit</button>
        //         </div>
        //     );
        //     buttonText = 'cancel'
        // } else {
        //     content = (
        //         <div>
        //             <h4>{this.props.skill.name}</h4>
        //             <p>{this.props.skill.description}</p>
        //         </div>
        //     );
        //     buttonText = 'edit'
        // }

        return (
            <div>
                {content}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageSkillsListItem);