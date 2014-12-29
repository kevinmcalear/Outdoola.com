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
    'textAngular',
    'ui.tree',
    'ngTagsInput',
    'angular-loading-bar',
    'app.controllers',
    'app.directives',
    'app.localization',
    'app.nav',
    'app.ui.ctrls',
    'app.ui.directives',
    'app.ui.services',
    'app.ui.map',
    'app.form.validation',
    'app.ui.form.ctrls',
    'app.ui.form.directives',
    'app.tables',
    'app.task',
    'app.chart.ctrls',
    'app.chart.directives',
    'app.page.ctrls'
  ])
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
