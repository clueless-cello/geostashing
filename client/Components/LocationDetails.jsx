import React from 'react';

const LocationDetails = (props) => (
  <div>{props.name}: {props.lng}, {props.lat}</div>
);

LocationDetails.propTypes = {
  name: React.PropTypes.string,
  lat: React.PropTypes.string,
  lng: React.PropTypes.string
};

export default LocationDetails;
