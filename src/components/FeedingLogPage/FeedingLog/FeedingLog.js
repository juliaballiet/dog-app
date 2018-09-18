import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  feedingLog: state.feedingLog
});

class FeedingLog extends Component {
    componentDidMount = () => {
        this.getFeedingLog();
    }

    getFeedingLog = () => {
        console.log('in getFeedingLog');
        Axios({
            method: 'GET',
            url: '/log/feeding/' + this.props.id
        }).then((response) => {
            console.log('back from getFeedingLog with: ', response.data);
            let action = {
                type: 'FEEDING_LOG',
                payload: response.data
            }
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('getFeedingLog error: ', error);
            alert('getFeedingLog error');
          })
    }

  render() {
    return (
      <div>
        <ul>
            {this.props.feedingLog.map((entry) => {
                return(
                    <li key={entry.id}>
                        <div>
                            <h4>{entry.brand} {entry.variety}</h4>
                            at {entry.time} on {entry.date}
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
export default connect(mapStateToProps)(FeedingLog);