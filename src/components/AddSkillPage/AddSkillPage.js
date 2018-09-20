import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

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
    event.preventDefault();
    console.log('in handleSubmitNewSkill with: ', this.state.newSkill);
    Axios({
      method: 'POST',
      url: '/list/skills',
      data: this.state.newSkill
    }).then((response) => {
      console.log('back from /list/skills POST with: ', response.data);
      alert('New Skill added!');
      this.props.history.push('/manage-skills');
    }).catch((error) => {
      console.log('handleSubmitNewSkill error: ', error);
      alert('handleSubmitNewSkill error');
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitNewSkill}>
          <p>Skill name: <input name="name" onChange={this.handleInputChange} /></p>
          <p>Description: <input name="description" onChange={this.handleInputChange} /></p>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddSkillPage);