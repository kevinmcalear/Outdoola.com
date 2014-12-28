'use strict';

/**
 * @ngdoc function
 * @name outdoolacomApp.controller:ShowAdventureCtrl
 * @description
 * # ShowAdventureCtrl
 * Controller of the outdoolacomApp
 */

angular.module('outdoolacomApp')
  .controller('ShowAdventureCtrl', function ($scope, $routeParams, $firebase) {

    var ref = new Firebase('https://outdoola1.firebaseio.com/adventures/'+$routeParams.adventureId)
    $scope.adventure = $firebase(ref).$asObject();

    // $scope.$on('mapInitialized', function(event, map) {
    //   map.setCenter( )

    // });

  // geocoder = new google.maps.Geocoder();

  $scope.encodeAddress = function(address) {
    //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
    var address = address;

    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
          return results[0].geometry.location;
          // map.setCenter(results[0].geometry.location);
          // var marker = new google.maps.Marker({
          //     map: map,
          //     position: results[0].geometry.location
          // });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }

  });
