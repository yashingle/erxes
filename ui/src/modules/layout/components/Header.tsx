import { Header as CommonHeader } from 'erxes-ui-utils';
import { IBreadCrumbItem, ISubMenuItem } from 'modules/common/types';
import { __ } from 'modules/common/utils';
import React from 'react';

type Props = {
  breadcrumb?: IBreadCrumbItem[];
  submenu?: ISubMenuItem[];
  queryParams?: any;
  title: string;
  additionalMenuItem?: React.ReactNode;
};

class Header extends React.Component<Props> {
  render() {
    return (
      <CommonHeader {...this.props} translator={__}/>
    );
  }
}

export default Header;
