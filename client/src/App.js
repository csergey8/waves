import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  componentDidMount() {
    axios.get('/api/product/woods')
      .then(res => console.log(res));
      axios.get('/a')
      .then(res => console.log(res));
  }
  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

export default App;
