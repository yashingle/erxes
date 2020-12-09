import { ICar } from '../../types';
import { Sidebar } from 'erxes-ui-utils';
import React from 'react';
import BasicInfo from '../../containers/detail/BasicInfo';

type Props = {
  car: ICar;
};

class LeftSidebar extends React.Component<Props> {
  render() {
    const { car } = this.props;

    return (
      <Sidebar wide={true}>
        <BasicInfo car={car} />
      </Sidebar>
    );
  }
}

export default LeftSidebar;
