import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

// import ManageFoodListItem from './ManageFoodListItem/ManageFoodListItem';

const mapStateToProps = state => ({
  user: state.user,
});

class ManageFoodList extends Component {
  componentDidMount() {
      this.getFoodList();
  }

  getFoodList = () => {
      console.log('in getFoodList');
      Axios({
          method: 'GET',
          url: '/list/food'
      }).then((response) => {
          console.log('back from /list/food with: ', response.data);
      }).catch((error) => {
          console.log('getFoodList error: ', error);
          alert('getFoodList error');
      })
  }

  render() {
    return (
      <div>
        <h1>List of foods</h1>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ManageFoodList);