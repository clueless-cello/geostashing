import React from 'react';
import Product from './Product.jsx';
import Map from './Map.jsx';

class Catalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filter: null,
      center: null,
      show: false,
      radius: 5
    };

    const getProducts = new Request('/api/products');

    fetch(getProducts)
      .then((res) => res.json())
      .then((res) => this.setState({ products: res }));
  }

  updateFilter(str) {
    let filter = null;
    let regexErr = false;

    if (str.length > 0) {
      try {
        filter = new RegExp(str, 'gi');
      } catch (err) {
        regexErr = true;
      }
    }

    this.setState({ filter, regexErr });
  }

  filterProduct(product) {
    if (!this.state.filter) {
      return true;
    }

    return (
        product.name
        + product.description
        + product.seller.name
        + product.location.name
      ).match(this.state.filter);
  }

  render() {

    return (
      <div className="catalog">
        <Map
          pins={this.state.products.map((product) => product.location)}
          lat={this.props.center.lat}
          lng={this.props.center.lng}
          zoom={12}/>
        <input
          className="row"
          onChange={this.updateFilter.bind(this)}
          ref="search"
          type="text"
          name="search"
          placeholder="search terms"/>
        <ul className="products collection">
          {
            this.state.products
              .filter(this.filterProduct.bind(this))
              .map((product, index) =>
                <Product
                  key={index}
                  info={product}
                  show={this.props.showProduct}/>)
          }
        </ul>
      </div>
    );
  }
}

Catalog.propTypes = {
  showProduct: React.PropTypes.func,
  center: React.PropTypes.object
};

export default Catalog;
