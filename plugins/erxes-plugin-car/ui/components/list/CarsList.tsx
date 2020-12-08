import {
  Button, DataWithLoader, DropdownToggle, FormControl, Icon, ModalTrigger, Pagination,
  SortHandler, Table, Alert, confirm, router, Wrapper, BarItems
} from 'erxes-ui-utils';
import CarForm from '../../containers/CarForm';
import { CarsTableWrapper } from '../../styles';
import { IRouterProps } from '../../types';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, withRouter } from 'react-router-dom';

import { ICar } from '../../types';
import CarsMerge from '../detail/CarsMerge';
import CarRow from './CarRow';
import Sidebar from './Sidebar';

interface IProps extends IRouterProps {
  cars: ICar[];
  loading: boolean;
  searchValue: string;
  totalCount: number;
  // TODO: check is below line not throwing error ?
  toggleBulk: () => void;
  toggleAll: (targets: ICar[], containerId: string) => void;
  bulk: any[];
  isAllSelected: boolean;
  emptyBulk: () => void;
  // removeCars: (doc: { carIds: string[] }, emptyBulk: () => void) => void;
  // mergeCars: () => void;
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

  // removeCars = cars => {
  //   const carIds: string[] = [];

  //   cars.forEach(car => {
  //     carIds.push(car._id);
  //   });

  //   this.props.removeCars({ carIds }, this.props.emptyBulk);
  // };

  moveCursorAtTheEnd = e => {
    const tmpValue = e.target.value;
    e.target.value = '';
    e.target.value = tmpValue;
  };

  render() {
    const {
      cars,
      history,
      location,
      loading,
      toggleBulk,
      bulk,
      isAllSelected,
      emptyBulk,
      totalCount,
      mergeCars,
      queryParams
    } = this.props;

    const mainContent = (
      <CarsTableWrapper>
        <Table whiteSpace="nowrap" bordered={true} hover={true}>
          <thead>
            <tr>
              <th>
                <FormControl
                  checked={isAllSelected}
                  componentClass="checkbox"
                  onChange={this.onChange}
                />
              </th>
              {/* {columnsConfig.map(({ name, label }) => (
                <th key={name}>
                  <SortHandler sortField={name} label={(label)} />
                </th>
              ))} */}
              <th>'Plate number'</th>
              <th>{('Tags')}</th>
            </tr>
          </thead>
          <tbody id="cars">
            {cars.map(car => (
              <CarRow
                car={car}
                isChecked={bulk.includes(car)}
                key={car._id}
                history={history}
                toggleBulk={toggleBulk}
              />
            ))}
          </tbody>
        </Table>
      </CarsTableWrapper>
    );

    const addTrigger = (
      <Button btnStyle="success" size="small" icon="plus-circle">
        Add car
      </Button>
    );

    const editColumns = <a href="#edit">{('Edit columns')}</a>;

    const mergeButton = (
      <Button btnStyle="primary" size="small" icon="merge">
        Merge
      </Button>
    );

    let actionBarLeft: React.ReactNode;

    const carsMerge = props => {
      return <CarsMerge {...props} objects={bulk} save={mergeCars} />;
    };

    if (bulk.length > 0) {
      const tagButton = (
        <Button btnStyle="simple" size="small" icon="tag-alt">
          Tag
        </Button>
      );

      const onClick = () =>
        confirm()
          .then(() => {
            this.removeCars(bulk);
          })
          .catch(error => {
            Alert.error(error.message);
          });

      actionBarLeft = (
        <BarItems>
          <TaggerPopover
            type="car"
            successCallback={emptyBulk}
            targets={bulk}
            trigger={tagButton}
          />

          {bulk.length === 2 && (
            <ModalTrigger
              title="Merge Cars"
              size="lg"
              trigger={mergeButton}
              content={carsMerge}
            />
          )}

          <Button
            btnStyle="danger"
            size="small"
            icon="cancel-1"
            onClick={onClick}
          >
            Remove
          </Button>
        </BarItems>
      );
    }

    const manageColumns = props => {
      return (
        <ManageColumns
          {...props}
          location={location}
          history={history}
          contentType="cars"
        />
      );
    };

    const carForm = props => {
      return <CarForm {...props} queryParams={queryParams} />;
    };

    const actionBarRight = (
      <BarItems>
        <FormControl
          type="text"
          placeholder={('Type to search')}
          onChange={this.search}
          value={this.state.searchValue}
          autoFocus={true}
          onFocus={this.moveCursorAtTheEnd}
        />

        <Dropdown className="dropdown-btn" alignRight={true}>
          <Dropdown.Toggle as={DropdownToggle} id="dropdown-customize">
            <Button btnStyle="simple" size="small">
              {('Customize ')} <Icon icon="angle-down" />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <li>
              <ModalTrigger
                title="Manage Columns"
                trigger={editColumns}
                content={manageColumns}
              />
            </li>
            <li>
              <Link to="/settings/properties?type=car">{('Properties')}</Link>
            </li>
          </Dropdown.Menu>
        </Dropdown>
        <Link to="/settings/importHistories?type=car">
          <Button btnStyle="primary" size="small" icon="arrow-from-right">
            {('Go to import')}
          </Button>
        </Link>
        <ModalTrigger
          title="New car"
          trigger={addTrigger}
          autoOpenKey="showCarModal"
          size="lg"
          content={carForm}
          backDrop="static"
        />
      </BarItems>
    );

    const actionBar = (
      <Wrapper.ActionBar right={actionBarRight} left={actionBarLeft} />
    );

    return (
      <Wrapper
        header={
          <Wrapper.Header
            title={(`Cars`) + ` (${totalCount})`}
            queryParams={queryParams}
            submenu={menuContacts}
          />
        }
        actionBar={actionBar}
        footer={<Pagination count={totalCount} />}
        leftSidebar={
          <Sidebar
            loadingMainQuery={loading}
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

export default withRouter<IRouterProps, React.ComponentType<IRouterProps>>(CarsList);
