import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FoodMenu from './FoodMenu/FoodMenu';
import ExerciseMenu from './ExerciseMenu/ExerciseMenu';
import TrainingMenu from './TrainingMenu/TrainingMenu';
import { triggerLogout } from '../../redux/actions/loginActions';
import { connect } from 'react-redux';

class MainMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <IconButton
                    aria-label="More"
                    // aria-owns={open ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem>
                        <Link className="link" to="/dash">
                            Home
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <FoodMenu />
                    </MenuItem>
                    <MenuItem>
                        <ExerciseMenu />
                    </MenuItem>
                    <MenuItem>
                        <TrainingMenu />
                    </MenuItem>
                    <MenuItem onClick={this.logout}>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default connect()(MainMenu);