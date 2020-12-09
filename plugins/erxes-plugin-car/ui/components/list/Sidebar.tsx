import CategoryList from '../../containers/category/List';
import { Wrapper } from 'erxes-ui-utils'
import React from 'react';

function Sidebar({
  history,
  queryParams
}: {
  history: any;
  queryParams: any;
}) {
  return (
    <Wrapper.Sidebar>
      <CategoryList queryParams={queryParams} history={history} />
    </Wrapper.Sidebar>
  );
}

export default Sidebar;
