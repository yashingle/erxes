import {
    DataWithLoader, Pagination, Table, Wrapper
} from 'erxes-ui-utils';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { CarsTableWrapper } from '../../styles';
import { ICar, IRouterProps } from '../../types';
import CarRow from './CarRow';
import Sidebar from './Sidebar';

interface IProps extends IRouterProps {
  cars: ICar[];
  loading: boolean;
  totalCount: number;
  toggleBulk: () => void;
  toggleAll: (targets: ICar[], containerId: string) => void;
  bulk: any[];
  isAllSelected: boolean;
  emptyBulk: () => void;
  history: any;
  queryParams: any;
}

type State = {
  searchValue?: string;
};

class CarsList extends React.Component<IProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: this.props.searchValue
    };
  }

  onChange = () => {
    const { toggleAll, cars } = this.props;
    toggleAll(cars, 'cars');
  };

  moveCursorAtTheEnd = e => {
    const tmpValue = e.target.value;
    e.target.value = '';
    e.target.value = tmpValue;
  };

  render() {
    const {
      cars,
      history,
      loading,
      isAllSelected,
      totalCount,
      // mergeCars,
      queryParams
    } = this.props;

    const mainContent = (
      <CarsTableWrapper>
        <Table whiteSpace="nowrap" bordered={true} hover={true}>
          <thead>
            <tr>
              <th>'Plate number'</th>
              <th>'Vin Number'</th>
            </tr>
          </thead>
          <tbody id="cars">
            {cars.map(car => (
              <CarRow
                car={car}
                key={car._id}
                history={history}
              />
            ))}
          </tbody>
        </Table>
      </CarsTableWrapper>
    );

    return (
      <Wrapper
        header={
          <Wrapper.Header
            title={(`Cars`) + ` (${totalCount})`}
            queryParams={queryParams}
          />
        }
        footer={<Pagination count={totalCount} />}
        leftSidebar={
          <Sidebar
            queryParams={queryParams}
            history={history}
          />
        }
        content={
          <DataWithLoader
            data={mainContent}
            loading={loading}
            count={cars.length}
            emptyText="Add in your first car!"
            emptyImage="/images/actions/1.svg"
          />
        }
      />
    );
  }
}

export default withRouter<IRouterProps>(CarsList);
