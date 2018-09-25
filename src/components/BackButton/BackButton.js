import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

function BackButton(props) {
    return (
        <Link to={props.url}>
            <Icon>chevron_left</Icon>
        </Link>
    );
}


export default BackButton;