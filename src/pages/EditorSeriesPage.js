import React from "react";
import PageTemplate from "components/common/PageTemplate";
import EditorSeriesContainer from "containers/EditorSeriesContainer";
import HeaderContainer from "containers/HeaderContainer";

const EditorSeriesPage = ({ match }) => {
  const { id } = match.params;
  return (
    <PageTemplate header={<HeaderContainer />}>
      <EditorSeriesContainer id={id} />
    </PageTemplate>
  );
};

export default EditorSeriesPage;
