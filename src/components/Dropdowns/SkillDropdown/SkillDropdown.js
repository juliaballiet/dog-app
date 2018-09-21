import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    skills: state.lists.skills
});

class SkillDropdown extends Component {
    componentDidMount = () => {
        this.getSkills();
    }

    getSkills = () => {
        console.log('in getSkills');
        Axios({
            method: 'GET',
            url: '/list/skills'
        }).then((response) => {
            console.log('back from server with: ', response.data);
            let action = {
                type: 'SKILLS_LIST',
                payload: response.data
            }
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('getSkills error: ', error);
            alert('getSkills error');
        })
    }

    handleSkillChange = (event) => {
        let action = {
            type: 'NEW_TRAINING_SKILL',
            payload: event.target.value
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <select onChange={this.handleSkillChange}>
                <option default>select skill</option>
                {this.props.skills.map((skill) => {
                    return(
                        <option key={skill.id} value={skill.id}>{skill.name}</option>
                    )
                })}
            </select>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SkillDropdown);