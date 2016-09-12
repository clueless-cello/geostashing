import React from 'react';
import Dropzone from 'react-dropzone';
import Map from './Map.jsx';

//for the most part this is really just a form which sends a post request on
//submit
//images are handled a bit differently. When an image is chosen it will
//immediately begin uploading to the server which returns an id. This id can
//then be to the post request
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }

  render() {
    return (
      <form method="POST" action="/api/locations" className="new-product row">
        <div className="row">
          <i
            onClick={this.props.onClose}
            className="material-icons back-arrow">arrow_back</i>
          <p className="title">Create a new stash</p>
        </div>
        <div className="row">
          <Map
            selectCoords={this.selectCoords.bind(this)}
            lat={37.7837678}
            lng={-122.40914660000001} />
        </div>

        <div className="row">
          <input
            ref="name"
            type="text"
            placeholder="item name"/>
        </div>

        <div className="row">
          <textarea
            className="materialize-textarea"
            ref="description"
            placeholder="description"></textarea>
        </div>

        <div className="row">
          <input
            ref="price"
            type="text"
            placeholder="price"/>
        </div>

        <div className="row">
          <input
            className="col s6"
            ref="lng"
            type="text"
            readOnly="true"
            value={this.state.lng}
            placeholder="longitude" />
          <input
            className="col s6"
            ref="lat"
            type="text"
            readOnly="true"
            value={this.state.lat}
            placeholder="latitude" />
          <div className="info">click map to set location</div>
        </div>

        <Dropzone
          style={{}}
          className="dropzone card-panel"
          accept="image/*"
          onDrop={this.onFile.bind(this)}>

          {
            this.state.images.length === 0
              ? <div className="info">drop images here or click to upload.</div>
              : ''
          }
          {
            this.state.images.map((image, index) =>
                <img key={index} src={image.url} />)
          }
        </Dropzone>

        <button
            onClick={this.submit.bind(this)}
            className="btn waves-effect waves-light"
            type="submit"
            name="action">
          Submit<i className="material-icons right">send</i>
        </button>
      </form>
    );
  }

  onFile(files) {
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => this.sendFile({
        name: file.name,
        data: event.target.result
      });
      reader.readAsDataURL(file);
    });
  }

  sendFile(file) {
    const postFiles = new Request('/api/images', {
      method: 'POST',
      body: file.data
    });

    fetch(postFiles)
      .then((res) => res.json())
      .then((res) =>
        this.setState({ images: this.state.images.concat([res]) }));
  }

  selectCoords(lng, lat) {
    this.setState({
      lng,
      lat
    });
  }

  submit(event) {
    const data = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      price: this.refs.price.value,
      images: this.state.images.map((image) => image.id),
      location: {
        lat: this.refs.lat.value,
        lng: this.refs.lng.value
      }
    };

    console.log('submitting:', data);

    const prodRequest = new Request('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    fetch(prodRequest)
      .then((res) => res.json())
      .then((res) => console.log(res));

    event.preventDefault();
  }
}

AddProduct.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  onClose: React.PropTypes.func
};

export default AddProduct;
