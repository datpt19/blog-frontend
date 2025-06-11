import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import SeriesContainer from 'containers/SeriesContainer'
import HeaderContainer from 'containers/HeaderContainer'

const SeriesListPage = () => {
  return (
    <PageTemplate header={<HeaderContainer/>}>
      <SeriesContainer/>
    </PageTemplate>
  );
};

export default SeriesListPage;