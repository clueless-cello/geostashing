import React from 'react';
import Moment from 'moment';
import Map from './Map.jsx';

const ProductDetails = (props) => (
  <div className="product-details">
    <div className="row">
      <i
        onClick={props.onClose}
        className="material-icons back-arrow">arrow_back</i>
      <p className="title">{props.info.name}</p>
    </div>
    <div className="main-image-wrapper row">
      <img className="main-image" src={props.info.images[0].url} />
    </div>
    <div className="row">
      {props.info.description}<br/>
      by {props.info.seller.name}
      <span title={props.info.createdAt}>
        {Moment().from(props.info.createdAt)} ago
      </span>
    </div>
    <div className="row price">${props.info.price}</div>
    <div className="row">
      <Map
        lng={parseFloat(props.info.location.lng)}
        lat={parseFloat(props.info.location.lat)}
        zoom={12}
        pins={[{
          lng: parseFloat(props.info.location.lng),
          lat: parseFloat(props.info.location.lat)
        }]}/>
      <span>
        (≈{props.info.location.lng}, {props.info.location.lat})
      </span>
      <div className="row purchase-wrapper">
        <a
          onClick={props.onPurchase.bind(null, props.info)}
          className="waves-effect waves-light btn">
          purchase
          <i className="material-icons left">add_shopping_cart</i>
        </a>
      </div>
    </div>
    <div className="row">{console.log(props.info)}</div>
  </div>
);

ProductDetails.propTypes = {
  info: React.PropTypes.object,
  onClose: React.PropTypes.func,
  onPurchase: React.PropTypes.func
};

export default ProductDetails;
