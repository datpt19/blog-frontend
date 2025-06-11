import React, { Component } from "react";

import styles from "./TextEditor.scss";
import classNames from "classnames/bind";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Link } from "react-router-dom";
import htmlToDraft from "html-to-draftjs";
import { Button, Input } from "reactstrap";
const cx = classNames.bind(styles);

class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    textTitle: "",
    seriesList: [],
  };

  constructor(props) {
    super(props);
    let editorState;
    let seriesList = [];
    if (props.seriesList) {
      seriesList = props.seriesList;
    }
    let textTitle = "";
    if (props.post) {
      textTitle = props.post.get("title");
      const contentBlock = htmlToDraft(props.post.get("body"));
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }
    this.state = { editorState, textTitle: textTitle, seriesList: seriesList };
  }

  onSubmit = () => {
    const { editorState, textTitle } = this.state;
    const { post, writePost } = this.props;
    let id;
    if (post && post.get("id")) {
      id = post.get("id");
    }
    const title = textTitle;
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    writePost(id, title, body, this.state.selectedSeriesId);
  };

  changeTitle = (e) => {
    this.setState({ textTitle: e.target.value });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  onSeriesChange = (e) => {
    const selectedSeriesId = e.target.value;
    this.setState({ selectedSeriesId });
    console.log("Selected ID:", selectedSeriesId);
  };
  render() {
    const { editorState, selectedSeriesId, seriesList } = this.state;
    return (
      <div className={cx("text-editor")}>
        <div className="my-3">
          <label htmlFor="topic-select" className="font-weight-bold">
            Series:
          </label>
          <select
            id="topic-select"
            className="form-control mt-1"
            value={selectedSeriesId}
            onChange={this.onSeriesChange}
          >
            <option value="">-- Select Series --</option>
            {seriesList.map((series, idx) => (
              <option key={idx} value={series.id}>
                {series.title}
              </option>
            ))}
          </select>
          {/* {selectedTopic && (
            <p className="mt-2">
              Đã chọn: <strong>{selectedTopic}</strong>
            </p>
          )} */}
        </div>
        <Input
          value={this.state.textTitle}
          onChange={this.changeTitle}
          placeholder="Enter title here"
        />
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />

        <div className={cx("editor-button")}>
          <Button
            color="info"
            className={cx("pull-left")}
            onClick={this.onSubmit}
          >
            save
          </Button>
          <Button
            color="danger"
            className={cx("pull-right")}
            tag={Link}
            to={"/"}
          >
            cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default TextEditor;

/*
preview code
<textarea
  disabled
  className="demo-content"
  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
/> */
