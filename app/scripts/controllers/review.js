'use strict';
/**
 * @ngdoc function
 * @name outdoolacomApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('outdoolacomApp')
  .controller('ReviewCtrl', [ '$scope', 'fbutil', '$timeout', 'simpleLogin', function ($scope, fbutil, $timeout, simpleLogin) {

    // Filling in our User
    simpleLogin.getUser().then(function(user) {
      $scope.user = user;
      user = user;
      // Loading up this User's Profile
      loadProfile(user);
    });

    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = fbutil.syncArray('messages', {limit: 10});

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

    // Uploading a user's profile
    function loadProfile(user) {
      if( $scope.profile ) {
        $scope.profile.$destroy();
      }
      fbutil.syncObject('users/'+user.uid).$bindTo($scope, 'profile');
    }

  }]);
