import React, { Component } from 'react'
import ReactFilestack from 'filestack-react'
import uuidv4 from 'uuid/v4'

export default class ImgUpload extends Component {
  onSuccess = result => {
    console.log('Result', result)
  }
  onError = error => {
    console.log('Error', error)
  }
  render() {
    const { event, apiKey } = this.props

    const imageName = uuidv4()
    const path = `/event/${event.id}/${imageName}`

    const options = {
      accept: 'image/*',
      maxFiles: 1,
      storeTo: {
        location: 's3',
        path: path,
        access: 'public'
      }
    }
    return (
      <ReactFilestack
        buttonText="Upload Image"
        buttonClass="className"
        apikey={apiKey}
        options={options}
        onSuccess={this.onSuccess}
        onError={this.onError}
      />
    )
  }
}
