import { ButtonMutate, core } from 'erxes-ui-utils';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';

import CarForm from '../components/list/CarForm';
import { mutations, queries } from '../graphql';
import { CarCategoriesQueryResponse, ICar } from '../types';

type Props = {
  car: ICar;
  getAssociatedCar?: (carId: string) => void;
  closeModal: () => void;
};

type FinalProps = {
  currentUser: any;
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
    }: any) => {
      const { closeModal, getAssociatedCar } = this.props;

      const afterSave = data => {
        closeModal();

        if (getAssociatedCar) {
          getAssociatedCar(data.carsAdd);
        }
      };

      return (
        <ButtonMutate
          client={graphql}
          gql={gql}
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

export default core.withProps<Props>(
  compose(
    graphql<Props, CarCategoriesQueryResponse>(gql(queries.carCategories), {
      name: 'carCategoriesQuery'
    })
  )(CarFromContainer)
);
