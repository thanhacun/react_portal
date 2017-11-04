import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// REACT-DRAFT-WYSIWYG ============
//import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// MEDIUM-DRAFT ===================
import { Editor, createEditorState } from 'medium-draft';
import 'medium-draft/lib/index.css';

import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class RawHTMLInput extends Component {
  render(){
    return (
      <FormGroup>
        <ControlLabel>{this.props.label || "Raw HTML"}</ControlLabel>
        <FormControl type="textarea" { ...this.props } />
      </FormGroup>

    );
  }
}

// class RichTextEditor extends Component {
//   constructor(props){
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};
//     this.onEditorStateChange = (editorState) => this.setState({editorState});
//   }
//   render(){
//     const { editorState } = this.state;
//     return (
//       <div className="container">
//         <h1>Rich text editor</h1>
//         <Editor
//           editorState={editorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="wrapperClassName"
//           editorClassName="editorClassName"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         {RawHTML(editorState.getCurrentContent())}
//       </div>
//     )
//   }
// }

class RichTextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {editorState: createEditorState(), rawHTML: ''};
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState){
    this.setState({
      editorState,
      rawHTML: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  }

  render(){
    const { editorState, rawHTML } = this.state;
    return (
      <div>
        <Editor
          ref="editor"
          editorState={editorState}
          onChange={this.onChange} />
          <RawHTMLInput label={this.props.rawLabel} value={rawHTML}
            onChange={this.props.rawOnChange} readOnly/>

      </div>

    )
  }
}

//const RichTextEditor = RichTextEditor01;
//export { RawHTML };
export default RichTextEditor;
