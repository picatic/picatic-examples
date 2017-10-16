import React, { Component } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '/Users/thomasmirmotahari/picatic-local/repos/picatic-examples/create-event/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

export default class Description extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  componentWillMount() {
    const { description } = this.props.event.attributes
    const contentBlock = htmlToDraft(description)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      this.setState({ editorState })
    }
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
        />
      </section>
    )
  }
}
