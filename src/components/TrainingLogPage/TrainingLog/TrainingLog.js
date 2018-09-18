import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  trainingLog: state.trainingLog
});

class TrainingLog extends Component {
    componentDidMount = () => {
        this.getTrainingLog();
    }

    getTrainingLog = () => {
        console.log('in getTrainingLog');
        Axios({
            method: 'GET',
            url: '/log/training/' + this.props.id
        }).then((response) => {
            console.log('back from getTrainingLog with: ', response.data);
            let action = {
                type: 'TRAINING_LOG',
                payload: response.data
            }
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('getTrainingLog error: ', error);
            alert('getTrainingLog error');
          })
    }

  render() {
    return (
      <div>
        <ul>
            {this.props.trainingLog.map((entry, i) => {
                return(
                    <li key={i}>
                        <div>
                            <h4>{entry.name}</h4>
                            for {entry.duration} minutes on {entry.date}
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
export default connect(mapStateToProps)(TrainingLog);