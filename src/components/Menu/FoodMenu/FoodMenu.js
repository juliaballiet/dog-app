import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

class FoodMenu extends React.Component {
    state = {
        anchorEl: null,
    };

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
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Food
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    style={{marginLeft: '7.5em'}}
                >
                    <MenuItem>
                        <Link className="link" to="/manage-food">
                            Manage Food
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link className="link" to="/new-feeding">
                            New Feeding
                        </Link>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default FoodMenu;