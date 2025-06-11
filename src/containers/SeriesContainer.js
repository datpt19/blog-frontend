import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import SeriesPostList from "components/SeriesPostList";

class SeriesContainer extends Component {
  getSeriesPostList = async (page, size) => {
    const { PostActions } = this.props;
    try {
      await PostActions.getSeriesPostList(page, size);     
    } catch (e) {
      console.log("error log :" + e);
    }
  }

  componentDidMount() {    
    this.getSeriesPostList(0, 10);
  }

  render() {
    const { seriesList, loading, error, success, isAuthenticated } = this.props;
    return (
      <Fragment>
        { loading && "Loading..." }
        { error && <h1>Server Error!</h1> }
        { success && <SeriesPostList seriesPost={seriesList} isAuthenticated={isAuthenticated} /> }
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    seriesList: state.post.get("seriesList"),
    loading: state.pender.pending["series/GET_SERIRES_POST_LIST"],
    error: state.pender.failure["series/GET_SERIRES_POST_LIST"],
    success: state.pender.success["series/GET_SERIRES_POST_LIST"],
    isAuthenticated: state.auth.get("isAuthenticated")
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(SeriesContainer);
