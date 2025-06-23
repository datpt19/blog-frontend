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
    seriesPostTitle: "",
    selectedSeriesId: "",
  };

  constructor(props) {
    super(props);
    let editorState;
    let seriesList = [];
    if (props.seriesList) {
      seriesList = props.seriesList;
    }
    let textTitle = "";
    let seriesPostTitle = "";
    let selectedSeriesId = "";
    if (props.post) {
      textTitle = props.post.get("title");
      seriesPostTitle = props.post.get("seriesPostTitle");
      const contentBlock = htmlToDraft(props.post.get("body"));
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }
    if (seriesPostTitle && seriesList.length > 0) {
      const matched = seriesList.find((s) => s.title === seriesPostTitle);
      if (matched) {
        selectedSeriesId = matched.id;
      }
    }
    this.state = {
      editorState,
      textTitle: textTitle,
      seriesList: seriesList,
      seriesPostTitle: seriesPostTitle,
      selectedSeriesId: selectedSeriesId,
    };
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
  uploadImageCallBack = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // return fetch("https://your-server.com/api/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // data.url là URL server trả về
    //     return { data: { link: data.url } };
    //   });
    return "https://i1-vnexpress.vnecdn.net/2025/06/12/OPEN-PC-1749726315-8703-1749726413.png?w=0&h=0&q=100&dpr=1&fit=crop&s=EdGUC04-LVwjGwm67Ai2TQ";
  };

  render() {
    const { editorState, seriesPostTitle, seriesList } = this.state;
    console.log("seriesPostTitle, ", seriesPostTitle);
    return (
      <div className={cx("text-editor")}>
        <div className="my-3">
          <label htmlFor="topic-select" className="font-weight-bold">
            Series:
          </label>
          <select
            id="topic-select"
            className="form-control mt-1"
            value={this.state.selectedSeriesId || ""}
            onChange={this.onSeriesChange}
          >
            <option value="">-- Select Series --</option>
            {seriesList.map((series) => (
              <option key={series.id} value={series.id}>
                {series.title}
              </option>
            ))}
          </select>
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
          toolbar={{
            image: {
              uploadCallback: this.uploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: false },
            },
          }}
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
