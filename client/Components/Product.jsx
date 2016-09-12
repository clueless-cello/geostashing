import React from 'react';
import Moment from 'moment';

const Product = (props) => (
  <li
    onClick={props.show.bind(null, props.info)}
    className="collection-item avatar product">
    <img
      src={
        props.info.images[0]
        ? props.info.images[0].url
        : '/default-image.svg'}
      className="responsive-img circle" alt=""/>
    <span className="title">{props.info.name}</span>
    <p>
      <span className="price">${props.info.price}</span><br/>
      by {props.info.seller.name}
      <span title={props.info.createdAt}>
        &nbsp;{Moment().from(props.info.createdAt)} ago
      </span>
      <br/>
      {props.info.description}
    </p>
    <a href="#!" className="secondary-content">
      <i className="material-icons">location_on</i>
      12mi
    </a>
  </li>
);

Product.propTypes = {
  info: React.PropTypes.object,
  show: React.PropTypes.func
};

export default Product;
