import React from 'react';
import Product from './Product.jsx';
import Map from './Map.jsx';

class Catalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filter: null
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
          lat={37.7837678}
          lng={-122.40914660000001} />
        <input
          onChange={() => this.updateFilter(this.refs.search.value)}
          ref="search"
          type="text"
          name="search"
          placeholder="search"/>
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

Catalog.propTypes = { showProduct: React.PropTypes.func };

export default Catalog;
