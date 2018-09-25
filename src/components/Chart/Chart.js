import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

const mapStateToProps = state => ({
    user: state.user,
    exerciseLog: state.exerciseLog
});

class Chart extends Component {

    render() {
        return (
            <div>
                <Line
                    data={this.props.data}
                    height={1400}
                    width={1200}
                />
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Chart);