'use strict';

/**
 * @ngdoc function
 * @name outdoolacomApp.controller:ShowProfileCtrl
 * @description
 * # ShowProfileCtrl
 * Controller of the outdoolacomApp
 */

angular.module('outdoolacomApp')
  .controller('ShowProfileCtrl', [ '$scope', '$routeParams', '$firebase', 'fbutil', function ($scope, $routeParams, $firebase, fbutil) {

    var user = new Firebase('https://outdoola1.firebaseio.com/users/'+$routeParams.userId)
    $scope.profile = $firebase(user).$asObject();

    // var adventures = fbutil.syncArray('adventures', {limit: 20});
    // console.log(adventures)
    var adventures = new Firebase('https://outdoola1.firebaseio.com/adventures')
    var tempAdventures = $firebase(adventures).$asArray();
    $scope.bookingsCount = 0;

    console.log(tempAdventures)
    tempAdventures.forEach( function(adventure){
      console.log(adventure);
      console.log("test")
    });
  }]);
