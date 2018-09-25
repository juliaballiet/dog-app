import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// import Nav from '../Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

class DogListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: `/dog-profile/${this.props.dog.id}`,
            image: `/images/${this.props.dog.id}.jpg`,
        }
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        return (
            <Link to={this.state.url}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            image="/images/shoko.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {this.props.dog.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
            // <div>
            //     <li>
            //         <div>
            //             <h2><Link to={this.state.url}>
            //             {this.props.dog.name}
            //             </Link></h2>
            //         </div>
            //     </li>
            // </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DogListItem);