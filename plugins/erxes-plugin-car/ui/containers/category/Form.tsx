import client from 'apolloClient';
import { ButtonMutate } from 'erxes-ui-utils';
import gql from 'graphql-tag';
import React from 'react';

import CategoryForm from '../../components/category/Form';
import { mutations } from '../../graphql';
import { IButtonMutateProps, ICarCategory } from '../../types';

type Props = {
  categories: ICarCategory[];
  category?: ICarCategory;
  closeModal: () => void;
};

class CategoryFormContainer extends React.Component<Props> {
  render() {
    const renderButton = ({
      name,
      values,
      isSubmitted,
      callback,
      object
    }: IButtonMutateProps) => {
      return (
        <ButtonMutate
          client={client}
          gql={gql}
          mutation={
            object
              ? mutations.carCategoryEdit
              : mutations.carCategoryAdd
          }
          variables={values}
          callback={callback}
          refetchQueries={getRefetchQueries()}
          isSubmitted={isSubmitted}
          type="submit"
          uppercase={false}
          successMessage={`You successfully ${object ? 'updated' : 'added'
            } a ${name}`}
        />
      );
    };

    const updatedProps = {
      ...this.props,
      renderButton
    };

    return <CategoryForm {...updatedProps} />;
  }
}

const getRefetchQueries = () => {
  return ['carCategories', 'carCategoriesTotalCount'];
};

export default CategoryFormContainer;
