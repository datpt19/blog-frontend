import React, { Fragment } from 'react';

import styles from './SeriesDetail.scss';
import classNames from 'classnames/bind';
import PostList from 'components/PostList/PostList';
import SeriesHeader from 'components/SeriesDetail/SeriesHeader';
import ScrollToTopButton from 'components/ScrollToTopButton'

const cx = classNames.bind(styles);

const SeriesDetail = ({ isAuthenticated, seriesDetail, posts, currentUser }) => {
    if (seriesDetail === undefined) {
        return null;
    }
    const seriesHeader = (seriesDetail) => { 
    return (
        <SeriesHeader seriesDetail={seriesDetail}/>
    )
    };

    const postList = (seriesDetail) => { 
        return (
        <div key={seriesDetail.get("id")}>
            <div className={cx('post')}>
            <PostList posts={posts} isAuthenticated ={isAuthenticated} />
            </div>
            <hr />
        </div>
        )
    };

    return (
        <Fragment>
            {seriesHeader(seriesDetail)}
            {postList(seriesDetail)}
            <ScrollToTopButton />
        </Fragment>
    )
};

export default SeriesDetail;