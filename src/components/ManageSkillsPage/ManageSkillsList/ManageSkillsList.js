import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import ManageSkillsListItem from './ManageSkillsListItem/ManageSkillsListItem';

const mapStateToProps = state => ({
  user: state.user,
  skillsList: state.lists.skills
});

class ManageSkillsList extends Component {
  componentDidMount() {
      this.getSkillsList();
  }

  getSkillsList = () => {
      console.log('in getSkillsList');
      Axios({
          method: 'GET',
          url: '/list/skills'
      }).then((response) => {
          console.log('back from /list/skills with: ', response.data);
          let action = {
              type: 'SKILLS_LIST',
              payload: response.data
          }
          this.props.dispatch(action);
      }).catch((error) => {
          console.log('getSkillsList error: ', error);
          alert('getSkillsList error');
      })
  }

  render() {
    return (
      <div>
        <h1>List of Skills</h1>
        <ul>
            {this.props.skillsList.map((skill) => {
                return(
                    <ManageSkillsListItem key={skill.id} skill={skill} getSkillsList={this.getSkillsList} />
                )
            })}
        </ul>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageSkillsList);
