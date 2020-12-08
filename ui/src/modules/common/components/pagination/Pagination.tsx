import { Pagination } from 'erxes-ui-utils'
import { __ } from 'modules/common/utils';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { IRouterProps } from '../../types';

interface IPaginationContainerProps extends IRouterProps {
  count?: number;
}

const PaginationContainer = (props: IPaginationContainerProps) => {
  return <Pagination {...props} translator={__} />;
};

export default withRouter<IPaginationContainerProps>(PaginationContainer);
