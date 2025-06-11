import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import SeriesTextEditor from "components/SeriesTextEditor";
import { withRouter } from "react-router-dom";

class EditorSeriesContainer extends Component {
  getDetailSeries = async (id) => {
    const { PostActions } = this.props;
    console.log(id);
    try {
      await PostActions.getDetailSeries(id);
    } catch (e) {
      console.log("error log :" + e);
    }
  };

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.getDetailSeries(id);
    }
  }

  writeSeries = async (id, title, description, hashtag) => {
    const { PostActions, history } = this.props;
    console.log("description: ", description);
    try {
      await PostActions.writeSeries(id, title, description, hashtag);
      history.push(`/series`);
    } catch (e) {
      console.log("error log :" + e);
    }
  };

  render() {
    const { loading, error, seriesDetail } = this.props;
    if (loading) {
      return null;
    }
    return (
      <Fragment>
        {error && <h1>Server Error!</h1>}
        {
          <SeriesTextEditor
            series={seriesDetail}
            writeSeries={this.writeSeries}
          />
        }
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    seriesDetail: state.post.get("seriesDetail"),
    loading: state.pender.pending["seires/GET_DETAIL_SERIES"],
    error: state.pender.failure["seires/GET_DETAIL_SERIES"],
    success: state.pender.success["seires/GET_DETAIL_SERIES"],
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch),
  })
)(withRouter(EditorSeriesContainer));
