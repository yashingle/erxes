import React from 'react';
import CarList from './containers/CarsList';
import CarDetails from './containers/detail/CarDetails'

const details = ({ match }) => {
  const id = match.params.id;

  return <CarDetails id={id} />;
};

export default () => ({
  routes: [
    {
      path: '/list',
      component: CarList
    },
    {
      path: '/details/:id',
      component: details
    }
  ],
  menu: {
    label: 'Plugin Car',
    icon: 'icon-mp3',
    link: '/list',
  }
});