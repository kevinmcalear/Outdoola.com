'use strict';

/**
 * @ngdoc function
 * @name outdoolacomApp.controller:AdventureCtrl
 * @description
 * # AdventureCtrl
 * Controller of the outdoolacomApp
 */
angular.module('outdoolacomApp')
  .controller('AdventureCtrl', function ($scope, simpleLogin, fbutil, $timeout) {

    // Filling in our User
    simpleLogin.getUser().then(function(user) {
      $scope.user = user;
      user = user;
      // Loading up this User's Profile
      loadProfile(user);
    });

    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.adventures = fbutil.syncArray('adventures', {limit: 20});

    // display any errors
    $scope.adventures.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addAdventure = function(newAdventure) {
      if( newAdventure ) {
        // add a user to the adventure
        newAdventure.owner = $scope.user;
        // push an adventure to the end of the array
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


    function loadProfile(user) {
      if( $scope.profile ) {
        $scope.profile.$destroy();
      }
      fbutil.syncObject('users/'+user.uid).$bindTo($scope, 'profile');
    }

  });
