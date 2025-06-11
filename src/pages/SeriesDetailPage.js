import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import SeriesDetailContainer from 'containers/SeriesDetailContainer'
import HeaderContainer from 'containers/HeaderContainer'

const SeriesDetailPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate header={<HeaderContainer/>}>
      <SeriesDetailContainer id={id}/>
    </PageTemplate>
  );
};

export default SeriesDetailPage;