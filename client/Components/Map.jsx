import React from 'react';

//the map component basically wraps around the google maps api
//it can take a list of pins (in format specified by api) and display them
//through the google maps api.

//`props.pins` represents a simple json format for specifying pins while
//`this.data.pins` contains the markers created by google maps api

//lifecycle:
//instantiation:
//  pass down props and create an instance variable `data`
//  holding data related to google maps api.
//  -> triggers render
//render:
//  adds the div which will hold the map puts reference to map div in
//  refs.gmap
//  -> triggers componentDidMount
//componentDidMount:
//  now that a DOM element is available google maps can attach
//  to this element and render a map. data.map should now be equal to a
//  google maps object.

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPin: null,
      pins: props.pins
    };

    this.data = {
      //holds `state.pins` as google maps object
      pins: [],

      //holds `state.currentPin` as google maps object
      currentPin: null,

      //holds the google maps map object
      map: null
    };
  }

  componentDidMount() {
    /* global google */
    //should be defined at this point

    const pos = {
      lat: this.props.lat,
      lng: this.props.lng
    };

    this.data.map = new google.maps.Map(this.refs.gmap, {
      center: pos,
      zoom: this.props.zoom
    });

    this.data.map.addListener('click', (ev) => {
      this.props.selectCoords(ev.latLng.lng(), ev.latLng.lat());
      this.setState({
        currentPin: {
          lat: ev.latLng.lat(),
          lng: ev.latLng.lng(),
          id: -1,
          creating: true
        }
      });
    });

    this.drawPins(this.state.pins);
  }

  drawPins(pins) {
    //first remove all pins
    this.data.pins.forEach((pin) => pin.setMap(null));

    //next add all pins
    this.data.pins = pins.map((pin) => ({
      lat: parseFloat(pin.lat),
      lng: parseFloat(pin.lng),
      name: pin.name
    })).map((pin) =>
      new google.maps.Marker({
        map: this.data.map,
        position: pin,
        title: pin.name
      })
    );

    this.data.pins.forEach((pin, index) =>
      pin.addListener(
        'click',
        this.showLocationDetails.bind(this, pin, pins[index])));
  }

  showLocationDetails(marker, pin) {
    this.setState({ currentPin: pin });
  }

  updateCurrentPin(state) {
    if (state.currentPin && state.currentPin.creating) {
      if (this.data.currentPin) {
        this.data.currentPin.setPosition(state.currentPin);
      } else {
        this.data.currentPin = new google.maps.Marker({
          map: this.data.map,
          position: state.currentPin,
          title: 'current location',
          label: '+'
        });
      }
    } else if (this.data.currentPin) {
      this.data.currentPin.setMap(null);
      this.data.currentPin = null;
    }
  }

  checkPins(newProps, newState) {
    if (newState.pins !== this.state.pins) {
      console.log('redrawing all pins from state');
      this.drawPins(newState.pins);
    } else if (newProps.pins !== this.props.pins) {
      console.log('redrawing all pins from props');
      this.drawPins(newProps.pins);
      this.setState({ pins: newProps.pins });
    }
  }

  componentWillUpdate(newProps, newState) {
    this.checkPins(newProps, newState);

    if (newProps.lat !== this.props.lat || newProps.lng !== this.props.lng) {
      this.data.map.panTo({ lat: newProps.lat, lng: newProps.lng });
    }

    if (newProps.zoom !== this.props.zoom) {
      this.data.map.setZoom(Math.floor(parseFloat(newProps.zoom)));
    }

    if (newState.currentPin !== this.state.currentPin) {
      console.log('changing current pin');
      this.updateCurrentPin(newState);
    }
  }

  pinAdded(pin) {
    console.log('pin added', pin);
    this.setState({
      currentPin: null,
      pins: this.state.pins.concat([pin])
    });
  }

  render() {
    return (<div className="map" ref="gmap"></div>);
  }
}

Map.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number,
  pins: React.PropTypes.array,
  selectCoords: React.PropTypes.func
};

Map.defaultProps = {
  lat: 0,
  lng: 0,
  zoom: 8,
  pins: []
};

export default Map;
