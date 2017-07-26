import angular from 'angular';
import 'ngstorage';
import 'angular-ui-router';
import 'angular-bootstrap';
import LocalStorage from './app/services/localstorage';
import {App} from './app/containers/App';
import List from './app/components/list';
import routesConfig from './routes';
import './index.scss';

angular
  .module('app', ['ui.router', 'ui.bootstrap', 'ngStorage'])
  .config(routesConfig)
  .service('localStorage', LocalStorage)
  .component('app', App)
  .component('list', List);
