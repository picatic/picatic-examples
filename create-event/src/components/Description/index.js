import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

export default class Description extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  handleChange = editorState => {
    this.setState({ editorState })
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.handleChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  render() {
    return (
      <section className="col">
        <label className="mb-1 lead">Description</label>
        <p className="mb-2 text-muted">
          This will appear on your event website.
        </p>
        <div className="form-control">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.handleChange}
            spellCheck={true}
          />
        </div>
      </section>
    )
  }
}
