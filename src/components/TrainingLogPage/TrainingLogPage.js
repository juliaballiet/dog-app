import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../Chart/Chart';
import Axios from 'axios';
import moment from 'moment';

const mapStateToProps = state => ({
  user: state.user,
  trainingLog: state.trainingLog
});

class TrainingLogPage extends Component {
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
      this.setData();
    }).catch((error) => {
      console.log('getTrainingLog error: ', error);
      alert('getTrainingLog error');
    })
  }

  setData = () => {
    console.log('setData');
    let dataLabels = [];
    let dataset = [];
    for (let entry of this.props.trainingLog) {
      dataLabels.push(moment(entry.date).format('ddd MMM D'));
      dataset.push(entry.duration);
    }
    this.setState({
      data: {
        labels: dataLabels,
        datasets: [{
          label: "duration",
          backgroundColor: 'rgb(158, 204, 255)',
          borderColor: 'rgb(84, 166, 255)',
          data: dataset,
        }]
      }
    });
  }


  render() {
    return (
      <div>
        <h1>Training Log</h1>
        <Chart data={this.state.data} />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TrainingLogPage);