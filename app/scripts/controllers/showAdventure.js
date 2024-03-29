'use strict';

/**
 * @ngdoc function
 * @name outdoolacomApp.controller:ShowAdventureCtrl
 * @description
 * # ShowAdventureCtrl
 * Controller of the outdoolacomApp
 */

angular.module('outdoolacomApp')
  .controller('ShowAdventureCtrl', [ '$scope', '$routeParams', '$firebase', 'simpleLogin', 'fbutil', function ($scope, $routeParams, $firebase, simpleLogin, fbutil) {
    // Gets the specific adveture that I wanted to show
    var ref = new Firebase('https://outdoola1.firebaseio.com/adventures/'+$routeParams.adventureId)
    $scope.adventure = $firebase(ref).$asObject();

    // synchronize a read-only, synchronized array of reviews, limit to most recent 10
    $scope.reviews = fbutil.syncArray('reviews', {limit: 10});

    // display any errors
    $scope.reviews.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addReview = function(newReview) {
      if( newReview ) {
        // Adding in id to profile
        $scope.profile.id = $scope.user.uid;
        // push a message to the end of the array
        $scope.reviews.$add({text: newReview.text, rating: newReview.rating, reviewer: $scope.profile, adventureId: $scope.adventure.$id})
        // display any errors
        .catch(alert);
      }
    };

    // synchronize a read-only, synchronized array of reviews, limit to most recent 10
    $scope.bookings = fbutil.syncArray('bookings', {limit: 10});

    // display any errors
    $scope.bookings.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addBooking = function() {
      if( !$scope.adventure.booked ) {
        // Updating booked adventure
        $scope.adventure.booked = true;
        $scope.adventure.$save();
        $scope.adventure.id = $scope.adventure.$id;
        // Adding in id to profile
        $scope.profile.id = $scope.user.uid;
        // push a message to the end of the array
        $scope.bookings.$add({adventure: $scope.adventure, booker: $scope.profile})
        // display any errors
        .catch(alert);
      }
    };


  //This encodes the lat and long from a plain text adress.
  $scope.encodeAddress = function(address) {
    var address = address;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          return results[0].geometry.location;
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }

    // Filling in our User
    simpleLogin.getUser().then(function(user) {
      $scope.user = user;
      user = user;
      // Loading up this User's Profile
      loadProfile(user);
    });

    // Uploading a user's profile
    function loadProfile(user) {
      if( $scope.profile ) {
        $scope.profile.$destroy();
      }
      fbutil.syncObject('users/'+user.uid).$bindTo($scope, 'profile');
    }

  }]);
