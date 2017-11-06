import React, { Component } from 'react';
// REACT-DRAFT-WYSIWYG ============
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// MEDIUM-DRAFT ===================
//import { Editor, createEditorState } from 'medium-draft';
//import 'medium-draft/lib/index.css';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { ControlLabel, FormControl, FormGroup, Button } from 'react-bootstrap';

class RichTextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.updateHTML2Editor = this.updateHTML2Editor.bind(this);
  }

  componentWillUpdate(){
    if (this.props.syncHTMLtoEditor){
      this.updateHTML2Editor()
    }
  }

  updateHTML2Editor(){
    const rawHTML = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    const contentBlock = htmlToDraft(this.props.value);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState});
    }
  }

  onEditorStateChange(editorState){
    const rawHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.updateRawHTML(rawHTML);
    this.setState({editorState});
  }

  render(){
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl value={this.props.value} readOnly/>
      </div>
    )
  }
}

// class RichTextEditor extends Component {
//   constructor(props){
//     super(props);
//     this.state = {editorState: createEditorState(), rawHTML: ''};
//     this.onChange = this.onChange.bind(this);
//   }
//
//   onChange(editorState){
//     this.setState({
//       editorState,
//       rawHTML: draftToHtml(convertToRaw(editorState.getCurrentContent()))
//       //rawHTML: mediumDraftExporter(editorState.getCurrentContent())
//     });
//   }
//
//   render(){
//     const { editorState, rawHTML } = this.state;
//     return (
//       <div>
//         <Editor
//           ref="editor"
//           editorState={editorState}
//           onChange={this.onChange}
//         />
//         <ControlLabel>{this.props.label}</ControlLabel>
//         <FormControl value={rawHTML} />
//       </div>
//
//     )
//   }
// }

export default RichTextEditor;
