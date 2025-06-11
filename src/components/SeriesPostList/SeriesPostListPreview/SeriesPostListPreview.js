import React, { Fragment } from 'react';

import styles from './SeriesPostListPreview.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';


const cx = classNames.bind(styles);


const SeriesPostListPreview = ({ series }) => {
   let description = series.get("description");
  if (series === undefined) {
    return null;
  }

  return (
    <Fragment>
      <div className={cx("post-header")}>
        <h2 className={cx("post-title")}>
          <Link to={"/series/" + series.get("id")}>{series.get("title")}</Link>
        </h2>
        <div className={cx("post-meta")}>
          Posted by {series.get("createdBy")}
          <span> {`  `} </span>
          {moment(series.get("createdDate")).format("lll")}
        </div>
        <hr />
      </div>
      <div className={cx('post-body')}>{renderHTML(description)}</div>
    </Fragment>
  )
};

export default SeriesPostListPreview;