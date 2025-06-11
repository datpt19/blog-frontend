import React, { Fragment } from "react";

import styles from "./SeriesPostList.scss";
import classNames from "classnames/bind";
import SeriesPostListPreview from "components/SeriesPostList/SeriesPostListPreview";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const cx = classNames.bind(styles);

const SeriesPostList = ({ isAuthenticated, seriesPost }) => {
  if (seriesPost === undefined) {
    return null;
  }

  const seriesPostList = seriesPost.map((series) => {
    return (
      <div key={series.get("id")}>
        <div className={cx("post")}>
          <SeriesPostListPreview series={series} />
        </div>
        <hr />
      </div>
    );
  });

  return (
    <Fragment>
      {isAuthenticated && (
        <Button
          className={cx("write-btn")}
          color="info"
          tag={Link}
          to={"/editorseries"}
        >
          NEW SERIES
        </Button>
      )}
      {seriesPostList}
    </Fragment>
  );
};

export default SeriesPostList;
