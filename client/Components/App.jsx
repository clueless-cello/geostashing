import React from 'react';
import Catalog from './Catalog.jsx';
import AddProduct from './AddProduct.jsx';
import Navbar from './Navbar.jsx';
import ProductDetails from './ProductDetails.jsx';
import BuildSearch from './BuildSearch.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'find',
      radius: 5,
      center: null,
      searchStage: 'location',
      pins: [],
      products: []
    };

    const getPins = new Request('/api/locations');

    fetch(getPins)
      .then((res) => res.json())
      .then((res) => this.setState({ pins: res }));
  }

  addProduct(ev) {
    ev.preventDefault();
    this.setState({
      page: this.state.page === 'create'
        ? 'find'
        : 'create'
    });
  }

  findProduct(ev) {
    ev.preventDefault();
    console.log('finding...');
    this.setState({ page: 'find' });
  }

  showProduct(prod) {

    console.log('showing product with id ', prod);
    this.setState({
      page: 'show',
      currentProduct: prod
    });
  }

  purchase(item) {
    console.log('purchasing', item);
  }

  updateCenter(location) {
    this.setState({
      center: location,
      searchStage: 'results'
    });
  }

  updateRadius(distance) {
    this.setState({ radius: distance });
  }

  render() {
    return (
      <div>
        <Navbar
          gotoCreate={this.addProduct.bind(this)}
          gotoFind={this.findProduct.bind(this)}
          page={this.state.page}/>
        <BuildSearch
          updateCenter={this.updateCenter.bind(this)}
          updateRadius={this.updateRadius.bind(this)}/>
        {
          this.state.searchStage === 'results'
          ? <Catalog
              showProduct={this.showProduct.bind(this)}
              center={this.state.center}/>
          : ''
        }
        {
          this.state.page === 'create'
          ? <div className="sidebar z-depth-1">
              <AddProduct onClose={this.addProduct.bind(this)}/>
            </div>
          : null
        }
        {
          this.state.page === 'show'
          ? <div className="sidebar z-depth-1">
              <ProductDetails
                onClose={this.findProduct.bind(this)}
                info={this.state.currentProduct}
                onPurchase={this.purchase.bind(this)}/>
            </div>
          : null
        }
      </div>
    );
  }
}

export default App;
