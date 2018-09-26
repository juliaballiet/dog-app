import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Datepicker extends Component {
    render(){
        return (
            <form noValidate>
              <TextField
                id="date"
                label={this.props.label}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          );
    }
}

export default withStyles(styles)(Datepicker);