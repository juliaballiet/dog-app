import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Header from '../Header/Header';
import { TextField } from '@material-ui/core';
import SubmitAlert from '../SubmitAlert/SubmitAlert';

const mapStateToProps = state => ({
  user: state.user,
});

class AddSkillPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSkill: {
        name: '',
        description: '',
      }
    }
  }

  handleInputChange = (event) => {
    console.log('handleInputChange');
    this.setState({
      newSkill: {
        ...this.state.newSkill,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmitNewSkill = (event) => {
    console.log('in handleSubmitNewSkill with: ', this.state.newSkill);
    Axios({
      method: 'POST',
      url: '/list/skills',
      data: this.state.newSkill
    }).then((response) => {
      console.log('back from /list/skills POST with: ', response.data);
      this.props.history.push('/manage-skills');
    }).catch((error) => {
      console.log('handleSubmitNewSkill error: ', error);
      alert('handleSubmitNewSkill error');
    })
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmitNewSkill}>
          <p><TextField label="skill" name="name" onChange={this.handleInputChange} /></p>
          <p><TextField label="description" name="description" onChange={this.handleInputChange} /></p>
          <SubmitAlert words="skill added!"
           newEntry={this.handleSubmitNewSkill}
           buttonText="Add Skill"
           address="/manage-skills"
           history={this.props.history} />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddSkillPage);