import { Filter as CommonFilter } from 'erxes-ui-utils';
import { IRouterProps } from 'modules/common/types';
import { __ } from 'modules/common/utils';
import { withRouter } from 'react-router-dom';

interface IProps extends IRouterProps {
  queryParams?: any;
}

function Filter(props: IProps) {
  return (
    <CommonFilter {...props} translator={__} />
  );
}

export default withRouter<IProps>(Filter);
