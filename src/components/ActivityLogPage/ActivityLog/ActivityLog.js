import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  activityLog: state.activityLog
});

class ActivityLog extends Component {
    componentDidMount = () => {
        this.getActivityLog();
    }

    getActivityLog = () => {
        console.log('in getActivityLog');
        Axios({
            method: 'GET',
            url: '/log/activity/' + this.props.id
        }).then((response) => {
            console.log('back from getActivityLog with: ', response.data);
            let action = {
                type: 'ACTIVITY_LOG',
                payload: response.data
            }
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('getActivityLog error: ', error);
            alert('getActivityLog error');
          })
    }

  render() {
    return (
      <div>
        <ul>
            {this.props.activityLog.map((entry) => {
                return(
                    <li key={entry.id}>
                        <div>
                            <h4>{entry.activity} {entry.variety}</h4>
                            at {entry.time} on {entry.date}
                            <p>Notes: {entry.notes}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ActivityLog);