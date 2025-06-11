import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import moment from "moment";
import { Link } from "react-router-dom";
const SeriesHeader = ({ seriesDetail }) => {
    if (seriesDetail === undefined) {
        return null;
    }
    let description = seriesDetail?.get?.("description") || "";
    let title = seriesDetail?.get?.("title") || "";
    let author = seriesDetail?.get?.("createBy") || "";
    let hashtag = seriesDetail?.get?.("hashtag") || "";
    const tagList = hashtag?.split(",").map(tag => tag.trim()).filter(Boolean);
    let createdDate = seriesDetail?.get?.("createdDate") || "";
    if(createdDate !== ""){
      createdDate = moment(createdDate).format("MMM D, YYYY h:mm A");
    }
    console.log("loggg",seriesDetail)
    return (
    <div className="series-header-wrapper py-5 bg-light border-bottom">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md="10" lg="8">
            <h1 className="display-4 font-weight-bold mb-3">
              {title}
            </h1>
            <p className="lead text-muted">
              {description}
            </p>
            <div className="text-muted small mb-2">
              <span>Tác giả: {author}</span> | <span>{createdDate}</span>
          </div>
            <div>
            {tagList?.map((tag, idx) => (
              <Link
                to={`/tags/${encodeURIComponent(tag)}`}
                key={idx}
                className="badge badge-pill badge-primary mx-1"
              >
                #{tag}
              </Link>
            ))}
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SeriesHeader;
