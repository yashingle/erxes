import { ICar } from '../../types';
import { Wrapper } from 'erxes-ui-utils';
import React from 'react';
import LeftSidebar from './LeftSidebar';

type Props = {
  car: ICar;
  currentUser: any;
  taggerRefetchQueries?: any[];
};

class CarDetails extends React.Component<Props> {
  render() {
    const { car, taggerRefetchQueries } = this.props;

    const title = car.plateNumber || 'Unknown';

    const breadcrumb = [{ title: 'Cars', link: '/erxes-plugin-car/list' }, { title }];

    const content = (
      <>fdsa</>
    );
    const rs = (<>rs</>);

    return (
      <Wrapper
        header={<Wrapper.Header title={title} breadcrumb={breadcrumb} />}
        leftSidebar={
          <LeftSidebar
            {...this.props}
            taggerRefetchQueries={taggerRefetchQueries}
          />
        }
        rightSidebar={rs}
        content={content}
        transparent={true}
      />
    );
  }
}

export default CarDetails;
