import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';

const mapStateToProps = state => ({
  user: state.user,
});

class FeedingLogEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
        }
    }

    componentDidMount = () => {
        this.getEntries();
    }

    getEntries = () => {
        Axios({
            method: 'GET',
            url: `/log/feeding-entry?id=${this.props.id}&date=${this.props.date.date}`
        }).then((response) => {
            console.log('back with: ', response.data);
            this.setState({
                entries: response.data,
            });
        }).catch((error) => {
            console.log('getEntries error: ', error);
            alert('getEntries error');
        })
    }

  render() {
    return (
      <ul>
        {this.state.entries.map((entry, i) => {
            return(
                <li key={i}>{entry.amount} cups of {entry.brand} {entry.variety} at {moment(entry.time, 'h:mm:ss').format('h:mm a')}</li>
            )
        })}
      </ul>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FeedingLogEntry);