import React from 'react';

class BuildSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      radius: 5
    };
  }

  componentDidMount() {
    /* global $ */

    $('input.location').autocomplete({
      source: (search, result) => {
        const suggestionReqest = new Request('/api/locations/suggestions/', {
          method: 'POST',
          body: JSON.stringify({ search: search.term }),
          headers: { 'Content-Type': 'application/json' }
        });

        fetch(suggestionReqest)
          .then((res) => res.json())
          .then((res) => result(res))
          .catch((err) => console.log(err));
      },
      delay: 100,
      select: (event, ui) => {
        this.getLocationData(ui.item.value)
          .then((loc) => this.props.updateCenter(loc));

        ui.item.value = ui.item.label;
      }
    });
  }

  getLocationData(id) {
    const detailReq = new Request('/api/locations/details/', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    });

    return fetch(detailReq)
      .then((res) => res.json());
  }

  locationChange() {
    this.setState({ location: this.refs.location.value });
  }

  radiusTo() {
    this.setState({ radius: this.refs.radius.value });
    this.props.updateRadius(this.refs.radius.value);
  }

  render() {
    return (
      <form className="card-panel build-search">
        <input
          type="text"
          list="location-list"
          ref="location"
          className="autocomplete location"
          onChange={this.locationChange.bind(this)}
          placeholder="enter location name or coordinates"/>
        <div className="row">
          <p className="radius col s2 center">radius: {this.state.radius} mi</p>
          <p className="range-field col s10">
            <input
              ref="radius"
              onChange={this.radiusTo.bind(this)}
              type="range"
              defaultValue="5"
              max="25"
              step="0.1"/>
          </p>
        </div>
        <a className="waves-effect waves-light btn right">search</a>
      </form>
    );
  }
}

BuildSearch.propTypes = {
  updateSearch: React.PropTypes.func,
  updateCenter: React.PropTypes.func,
  updateRadius: React.PropTypes.func
};

export default BuildSearch;
