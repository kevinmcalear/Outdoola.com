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
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = fbutil.syncArray('adventures', {limit: 10});

    // display any errors
    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage})
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
