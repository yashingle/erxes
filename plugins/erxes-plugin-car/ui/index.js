import CarList from './containers/CarsList';
import CarDetails from './containers/detail/CarDetails'

export default () => ({
  routes: [
    {
      path: '/list',
      component: CarList
    },
    {
      path: '/details',
      component: CarDetails
    }
  ],
  menu: {
    label: 'Plugin Car',
    icon: 'icon-mp3',
    link: '/list',
  }
});