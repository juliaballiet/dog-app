import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 300,
    },
    media: {
        height: 300,
        width: 300
    },
};

function MediaCard(props) {
    const { classes } = props;
    const url = `/dog-profile/${props.dog.id}`;
    return (
        <Link to={url}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.dog.photo_path}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {props.dog.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);