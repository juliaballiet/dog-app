import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import ManageActivitiesListItem from './ManageActivitiesListItem/ManageActivitiesListItem';

const mapStateToProps = state => ({
  user: state.user,
  activitiesList: state.lists.activities
});

class ManageActivitiesList extends Component {
  componentDidMount() {
      this.getActivitiesList();
  }

  getActivitiesList = () => {
      console.log('in getActivitiesList');
      Axios({
          method: 'GET',
          url: '/list/activities'
      }).then((response) => {
          console.log('back from /list/activities with: ', response.data);
          let action = {
              type: 'ACTIVITIES_LIST',
              payload: response.data
          }
          this.props.dispatch(action);
      }).catch((error) => {
          console.log('getActivitiesList error: ', error);
          alert('getActivitiesList error');
      })
  }

  render() {
    return (
      <div>
        <h1>List of Activities</h1>
        <div>
            {this.props.activitiesList.map((activity) => {
                return(
                    <ManageActivitiesListItem key={activity.id} activity={activity} getActivitiesList={this.getActivitiesList} />
                )
            })}
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageActivitiesList);