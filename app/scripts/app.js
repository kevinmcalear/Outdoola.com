'use strict';

/**
 * @ngdoc overview
 * @name outdoolacomApp
 * @description
 * # outdoolacomApp
 *
 * Main module of the application.
 */

angular.module('outdoolacomApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.utils',
    'simpleLogin',
    'ui.bootstrap',
    'ngMap',
    'xeditable',
    'naif.base64',
    'ngAnimate',
    'textAngular',
    'ui.tree',
    'ngTagsInput',
    'angular-loading-bar'
  ])
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
