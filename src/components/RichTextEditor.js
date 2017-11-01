import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class RichTextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onEditorStateChange = (editorState) => this.setState({editorState});
  }
  render(){
    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    return (
      <div className="container">
        <h1>Rich text editor</h1>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        <FormGroup>
          <ControlLabel>Raw html code</ControlLabel>
          <FormControl type="textarea" value={draftToHtml(rawContent)}  />
        </FormGroup>
      </div>
    )
  }
}

export default RichTextEditor;
