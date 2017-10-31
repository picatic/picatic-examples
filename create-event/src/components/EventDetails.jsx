// @flow

import React, { Component } from 'react'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

class EventDetails extends Component {
  componentWillMount() {
    const { attributes } = this.props.event
    this.setState({ attributes })
  }
  handleChange = ev => {
    ev.preventDefault()
    const { attributes } = this.state
    const { name, value } = ev.target
    attributes[name] = value
    this.setState({ attributes })
  }
  render() {
    const { attributes } = this.state
    const { fetchCreateEvent } = this.props
    return (
      <div className="container mt-4">
        <section className="row justify-content-md-center mt-5">
          <div className="col-md-6">
            <TextField
              type="text"
              pattern=".{3,}"
              placeholder="Event Title"
              name="title"
              value={attributes.title}
              onChange={this.handleChange}
              fullWidth
            />
            <div className="text-right mt-3">
              <Button
                type="button"
                raised
                color="primary"
                onClick={() => fetchCreateEvent(attributes)}
              >
                Continue
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default EventDetails
