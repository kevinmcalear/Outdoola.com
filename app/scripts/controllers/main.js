'use strict';

/**
 * @ngdoc function
 * @name outdoolacomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the outdoolacomApp
 */
angular.module('outdoolacomApp')
  .controller('MainCtrl', [ '$scope', '$rootScope', 'simpleLogin', function ($scope, $rootScope, simpleLogin) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.logout = simpleLogin.logout;
    // $scope.logout = simpleLogin.logout
    // console.log($scope.logout)
    // console.log('hi')

  }]);
