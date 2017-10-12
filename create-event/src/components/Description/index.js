import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

import TextField from 'material-ui/TextField'

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
      <div>
        Description
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
