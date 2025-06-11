import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import SeriesDetail from "components/SeriesDetail";

class SeriesDetailContainer extends Component {

  getDetailSeries = async (id) => {
    const { PostActions } = this.props;
    try {
      await PostActions.getDetailSeries(id);
    } catch (e) {
      console.log("error log :" + e);
    }
  }

  componentDidMount() {
    const { id } = this.props;
    this.getDetailSeries(id);
  }

  render() {
    const { posts, seriesDetail, loading, error, success, isAuthenticated, currentUser } = this.props;
    if (loading){
        return null;
    }
    console.log(error, success)
    return (
      <Fragment>        
        {error && <h1>Server Error!</h1>}
        {!error && success &&
          <SeriesDetail posts={posts}
            seriesDetail={seriesDetail}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            />}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    posts: state.post.get("posts"),
    seriesDetail: state.post.get("seriesDetail"),
    loading: state.pender.pending["seires/GET_DETAIL_SERIES"],
    error: state.pender.failure["seires/GET_DETAIL_SERIES"],
    success: state.pender.success["seires/GET_DETAIL_SERIES"],
    isAuthenticated: state.auth.get("isAuthenticated"),
    currentUser: state.auth.get("currentUser")
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(SeriesDetailContainer);
