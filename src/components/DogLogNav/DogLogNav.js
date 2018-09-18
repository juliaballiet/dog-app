import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DogLogNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedingUrl: `/feeding-log/${this.props.id}`,
            exerciseUrl: `/exercise-log/${this.props.id}`,
            trainingUrl: `/training-log/${this.props.id}`
        }
    }

    render() {
        return (
            <div className="navbar">
                <div>
                    <ul>
                        <li>
                            <Link to={this.state.feedingUrl}>
                                Feeding Log
              </Link>
                        </li>
                        <li>
                            <Link to={this.state.exerciseUrl}>
                                Exercise Log
              </Link>
                        </li>
                        <li>
                            <Link to={this.state.trainingUrl}>
                                Training Log
              </Link>
                        </li>
                        <li>
                            <Link to="/dash">
                                Home
              </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    
}

export default DogLogNav;
