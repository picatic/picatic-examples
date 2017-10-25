import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
<<<<<<< HEAD
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
=======
import '/Users/thomasmirmotahari/picatic-local/repos/picatic-examples/create-event/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
>>>>>>> 2a291cda783dfe17400a42197c689ed2678f339a
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import './Description.css'

export default class Description extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  componentWillMount() {
    const { description } = this.props.event.attributes

    if (description === null) {
      return false
    }

    const contentBlock = htmlToDraft(description)

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      this.setState({ editorState })
    }
  }

  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://api.imgur.com/3/image')
      xhr.setRequestHeader('Authorization', 'Client-ID a3cf70c762f9c96')
      const data = new FormData()
      data.append('image', file)
      xhr.send(data)
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText)
        resolve(response)
      })
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText)
        reject(error)
      })
    })
  }

  onEditorStateChange = editorState => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.props.handleDescriptionChange(html)
    this.setState({ editorState })
  }

  render() {
    return (
      <section className="col">
        <label className="mb-1 lead">Description</label>
        <p className="mb-2 text-muted">
          This will appear on your event website.
        </p>
        <Editor
          editorState={this.state.editorState}
          onEditorStateChange={this.onEditorStateChange}
          editorClassName="editor-wrapper"
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'fontFamily',
              'colorPicker',
              'list',
              'textAlign',
              'link',
              'emoji',
              'image',
              'history'
            ],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            colorPicker: {
              colors: [
                '#000000',
                '#212121',
                '#424242',
                '#616161',
                '#757575',
                '#9E9E9E',
                '#BDBDBD',
                '#E0E0E0',
                '#EEEEEE',
                '#F5F5F5',
                '#FAFAFA',
                '#FFFFFF',
                '#FF4632',
                '#EC4067',
                '#9C27B0',
                '#673AB7',
                '#3F51B5',
                '#2196F3',
                '#0EDCFA',
                '#34CB7B',
                '#0CC41B',
                '#CDDC39',
                '#FBC02D',
                '#FFB70C',
                '#FF9505',
                '#FF5722'
              ]
            },
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
        />
      </section>
    )
  }
}

// toolbar={{
//       inline: {
//         bold: { icon: Icons.bold, className: 'demo-option-custom' },
//         italic: { icon: Icons.italic, className: 'demo-option-custom' },
//         underline: { icon: Icons.underline, className: 'demo-option-custom' },
//         strikethrough: { icon: Icons.strikethrough, className: 'demo-option-custom' },
//         monospace: { className: 'demo-option-custom' },
//         superscript: { icon: Icons.superscript, className: 'demo-option-custom' },
//         subscript: { icon: Icons.subscript, className: 'demo-option-custom' },
//       },
//       blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
//       fontSize: { className: 'demo-option-custom-medium' },
//       list: {
//         unordered: { icon: Icons.unordered, className: 'demo-option-custom' },
//         ordered: { icon: Icons.ordered, className: 'demo-option-custom' },
//         indent: { icon: Icons.indent, className: 'demo-option-custom' },
//         outdent: { icon: Icons.outdent, className: 'demo-option-custom' },
//       },
//       textAlign: {
//         left: { icon: Icons.left, className: 'demo-option-custom' },
//         center: { icon: Icons.center, className: 'demo-option-custom' },
//         right: { icon: Icons.right, className: 'demo-option-custom' },
//         justify: { icon: Icons.justify, className: 'demo-option-custom' },
//       },
//       fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
//       colorPicker: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
//       link: {
//         popupClassName: 'demo-popup-custom
//         link: { icon: Icons.link, className: 'demo-option-custom' },
//         unlink: { icon: Icons.unlink, className: 'demo-option-custom' },
//       },
//       emoji: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
//       embedded: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
//       image: { icon: Icons.image, className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
//       remove: { icon: Icons.eraser, className: 'demo-option-custom' },
//       history: {
//         undo: { icon: Icons.undo, className: 'demo-option-custom' },
//         redo: { icon: Icons.redo, className: 'demo-option-custom' },
//       },
//     }}
//   />
