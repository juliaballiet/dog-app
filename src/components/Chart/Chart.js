import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    exerciseLog: state.exerciseLog
});

class Chart extends Component {
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


    // componentDidMount() {
    //     this.setData();
    // }

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
            dataLabels.push(entry.date);
            dataset.push(entry.duration);
        }
        this.setState({
            data: {
                labels: dataLabels,
                datasets: [{
                    label: "duration",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: dataset,
                }]
            }
        });
    }

    render() {
        return (
            <div>
                <Line data={this.state.data} />
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Chart);