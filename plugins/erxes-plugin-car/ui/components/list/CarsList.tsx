import {
  BarItems, Button, DataWithLoader, FormControl, ModalTrigger, Pagination, router, Table, Wrapper
} from 'erxes-ui-utils';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { withRouter } from 'react-router-dom';
import CarForm from '../../containers/CarForm';

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
  private timer?: NodeJS.Timer = undefined;

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

  search = e => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const { history } = this.props;
    const searchValue = e.target.value;

    this.setState({ searchValue });
    this.timer = setTimeout(() => {
      router.removeParams(history, 'page');
      router.setParams(history, { searchValue });
    }, 500);
  };

  moveCursorAtTheEnd = e => {
    const tmpValue = e.target.value;
    e.target.value = '';
    e.target.value = tmpValue;
  };

  addTrigger = (
    <Button btnStyle="success" size="small" icon="plus-circle">
      Add car
    </Button>
  );

  carForm = props => {
    return <CarForm {...props} queryParams={props.queryParams} />;
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

    const actionBarRight = (
      <BarItems>
        <FormControl
          type="text"
          placeholder={'Type to search'}
          onChange={this.search}
          value={this.state.searchValue}
          autoFocus={true}
          onFocus={this.moveCursorAtTheEnd}
        />

        <ModalTrigger
          title="New car"
          trigger={this.addTrigger}
          autoOpenKey="showCarModal"
          size="lg"
          content={this.carForm}
          backDrop="static"
        />
      </BarItems>
    );

    const actionBar = (
      <Wrapper.ActionBar right={actionBarRight} />
    );

    return (
      <Wrapper
        header={
          <Wrapper.Header
            title={(`Cars`) + ` (${totalCount})`}
            queryParams={queryParams}
          />
        }
        actionBar={actionBar}
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
