import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FeedingLogEntry from './FeedingLogEntry/FeedingLogEntry';
import moment from 'moment';

const mapStateToProps = state => ({
    user: state.user,
    feedingLog: state.feedingLog
});

class FeedingLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
        }
    }

    componentDidMount = () => {
        // this.getFeedingLog();
        this.getFeedingDates();
    }

    // getFeedingLog = () => {
    //     console.log('in getFeedingLog');
    //     Axios({
    //         method: 'GET',
    //         url: '/log/feeding/' + this.props.id
    //     }).then((response) => {
    //         console.log('back from getFeedingLog with: ', response.data);
    //         let action = {
    //             type: 'FEEDING_LOG',
    //             payload: response.data
    //         }
    //         this.props.dispatch(action);
    //     }).catch((error) => {
    //         console.log('getFeedingLog error: ', error);
    //         alert('getFeedingLog error');
    //       })
    // }

    getFeedingDates = () => {
        Axios({
            method: 'GET',
            url: '/log/feeding-dates/' + this.props.id
        }).then((response) => {
            console.log('back from getFeedingDates with: ', response.data);
            this.setState({
                dates: response.data
            })
        }).catch((error) => {
            console.log('getFeedingDates error: ', error);
            alert('getFeedingDates error');
        })
    }

    render() {
        return (
            <div>
                {this.state.dates.map((date, i) => {
                    return (
                        <ExpansionPanel key={i}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                {moment(date.date).format('ddd MMM Do YY')}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FeedingLogEntry id={this.props.id} date={date} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FeedingLog);