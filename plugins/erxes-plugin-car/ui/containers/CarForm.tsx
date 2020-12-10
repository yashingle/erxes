import gql from 'graphql-tag';
import client from 'apolloClient';
import * as compose from 'lodash.flowright';
import { ButtonMutate } from 'erxes-ui-utils';
import { withProps } from 'erxes-ui-utils/lib/utils/core';
import React from 'react';
import { graphql } from 'react-apollo';
import CarForm from '../components/list/CarForm';
import { mutations, queries } from '../graphql';
import { CarCategoriesQueryResponse, ICar, IButtonMutateProps } from '../types';

type Props = {
  car: ICar;
  getAssociatedCar?: (carId: string) => void;
  closeModal: () => void;
};

type FinalProps = {
  carCategoriesQuery: CarCategoriesQueryResponse;
} & Props;

class CarFromContainer extends React.Component<FinalProps> {
  render() {
    const { carCategoriesQuery } = this.props;

    if (carCategoriesQuery.loading) {
      return null;
    }

    const renderButton = ({
      name,
      values,
      isSubmitted,
      object
    }: IButtonMutateProps) => {
      const { closeModal, getAssociatedCar } = this.props;

      const afterSave = data => {
        closeModal();

        if (getAssociatedCar) {
          getAssociatedCar(data.carsAdd);
        }
      };

      return (
        <ButtonMutate
          client={client}
          mutation={object ? mutations.carsEdit : mutations.carsAdd}
          variables={values}
          callback={afterSave}
          refetchQueries={getRefetchQueries()}
          isSubmitted={isSubmitted}
          type="submit"
          successMessage={`You successfully ${object ? 'updated' : 'added'
            } a ${name}`}
        />
      );
    };

    const carCategories = carCategoriesQuery.carCategories || [];

    const updatedProps = {
      ...this.props,
      renderButton,
      carCategories
    };

    return <CarForm {...updatedProps} />;
  }
}

const getRefetchQueries = () => {
  return [
    'carsMain',
    'carDetail',
    // cars for customer detail car associate
    'cars',
    'carCounts'
  ];
};

export default withProps<Props>(
  compose(
    graphql<Props, CarCategoriesQueryResponse>(gql(queries.carCategories), {
      name: 'carCategoriesQuery'
    })
  )(CarFromContainer)
);
