'use strict';

/**
 * @ngdoc function
 * @name outdoolacomApp.controller:AdventureCtrl
 * @description
 * # AdventureCtrl
 * Controller of the outdoolacomApp
 */
angular.module('outdoolacomApp')
  .controller('AdventureCtrl', function ($scope, fbutil, $timeout) {
    // $scope.user = user;

    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.adventures = fbutil.syncArray('adventures', {limit: 10});

    // display any errors
    $scope.adventures.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addAdventure = function(newAdventure) {
      if( newAdventure ) {
        // push a message to the end of the array
        $scope.adventures.$add( { text: newAdventure } )
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
