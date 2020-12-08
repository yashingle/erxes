import List from './containers/CarsList';

export default () => ({
    routes: [
        {
            path: '/list',
            component: List
        }
    ],
    menu: {
        label: 'Plugin Car',
        icon: 'icon-mp3',
        link: '/list',
    }
});