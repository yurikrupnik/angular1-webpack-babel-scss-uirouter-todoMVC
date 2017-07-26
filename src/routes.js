export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  const appState = {
    name: 'app',
    url: '/',
    component: 'app'
  };

  const listState = {
    name: 'app.group',
    url: ':groupName',
    component: 'list'
  };

  $stateProvider
    .state(appState)
    .state(listState);
}
