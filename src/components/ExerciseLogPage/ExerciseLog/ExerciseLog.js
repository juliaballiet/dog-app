import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  exerciseLog: state.exerciseLog
});

class ExerciseLog extends Component {
    componentDidMount = () => {
        this.getExerciseLog();
    }

    getExerciseLog = () => {
        console.log('in getExerciseLog');
        Axios({
            method: 'GET',
            url: '/log/exercise/' + this.props.id
        }).then((response) => {
            console.log('back from getExerciseLog with: ', response.data);
            let action = {
                type: 'EXERCISE_LOG',
                payload: response.data
            }
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('getExerciseLog error: ', error);
            alert('getExerciseLog error');
          })
    }

  render() {
    return (
      <div>
        <ul>
            {this.props.exerciseLog.map((entry, i) => {
                return(
                    <li key={i}>
                        <div>
                            <h4>{entry.activity}</h4>
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
export default connect(mapStateToProps)(ExerciseLog);