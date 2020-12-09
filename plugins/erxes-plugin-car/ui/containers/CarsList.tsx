import { core, router } from 'erxes-ui-utils';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';

import CarsList from '../components/list/CarsList';
import {
  queries
} from '../graphql';
import {
  IRouterProps,
  MainQueryResponse,
} from '../types';

export const { withProps } = core;
export const { generatePaginationParams } = router

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  carsMainQuery: MainQueryResponse;
} & Props &
  IRouterProps;

const CarListContainer = (props: FinalProps) => {
  const {
    carsMainQuery,
  } = props;

  // const searchValue = props.queryParams.searchValue || '';
  const { list = [], totalCount = 0 } = carsMainQuery.carsMain || {};

  const updatedProps = {
    ...props,
    totalCount,
    // searchValue,
    cars: list,
    loading: carsMainQuery.loading,
  };
  return <CarsList {...updatedProps} />;
}

export default compose(
  graphql(
    gql(queries.carsMain),
    {
      name: 'carsMainQuery',
      // options: generateParams
    }
  )
)(CarListContainer)
