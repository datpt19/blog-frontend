import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {
  PostPage,
  PostListPage,
  EditorPage,
  NotFoundPage,
  SeriesListPage,
  SeriesDetailPage,
  EditorSeriesPage,
} from "pages";
import LoginContainer from "containers/LoginContainer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "store/modules/auth";
import OAuth2RedirectHandler from "components/Login/oauth2/OAuth2RedirectHandler";

class App extends Component {
  componentDidMount() {
    const { AuthActions } = this.props;
    AuthActions.getUser();
  }

  render() {
    return (
      <div>
        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
        <Route path="/login" component={LoginContainer} />
        <Switch>
          <Route path="/pages/:page" component={PostListPage} />
          <Route path="/posts/:id" component={PostPage} />
          <Route path="/editor/:id?" component={EditorPage} />
          <Route path="/editorseries/:id?" component={EditorSeriesPage} />
          <Route exact path="/series" component={SeriesListPage} />
          <Route path="/series/:id" component={SeriesDetailPage} />
          <Route path="/es/:id" component={SeriesListPage} />
          <Route path="/" component={PostListPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(App);
