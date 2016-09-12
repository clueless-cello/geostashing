import React from 'react';

class AddLocation extends React.Component {
  render() {
    return (
      <form method="POST" action="/api/locations">
        <input
          ref="name"
          name="name"
          type="text"
          placeholder="place name"/>
        <input
          ref="lng"
          name="lng"
          type="text"
          readOnly="true"
          value={this.props.lng}
          placeholder="longitude"/>
        <input
          ref="lat"
          name="lat"
          type="text"
          readOnly="true"
          value={this.props.lat}
          placeholder="latitude"/>
        <input
          name="submit"
          type="submit"
          onClick={this.submitLocation.bind(this)}/>
      </form>
    );
  }

  submitLocation(ev) {
    const newPin = {
      name: this.refs.name.value,
      lng: this.refs.lng.value,
      lat: this.refs.lat.value
    };

    const pinReq = new Request('/api/locations', {
      method: 'POST',
      body: JSON.stringify(newPin),
      headers: { 'content-type': 'application/json' }
    });

    fetch(pinReq)
      .then((res) => res.text())
      .then(() => this.props.pinAdded(newPin));

    ev.preventDefault();
  }
}

AddLocation.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  pinAdded: React.PropTypes.func
};

AddLocation.defaultProps = {
  lat: 0,
  lng: 0,
  pinAdded: console.log
};

export default AddLocation;
