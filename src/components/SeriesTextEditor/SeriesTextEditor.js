import React, { Component } from "react";

import styles from "./SeriesTextEditor.scss";
import classNames from "classnames/bind";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
const cx = classNames.bind(styles);

class SeriesTextEditor extends Component {
  state = {
    textTitle: "",
    description: "",
  };

  constructor(props) {
    super(props);
    let seriesId = "";
    let description = "";
    let textTitle = "";
    let hashtag = "";
    if (props.series) {
      seriesId = props.series.get("id");
      textTitle = props.series.get("title");
      description = props.series.get("description");
      hashtag = props.series.get("hashtag");
    }
    this.state = {
      seriesId: seriesId,
      textTitle: textTitle,
      description: description,
      hashtag: hashtag,
    };
  }

  onSubmit = () => {
    const { seriesId, textTitle, description, hashtag } = this.state;
    const { writeSeries } = this.props;
    writeSeries(seriesId, textTitle, description, hashtag);
  };

  changeTitle = (e) => {
    this.setState({ textTitle: e.target.value });
  };

  changeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  changeHashtag = (e) => {
    this.setState({ hashtag: e.target.value });
  };

  render() {
    return (
      <div className={cx("text-editor")}>
        <Input
          value={this.state.textTitle}
          onChange={this.changeTitle}
          placeholder="Enter Series Name here"
        />
        <Input
          value={this.state.description}
          onChange={this.changeDescription}
          placeholder="Enter Description"
        />

        <Input
          value={this.state.hashtag}
          onChange={this.changeHashtag}
          placeholder="Enter Hashtag"
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
            to={"/series"}
          >
            cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default SeriesTextEditor;

/*
preview code
<textarea
  disabled
  className="demo-content"
  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
/> */
