import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DogLogNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedingUrl: `/feeding-log/${this.props.id}`,
            activityUrl: `/activity-log/${this.props.id}`,
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
                            <Link to={this.state.activityUrl}>
                                Activity Log
              </Link>
                        </li>
                        <li>
                            <Link to={this.state.trainingUrl}>
                                Training Log
              </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    
}

export default DogLogNav;
