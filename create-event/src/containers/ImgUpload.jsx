import React, { Component } from 'react'
import ReactFilestack from 'filestack-react'
import uuidv4 from 'uuid/v4'

export default class ImgUpload extends Component {

  onSuccess = result => {
    const url = result.filesUploaded[0].url
    this.props.handleEventName('cover_image_uri', url)
  }

  onError = error => {
    console.log('Error', error)
  }

  render() {
    const { image, event, apiKey } = this.props

    const hasImage = image !== ''

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

    const styles = {
      image: {
        background: `url(${image}) no-repeat center`,
        backgroundSize: 'cover',
        width: 300,
        height: 200,
        boxShadow: '0 4px 30px 0 rgba(0, 0, 0, .24)',
        borderRadius: 5,
        margin: 'auto'
      }
    }
    const text = hasImage ? '' : 'Upload Image'
    return (
      <div style={hasImage ? styles.image : {}}>
        <ReactFilestack
          buttonText={text}
          buttonClass={`mdl-button mdl-js-button mdl-js-ripple-effect ${hasImage
            ? 'image-button'
            : ''}`}
          apikey={apiKey}
          options={options}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
      </div>
    )
  }
}
