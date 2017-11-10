import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

export default class VenueField extends Component {
  state = {
    address: '',
    street: ''
  }

  componentWillMount() {
    const { venue_name, venue_street } = this.props.event.attributes

    const nullName = venue_name === null
    const nullStreet = venue_street === null

    this.setState({
      address: nullName ? '' : venue_name,
      street: nullStreet ? '' : venue_street
    })
  }

  handleChange = address => {
    this.props.handleEventName('venue_name', address)
    this.setState({ address })
  }

  handleSelect = address => {
    geocodeByAddress(address).then(response =>
      this.setState({ street: response[0].formatted_address }, () =>
        this.props.handleEventName('venue_street', this.state.street)
      )
    )
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.handleChange
    }

    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }

    return (
      <section className="row">
        <div className="col-12">
          <h4>Where is your event?</h4>
        </div>
        <div className="col-md-6">
          <label>Venue Name</label>
          <PlacesAutocomplete
            classNames={cssClasses}
            inputProps={inputProps}
            onSelect={this.handleSelect}
          />
        </div>
        <div className="col-md-6">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={this.state.street}
            onChange={ev => this.setState({ street: ev.target.value })}
          />
        </div>
      </section>
    )
  }
}
