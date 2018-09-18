import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import Nav from '../Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

class DogListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: `/dog-profile/${this.props.dog.id}`
        }
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        return (
            <div>
                <li>
                    <div>
                        <h2><Link to={this.state.url}>
                        {this.props.dog.name}
                        </Link></h2>
                        <p>{this.props.dog.breed}</p>
                        <p>{this.props.dog.weight} lbs</p>
                        <p>DOB: {this.props.dog.birthday}</p>
                    </div>
                </li>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogListItem);