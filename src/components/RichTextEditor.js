import React, { Component } from 'react';
// REACT-DRAFT-WYSIWYG ============
//import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// MEDIUM-DRAFT ===================
import { Editor, createEditorState } from 'medium-draft';
import 'medium-draft/lib/index.css';

import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const RawHTML = (rawContent) => {
  return (
    <FormGroup>
       <ControlLabel>Raw html code</ControlLabel>
       <FormControl type="textarea" value={draftToHtml(convertToRaw(rawContent))}  />
    </FormGroup>

  );
}

// class RichTextEditor extends Component {
//   constructor(props){
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};
//     this.onEditorStateChange = (editorState) => this.setState({editorState});
//   }
//   render(){
//     const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
//     return (
//       <div className="container">
//         <h1>Rich text editor</h1>
//         <Editor
//           editorState={this.state.editorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="wrapperClassName"
//           editorClassName="editorClassName"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <FormGroup>
//           <ControlLabel>Raw html code</ControlLabel>
//           <FormControl type="textarea" value={draftToHtml(rawContent)}  />
//         </FormGroup>
//       </div>
//     )
//   }
// }

class RichTextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {editorState: createEditorState()}
    this.onChange = (editorState) => {
      this.setState({editorState});
    }
  }

  render(){
    const { editorState } = this.state;
    return (
      <div className="container">
        <h1>Rich text editor</h1>
        <Editor
          ref="editor"
          editorState={editorState}
          onChange={this.onChange} />

        {RawHTML(editorState.getCurrentContent())}

      </div>
    )
  }
}

//const RichTextEditor = RichTextEditor01;
//export { RichTextEditor01 };
export default RichTextEditor;
