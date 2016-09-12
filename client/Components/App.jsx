import React from 'react';
import Map from './Map.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pins: [] };

    const getPins = new Request('/api/locations');

    fetch(getPins)
      .then((res) => res.json())
      .then((res) => this.setState({ pins: res }));
  }

  render() {
    return (
      <div>
        <h1>Hi there, beard person.</h1>
        <Map
          lat={37.7837678}
          lng={-122.40914660000001}
          pins={this.state.pins}/>
      </div>
    );
  }
}

export default App;
