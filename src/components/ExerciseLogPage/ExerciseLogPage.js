import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ExerciseLog from './ExerciseLog/ExerciseLog';
import Chart from '../Chart/Chart';
import Axios from 'axios';
import moment from 'moment';

const mapStateToProps = state => ({
  user: state.user,
  exerciseLog: state.exerciseLog
});

class ExerciseLogPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [],
        datasets: [],
      },
    }
  }

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
      this.setData();
    }).catch((error) => {
      console.log('getExerciseLog error: ', error);
      alert('getExerciseLog error');
    })
  }

  setData = () => {
    console.log('setData');
    let dataLabels = [];
    let dataset = [];
    for (let entry of this.props.exerciseLog) {
      dataLabels.push(moment(entry.date).format('ddd MMM D'));
      dataset.push(entry.duration);
    }
    this.setState({
      data: {
        labels: dataLabels,
        datasets: [{
          pointRadius: 5,
          pointHoverRadius: 5,
          pointHitRadius: 10,
          label: "duration",
          backgroundColor: 'rgb(255, 155, 177)',
          borderColor: 'rgb(255, 99, 132)',
          data: dataset,
        }]
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Exercise Log</h1>
        {/* <ExerciseLog id={this.props.id} /> */}
        <Chart data={this.state.data} id={this.props.id} />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ExerciseLogPage);