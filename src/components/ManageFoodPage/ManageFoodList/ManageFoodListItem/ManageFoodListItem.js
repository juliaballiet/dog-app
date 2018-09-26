import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const mapStateToProps = state => ({
    user: state.user,
});

class ManageFoodListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            edittedFood: {
                brand: this.props.food.brand,
                variety: this.props.food.variety,
                type: this.props.food.type,
                amount: this.props.food.amount,
                id: this.props.food.id
            }
        }
    }

    handleToggleEdit = (event) => {
        console.log('in handleEditToggle');
        this.setState({
            edit: !this.state.edit
        })
    }

    handleInputChange = (event) => {
        console.log('handleInputChange');
        this.setState({
            edittedFood: {
                ...this.state.edittedFood,
                [event.target.name]: event.target.value
            }
        })
    }

    handleFoodEdit = () => {
        console.log('in handleFoodEdit: ', this.state.edittedFood);
        Axios({
            method: 'PUT',
            url: '/list/food',
            data: this.state.edittedFood
        }).then((response) => {
            console.log('back from /list/food PUT with: ', response.data);
            this.handleToggleEdit();
            this.props.getFoodList();
        }).catch((error) => {
            console.log('handleFoodEdit error: ', error);
            alert('handleFoodEdit error');
        })
    }

    render() {
        let content = null;

        if (this.state.edit) {
            content = (
                <div>
                    <h4><TextField name="brand" label="brand" onChange={this.handleInputChange} value={this.state.edittedFood.brand} />
                        <TextField name="variety" label="variety" onChange={this.handleInputChange} value={this.state.edittedFood.variety} /></h4>
                    <p><TextField name="type" label="type" onChange={this.handleInputChange} value={this.state.edittedFood.type} />
                        <Input name="amount" onChange={this.handleInputChange} value={this.state.edittedFood.amount} endAdornment={<InputAdornment position="end">cups</InputAdornment>} /></p>
                    <Button onClick={this.handleFoodEdit} variant="contained" color="primary">confirm edit</Button>
                    <br /><Button
                    value={this.props.food.id}
                    onClick={this.handleToggleEdit}
                    variant="contained"
                    color="primary">cancel</Button>
                </div>
            );
        } else {
            content = (
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{this.props.food.brand} {this.props.food.variety}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {this.props.food.type} -- {this.props.food.amount} cups
                            <br /><Button
                    value={this.props.food.id}
                    onClick={this.handleToggleEdit}
                    variant="contained"
                    color="primary">edit</Button>
          </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            );
        }

        return (
            <div>
                {content}
            </div>

        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageFoodListItem);