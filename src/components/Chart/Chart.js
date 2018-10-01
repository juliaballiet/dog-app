import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
});

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        }
    }

    label = (tooltipItem, data) => {
        Axios({
            method: 'GET',
            url: `/log/${this.props.word}/${this.props.id}/${this.props.info[tooltipItem.index].date}`
        }).then((response) => {
            console.log(`/log/${this.props.word}/${this.props.id}/${this.props.info[tooltipItem.index].date} :`, response.data)
            this.setState({
                array: response.data,
            });
        }).catch((error) => {
            console.log('error:', error);
        })
        let list = `${this.props.word}: `;
        for (let item of this.state.array) {
            list = list.concat(item.name + ', ');
        }
        console.log(list);
        return list;
    }

    afterLabel = (tooltipItem, data) => {
        return `notes: ${this.props.info[tooltipItem.index].notes}`
    }

    beforeLabel = (tooltipItem, data) => {
        return `duration: ${tooltipItem.yLabel} min`
    }

    render() {
        console.log(this.props);

        const chartOptions = {
            tooltips: {
                callbacks: {
                    beforeLabel: this.beforeLabel,
                    label: this.label,
                    afterLabel: this.afterLabel
                }
            }
        }

        return (
            <div>
                <Line
                    data={this.props.data}
                    options={chartOptions}
                    height={1400}
                    width={1200}
                />
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Chart);