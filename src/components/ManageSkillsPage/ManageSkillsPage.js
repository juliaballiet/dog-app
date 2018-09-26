import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Header from '../Header/Header';
import ManageSkillsList from './ManageSkillsList/ManageSkillsList';

const mapStateToProps = state => ({
  user: state.user,
});

class ManageSkillsPage extends Component {
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    return (
      <div>
        <Header />
        <ManageSkillsList />
        <Link to='/add-skill'><Button variant="extendedFab" color="primary">Add Skill</Button></Link>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageSkillsPage);