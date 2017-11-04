import React, { Component } from 'react';
// REACT-DRAFT-WYSIWYG ============
//import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// MEDIUM-DRAFT ===================
import { Editor, createEditorState } from 'medium-draft';
import 'medium-draft/lib/index.css';
//import mediumDraftExporter from 'medium-draft/lib/exporter';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

// class RawHTMLInput extends Component {
//   constructor(props){
//     super(props);
//     this.handleChange = this.handleOnChange.bind(this);
//   }
//   handleOnChange(rawHTML){
//     this.props.rawOnChange(rawHTML);
//   }
//
//   render(){
//     return (
//       <FormGroup>
//         <ControlLabel>{this.props.label || "Raw HTML"}</ControlLabel>
//         <FormControl type="textarea" onChange={() => this.handleOnChange()} { ...this.props } />
//       </FormGroup>
//     );
//   }
// }

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
    this.htmlOnChange = this.htmlOnChange.bind(this);
  }

  componentDidMount(){
    if (this.state.rawHTML){
      const blocksFromHtml = htmlToDraft(this.state.rawHTML);
      console.log(blocksFromHtml);
      // const { contentBlocks, entityMap } = blocksFromHtml.contentBlock;
      // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      // //const editorState = EditorState.createWithContent(contentState);
      // this.setState({
      //   editorState: EditorState.createWithContent(contentState)
      // })
    }
  }

  onChange(editorState){
    this.setState({
      editorState,
      rawHTML: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      //rawHTML: mediumDraftExporter(editorState.getCurrentContent())
    });
  }

  htmlOnChange(rawHTML){
    // this.setState({
    //   editorState: createEditorState(convertToRaw(mediumDraftExporter(rawHTML)))
    // })
  }

  render(){
    const { editorState, rawHTML } = this.state;
    return (
      <div>
        <Editor
          ref="editor"
          editorState={editorState}
          onChange={this.onChange}
        />
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl value={rawHTML} />

        {/* <RawHTMLInput label={this.props.rawLabel} value={rawHTML}
            onChange={this.props.rawOnChange} /> */}
      </div>

    )
  }
}

//const RichTextEditor = RichTextEditor01;
export default RichTextEditor;
