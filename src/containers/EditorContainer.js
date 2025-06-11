import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import TextEditor from "components/TextEditor";
import { withRouter } from "react-router-dom";

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesList: [],
      isSeriesLoaded: false,
    };
  }

  getPost = async (id) => {
    const { PostActions } = this.props;
    try {
      await PostActions.getPost(id);
    } catch (e) {
      console.log("error log :" + e);
    }
  };

  getSeries = async () => {
    const { PostActions } = this.props;
    try {
      const response = await PostActions.getSeriesPostList(0, 100);
      this.setState({ seriesList: response.data, isSeriesLoaded: true });
    } catch (e) {
      console.log("error log :" + e);
    }
  };

  writePost = async (id, title, body, seriesPostId) => {
    const { PostActions, history } = this.props;
    console.log("selectedSeriesId: ", seriesPostId);
    try {
      if (id) {
        await PostActions.editPost(id, title, body, seriesPostId);
      } else {
        await PostActions.writePost(title, body, seriesPostId);
      }

      history.push(`/posts/${this.props.postId}`);
    } catch (e) {
      console.log("error log :" + e);
    }
  };

  componentDidMount() {
    const { id } = this.props;
    this.getSeries();
    if (id) {
      this.getPost(id);
    }
  }

  render() {
    const { post, loading, error, id } = this.props;
    const { seriesList, isSeriesLoaded } = this.state;
    if (loading || !isSeriesLoaded) return null;
    return (
      <Fragment>
        {error && <h1>Server Error!</h1>}
        {
          <TextEditor
            post={id ? post : ""}
            writePost={this.writePost}
            seriesList={seriesList}
          />
        }
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    post: state.post.get("post"),
    postId: state.post.get("postId"),
    loading: state.pender.pending["post/GET_POST"],
    error: state.pender.failure["post/GET_POST"],
    success: state.pender.success["post/GET_POST"],
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch),
  })
)(withRouter(EditorContainer));
