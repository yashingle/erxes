import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { EmptyState, Spinner, core } from 'erxes-ui-utils';
import React from 'react';
import { graphql } from 'react-apollo';
import CarDetails from '../../components/details/CarDetails';
import { queries } from '../../graphql';
import { DetailQueryResponse } from '../../types';

const { withProps } = core;
type Props = {
  id: string;
};

type FinalProps = {
  carDetailQuery: DetailQueryResponse;
  currentUser: IUser;
} & Props;

const CarDetailsContainer = (props: FinalProps) => {
  const { id, carDetailQuery, currentUser } = props;

  if (carDetailQuery.loading) {
    return <Spinner objective={true} />;
  }

  if (!carDetailQuery.carDetail) {
    return <EmptyState text="Car not found" image="/images/actions/24.svg" />;
  }

  const carDetail = carDetailQuery.carDetail || {};

  const taggerRefetchQueries = [
    {
      query: gql(queries.carDetail),
      variables: { _id: id }
    }
  ];

  const updatedProps = {
    ...props,
    loading: carDetailQuery.loading,
    car: carDetail,
    taggerRefetchQueries,
    currentUser
  };

  return <CarDetails {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, DetailQueryResponse, { _id: string }>(
      gql(queries.carDetail),
      {
        name: 'carDetailQuery',
        options: ({ id }) => ({
          variables: {
            _id: id
          }
        })
      }
    )
  )(CarDetailsContainer)
);
